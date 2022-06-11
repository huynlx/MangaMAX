import axios from "@/utils/axios"

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
  const html = (await axios.get(`https://api.comick.fun/comic/${comicSLug.split('-').slice(0, -1).join('-')}`)).data;
  const html2 = (await axios.get(`https://api.comick.fun/comic/${comicSLug.split('-').pop()}/chapter`)).data;
  const index = html2.chapters.map((_: any, index: any) => index).reverse();
  const cover = `https://meo.comick.pictures/${html.comic.md_covers[0].b2key}`;

  return {
    title: html.comic.title ?? 'cc',
    cover: cover + "?width=240",
    coverOrigin: cover + "?width=1920",
    author: html.authors[0]?.name,
    status: html.comic.status === 1 ? 'Ongoing' : 'Completed',
    genres: html.genres?.map((genre: any) => genre.name),
    desc: html.comic.desc,
    chapters: html2.chapters.map((chapter: any, i: number) => {
      const title = chapter.title ?? false;
      
      return ({
        name: 'Chap ' + chapter.chap + (title ? `: ${title}` : ''),
        updateAt: chapter.updated_at.split('T')[0],
        view: 'N/A',
        id: chapter.hid,
        chap: 'chap-' + chapter.chap,
        nameIndex: index[i] + 1
      });
    }),
    source,
    lastUpdate: html.comic.year
  }
}



