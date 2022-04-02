import { parse } from "node-html-parser";
import axios from "../axios"

export const getComicInfo = async (comicSLug: string): Promise<any> => {
  const html = (await axios.get(`truyen-tranh/${comicSLug}`)).data;
  const dom = parse(html);
  const index = dom.querySelectorAll(".works-chapter-list .works-chapter-item").map((item, index) => index).reverse();
  const cover = dom.querySelector(".book_avatar img")?.getAttribute('src');

  return {
    title: dom.querySelector('.book_other h1')?.innerText,
    cover: cover,
    author: dom.querySelector("li.author .org")?.innerText,
    status: dom.querySelector("li.author p.col-xs-9")?.innerText,
    genres: dom.querySelectorAll(".list01 .li03 a")?.map((genre: any) => genre.innerText),
    desc: dom.querySelector(".detail-content")?.innerText,
    chapters: dom.querySelectorAll(".works-chapter-list .works-chapter-item").map((chapter: any, i: number) => ({
      name: chapter.querySelector('.name-chap a').innerText.trim(),
      updateAt: chapter.querySelector('.time-chap').innerText,
      view: 'N/A',
      id: chapter.querySelector('.name-chap a').getAttribute('href')?.split('/').pop(),
      chap: 'chap-' + chapter.querySelector('.name-chap a').innerText.split(' ')[1],
      nameIndex: index[i] + 1
    }))
  }
}



