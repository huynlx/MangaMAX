import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapters = async (comicSLug: string, source: number): Promise<any> => {
  const html = (await axios.get(`truyen-tranh/${comicSLug}`)).data;
  const dom = parse(html);
  const index = dom.querySelectorAll(".list-chapters.at-series > a").map((item, index) => index).reverse();

  return {
    chapters: dom.querySelectorAll(".list-chapters.at-series > a").map((chapter: any, i: number) => ({
      name: chapter.querySelector('li > .chapter-name').innerText.trim(),
      updateAt: chapter.querySelector('li > .chapter-time').innerText,
      view: 'N/A',
      id: chapter.getAttribute('href')?.split('/').pop()?.match(/\d+/g).join(''),
      chap: chapter.getAttribute('href')?.split('/').pop(),
      nameIndex: index[i] + 1,
      source,
      dateTime: true
    })),
  };
};



