import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import decodeHTMLEntity from "@/utils/decodeHTML";

export const getChapters = async (comicSLug: any, source: number): Promise<any> => {
  const links = [
    `${comicSLug.split('-')[0]}`
  ];
  const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
  const dom = parse(html[0]);
  const index = dom.querySelectorAll("#list-chapters > p").map((item, index) => index).reverse();

  return {
    chapters: dom.querySelectorAll("#list-chapters > p").map((chapter: any, i: number) => ({
      name: decodeHTMLEntity(chapter.querySelector('span.title > a').innerText.trim()),
      updateAt: 'cc',
      view: 'cc',
      id: chapter.querySelector('span.title > a').getAttribute('href').split('/')[1],
      chap: chapter.querySelector('span.title > a').getAttribute('href').split('/').pop(),
      nameIndex: index[i] + 1,
      source
    })),
  };
};