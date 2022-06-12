import { parse } from "node-html-parser";
import decodeHTMLEntity from "@/utils/decodeHTML";
import axios from "@/utils/axios"

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
  const html = (await axios.get(`truyen-tranh/${comicSLug}`)).data;
  const dom = parse(html);
  const background = dom.querySelector(".top-part > .row > .col-12 > .series-cover > .a6-ratio > div")?.getAttribute('style')?.match(/background-image: (.*)/)?.[1];
  const cover = background?.replace('url(', '').replace(')', '').replace(/\"/gi, "").replace(/['"]+/g, '');
  let author: (string | undefined) = '';
  let status: (string | undefined) = '';
  let genres: (string | undefined)[] = [];

  for (const test of dom.querySelectorAll('.series-information .info-item')) {
    switch (test.querySelector('.info-name')?.innerText.trim()) {
      case 'Tác giả:':
        author = test.querySelector('.info-value')?.innerText;
        break;
      case 'Thể loại:':
        for (const t of test.querySelectorAll('.info-value > a')) {
          const genre = t.querySelector('span')?.innerText.trim()
          // const id = t.getAttribute('href') ?? genre
          genres.push(genre);
        }
        break;
      case 'Tình trạng:':
        status = test.querySelector('.info-value > a')?.innerText;
        break;
      default:
        break;
    }
  }

  return {
    title: decodeHTMLEntity(dom.querySelector('.series-name > a')?.innerText),
    cover: `https://apoqrsgtqq.cloudimg.io/${cover}?width=250`,
    coverOrigin: cover,
    author,
    status,
    genres,
    desc: dom.querySelector(".summary-content")?.innerText,
    chapters: [],
    source,
    lastUpdate: dom.querySelector("time.timeago")?.innerText
  }
}



