import { API_URL } from "../../shared/constants";
import { NextApiHandler } from "next";
import axios from "axios";

const handler: NextApiHandler = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      if (!req.query.url) return res.status(400).send("URL must not be empty");
      const url = (req.query.url as string).startsWith("//")
        ? (req.query.url as string).replace("//", "http://")
        : (req.query.url as string);
      axios
        .get(url, {
          responseType: "arraybuffer",
          headers: {
            referer: API_URL,
          },
        })
        .then(({ data, headers: { "content-type": contentType } }) => {
          res.status(200).send(data);
          // .setHeader("cache-control", "max-age=99999")
          // .setHeader("content-type", contentType)
          resolve();
        });
    } catch (error) {
      res.json(error);
      res.status(405).end();
      resolve(); // in case something goes wrong in the catch block (as vijay commented)
    }
  })
};

export default handler;
