import { getChapter as nettruyen } from "@/shared/nettruyen/chapter";
import { getChapter as lxhentai } from "@/shared/lxhentai/chapter";
import { getChapter as cmanga } from "@/shared/cmanga/chapter";
import { getChapter as hentaicube } from "@/shared/hentaicube/chapter";
import { getChapter as truyen48 } from "@/shared/truyen48/chapter";
import { getChapter as truyentranhlh } from "@/shared/truyentranhlh/chapter";
import { getChapter as comick } from "@/shared/comick/chapter";
import { getChapter as blogtruyen } from "@/shared/blogtruyen/chapter";

export const getChapter = async (sourceObj: any, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const { source } = sourceObj;

    switch (source) {
        case '1':
            return nettruyen(source, comicSLug, chapterSLug, chapterId); //nettruyen
        case '2':
            return nettruyen(source, comicSLug, chapterSLug, chapterId); //nhattruyen
        case '3':
            return lxhentai(source, comicSLug, chapterSLug, chapterId); //lxhentai
        case '4':
            return truyen48(source, comicSLug, chapterSLug, chapterId); //truyen48
        case '5':
            return truyentranhlh(source, comicSLug, chapterSLug, chapterId); //truyen48
        case '6':
            return blogtruyen(source, comicSLug, chapterSLug, chapterId); //blogtruyen
        case '7':
            return cmanga(source, comicSLug, chapterSLug, chapterId); //cmanga
        case '8':
            return comick(source, comicSLug, chapterSLug, chapterId); //comick
        case '9':
            return hentaicube(source, comicSLug, chapterSLug, chapterId); //hentaicube
        case '10':
            return truyen48(source, comicSLug, chapterSLug, chapterId); //truyenqq
    }
};

export default getChapter;