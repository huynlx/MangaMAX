import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import decodeHTMLEntity from "@/utils/decodeHTML";

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
  const html = (await axios.get(`${comicSLug.split('-')[0]}`)).data;

  const dom = parse(html);
  const cover = dom.querySelector(".thumbnail > img")?.getAttribute('src');

  //   for (const test of dom.querySelectorAll('.description p')) {
  //     switch ($(test).clone().children().remove().end().text().trim()) {
  //         case 'Tác giả:':
  //             creator = decodeHTMLEntity($('a', test).text());
  //             break;
  //         case 'Thể loại:':
  //             for (const t of $('.category > a', test).toArray()) {
  //                 const genre = $(t).text().trim()
  //                 const id = $(t).attr('href') ?? genre
  //                 tags.push(createTag({ label: genre, id }));
  //             }
  //             status = $('.color-red', $(test).next()).text().toLowerCase().includes("đang") ? 1 : 0;
  //             break;
  //         default:
  //             break;
  //     }
  // }

  let author, status, desc, lastUpdate, genres: any;

  genres = [];


  return {
    title: decodeHTMLEntity(dom.querySelector('.entry-title > a')?.innerText.trim()),
    cover: cover?.replace('500x', '300x300'),
    coverOrigin: cover,
    author,
    status,
    genres,
    desc: 'cai con cac',
    chapters: [],
    source,
    lastUpdate
  };
};



