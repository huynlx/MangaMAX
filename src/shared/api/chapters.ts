import { getChapters as nettruyen } from "@/shared/nettruyen/chapters";
import { getChapters as lxhentai } from "@/shared/lxhentai/chapters";
import { getChapters as cmanga } from "@/shared/cmanga/chapters";
import { getChapters as hentaicube } from "@/shared/hentaicube/chapters";
import { getChapters as truyen48 } from "@/shared/truyen48/chapters";
import { getChapters as truyentranhlh } from "@/shared/truyentranhlh/chapters";
import { getChapters as comick } from "@/shared/comick/chapters";

/**
 * 
 * @param sourceObj 
 * @param comicSLug 
 * @param chapterSLug 
 * @param chapterId 
 * @returns 
 */
export const getChapters = async (sourceObj: any, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
  const { source } = sourceObj;

  switch (source) {
    case '1':
      return nettruyen(comicSLug); //nettruyen
    case '2':
      return nettruyen(comicSLug); //nhattruyen
    case '3':
      return lxhentai(comicSLug); //lxhentai
    case '4':
      return truyen48(comicSLug); //truyen48
    case '5':
      return truyentranhlh(comicSLug); //truyenlh
    case '7':
      return cmanga(comicSLug); //cmanga
    case '8':
      return comick(comicSLug); //comick
    case '9':
      return hentaicube(comicSLug); //hentaicube
    case '10':
      return truyen48(comicSLug); //truyenqq
  }
}