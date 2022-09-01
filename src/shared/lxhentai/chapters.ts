import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapters = async (comicSLug: string, source: number): Promise<any> => {
  const html = (await axios.get(`truyen/${comicSLug}`)).data;
  const dom = parse(html);
  const index = dom.querySelectorAll('.overflow-y-auto.overflow-x-hidden a li').map((item, index) => index).reverse();

  return {
    chapters: dom.querySelectorAll('.overflow-y-auto.overflow-x-hidden a').map((chapter, i) => ({
      name: chapter.querySelector('.text-ellipsis')?.innerText.trim(),
      updateAt: chapter.querySelector('.timeago')?.getAttribute('datetime')?.split(' ')[0],
      view: 'null',
      id: chapter.getAttribute('href')?.split('/').pop()!,
      chap: chapter.getAttribute('href')?.split('/').pop()!,
      nameIndex: index[i] + 1,
      source,
      dateTime: true
    })),
  };
};



