import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { SOURCES } from "@/constants/index";

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query.url as string;
  const source = SOURCES.find(item => item.source == req.query.source);

  return new Promise<void>((resolve, reject) => {
    axios
      .get(url, {
        responseType: "arraybuffer",
        headers: {
          referer: source?.url!,
        },
      })
      .then(
        ({ data, headers: { "content-type": contentType } }) => {
          res
            .setHeader("cache-control", "max-age=99999")
            .setHeader("content-type", contentType)
            .send(data);
          resolve();
        }
      )
      .catch(error => {
        res.json(error);
        res.status(405).end();
        reject();
      });
  });
};

export default proxy;