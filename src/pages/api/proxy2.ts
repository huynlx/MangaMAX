import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { SOURCES } from "@/constants/index";

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query.url as string;
  const source = SOURCES.find(item => item.source == req.query.source);

  const response = await axios.get(url, {
    responseType: "stream",
    headers: {
      referer: source?.url!,
    },
  });

  response.data.pipe(res);
};

export default proxy;