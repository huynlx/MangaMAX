import axios from "@/utils/axios";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
  const links = [
    `https://api.comick.fun/chapter/${chapterId}`
  ];
  const html = (await Promise.all(links.map(async (link) => (await axios.get(link)).data)))[0];

  return {
    title: html.seoTitle,
    chapterCurrent: html.chapTitle,
    updateAt: null,
    images: html.chapter.md_images.map((img: any) => {
      return `https://meo.comick.pictures/${img.b2key}`;
    }),
    source
  };
};