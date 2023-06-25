import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapters = async (comicSLug: string, source: number): Promise<any> => {
  const html = (await axios.get(`read/${comicSLug}/`)).data;
  const dom = parse(html);
  const index = dom.querySelectorAll('.listing-chapters_wrap li').map((item, index) => index).reverse();

  return {
    chapters: dom.querySelectorAll('.listing-chapters_wrap li').map((chapter, i) => ({
      name: chapter.querySelectorAll('a')[0]?.innerText.trim(),
      updateAt: chapter.querySelector('span')?.innerText.trim(),
      view: 'N/A',
      id: chapter.querySelectorAll('a')[0].getAttribute('href')?.split('/').slice(5, -1)[0],
      chap: chapter.querySelectorAll('a')[0].getAttribute('href')?.split('/').slice(5, -1)[0],
      nameIndex: index[i] + 1,
      source,
      dateTime: true
    })),
  };
};



