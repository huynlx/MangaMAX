import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapters = async (comicSLug: any, source: number): Promise<any> => {
  const links = [
    `truyen-tranh/${comicSLug}`
  ];
  const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
  const dom = parse(html[0]);
  const index = dom.querySelectorAll("#nt_listchapter ul li:not(.heading)").map((item, index) => index).reverse();

  return {
    chapters: dom.querySelectorAll("#nt_listchapter ul li:not(.heading)").map((chapter: any, i: number) => ({
      name: chapter.querySelector('.chapter').innerText.trim(),
      updateAt: chapter.querySelector('.col-xs-4').innerText,
      view: chapter.querySelector('.col-xs-3').innerText.toLocaleString(),
      id: chapter.querySelector('a').getAttribute('data-id'),
      chap: chapter
        .querySelector(".chapter a")
        ?.getAttribute("href")
        ?.split("/")
        .slice(-2)[0],
      nameIndex: index[i] + 1,
      source,
      dateTime: true
    })),
  };
};