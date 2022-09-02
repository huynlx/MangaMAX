import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapters = async (comicSLug: any, source: number): Promise<any> => {
  const links = [
    `truyen-tranh/${comicSLug}`
  ];

  const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
  const dom = parse(html[0]);
  const index = dom.querySelectorAll(".works-chapter-list .works-chapter-item").map((item, index) => index).reverse();

  return {
    chapters: dom.querySelectorAll(".works-chapter-list .works-chapter-item").map((chapter: any, i: number) => ({
      name: chapter.querySelector('.name-chap a').innerText.trim(),
      updateAt: chapter.querySelector('.time-chap').innerText,
      view: 'N/A',
      id: chapter.querySelector('.name-chap a').getAttribute('href')?.split('/').pop().match(/\d+/g)?.join(''),
      chap: 'chap-' + chapter.querySelector('.name-chap a').innerText.split(' ')[1],
      nameIndex: index[i] + 1,
      source,
      dateTime: true
    })),
  };
};