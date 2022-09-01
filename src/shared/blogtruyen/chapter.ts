import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
  const links = [
    `${chapterId}/${chapterSLug}`
  ];
  const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
  const dom = parse(html[0]);

  var images = dom.querySelectorAll("#content > img").reduce<string[]>((result, img) => {
    let url = img.getAttribute("src") as string;

    if (!url.includes('donate.png')) {
      result.push(`/api/proxy?url=${encodeURIComponent(url)}&source=${source}`);
    }

    return result;
  }, []);

  return {
    title: dom.querySelector("header h1")?.innerText,
    chapterCurrent: 'cc',
    updateAt: 'cc',
    images,
    source
  };
};