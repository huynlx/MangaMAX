import axios from "@/utils/axios"
import decodeHTMLEntity from "@/utils/decodeHTML";

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
  const html = (await axios.get(`https://api.comick.fun/comic/${comicSLug.split('-').slice(0, -1).join('-')}`)).data; //details
  const cover = `https://meo3.comick.pictures/${html.comic.md_covers[0].b2key}`;

  return {
    title: html.comic.title ?? 'cc',
    cover: cover + "?width=240",
    coverOrigin: cover + "?width=1920",
    author: html.authors[0]?.name,
    status: html.comic.status === 1 ? 'Ongoing' : 'Completed',
    genres: html.genres?.map((genre: any) => genre.name),
    desc: decodeHTMLEntity(html.comic.desc ?? ""),
    chapters: [],
    source,
    // lastUpdate: html.comic.year,
  }
}



