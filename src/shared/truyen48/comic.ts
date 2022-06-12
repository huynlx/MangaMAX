import { parse } from "node-html-parser";
import axios from "@/utils/axios"

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
  const html = (await axios.get(`truyen-tranh/${comicSLug}`)).data;
  const dom = parse(html);
  const cover = dom.querySelector(".book_avatar img")?.getAttribute('src');

  return {
    title: dom.querySelector('.book_other h1')?.innerText,
    cover: cover,
    author: dom.querySelector("li.author .org")?.innerText,
    status: dom.querySelector("li.author p.col-xs-9")?.innerText,
    genres: dom.querySelectorAll(".list01 .li03 a")?.map((genre: any) => genre.innerText),
    desc: dom.querySelector(".detail-content")?.innerText,
    chapters: [],
    source,
    lastUpdate: dom.querySelector(".works-chapter-list .works-chapter-item:first-child .time-chap")?.innerText.trim()
  }
}



