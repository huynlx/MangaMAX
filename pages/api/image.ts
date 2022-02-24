import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_URL } from "../../shared/constants";

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = (req.query.url as string).startsWith("//")
    ? (req.query.url as string).replace("//", "http://")
    : (req.query.url as string);

  const response: any = await axios.get(url, {
    responseType: "stream",
    headers: {
      referer: API_URL,
    },
  });

  response.data.pipe(res);
};

export default proxy;