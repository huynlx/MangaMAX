import { parse } from "node-html-parser";
import axios from "../axios";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
  const links = [
    `truyen-tranh/${comicSLug}-${chapterSLug.replace('.', '-')}`
  ];

  const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
  const dom = parse(html[0]);

  return {
    title: dom.querySelector(".detail-title a")?.innerText,
    chapterCurrent: dom.querySelector(".detail-title")?.childNodes[1].textContent,
    updateAt: dom.querySelector("time")?.innerText,
    images: dom.querySelectorAll(".chapter_content img").map(img => {
      let url = img.getAttribute("data-original") as string;
      url = url.startsWith("//")
        ? url.replace("//", "http://")
        : url;
      return `/api/proxy?url=${encodeURIComponent(url)}&source=${source}`
    }),
    chapters: dom.querySelectorAll(".selectEpisode option").map((chapter: any) => ({
      name: chapter.innerText.trim(),
      id: chapter.getAttribute('value')?.split('/').pop().match(/\d+/g)?.join(''),
      chap: 'chap-' + chapter.innerText.split(' ')[1],
    })),
    source
  }
}