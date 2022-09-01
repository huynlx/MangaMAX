import axios from "@/utils/axios";
import { decrypt_data } from "./decrypt";
import { titleCase } from "./titleCase";

export const getChapters = async (comicSLug: any, source: number): Promise<any> => {
  const links = [
    `${comicSLug}`
  ];
  const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
  const book_id = html[0].match(/book_id.+"(.+)"/)[1];
  const html2 = (await axios.get(`api/book_chapter?opt1=${book_id}`)).data;
  const json = JSON.parse(decrypt_data(html2));
  const chapters: any = [];
  const index = json.map((item: any, index: any) => index).reverse();
  for (const i in json) {
    console.log(json[i].last_update);

    const time = json[i].last_update;
    const d = time[0].split('-');
    const t = time[1].split(':');
    const d2 = d[1] + '/' + d[2] + '/' + d[0];
    const t2 = t[0] + ":" + t[1];
    chapters.push({
      name: titleCase(json[i].chapter_name),
      updateAt: time,
      view: json[i].total_view,
      id: json[i].id_chapter,
      chap: 'chapter-' + parseFloat(json[i].chapter_num),
      nameIndex: index[i] + 1,
      source,
    });
  }

  return {
    chapters: chapters,
  };
};