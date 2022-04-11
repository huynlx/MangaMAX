import { getChapter as nettruyen } from "../nettruyen/chapter";
import { getChapter as lxhentai } from "../lxhentai/chapter";
import { getChapter as cmanga } from "../cmanga/chapter";
import { getChapter as hentaicube } from "../hentaicube/chapter";
import { getChapter as truyen48 } from "../truyen48/chapter";
import { getChapter as truyentranhlh } from "../truyentranhlh/chapter";

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
        case '7':
            return cmanga(source, comicSLug, chapterSLug, chapterId); //cmanga
        case '8':
            return cmanga(source, comicSLug, chapterSLug, chapterId); //mangapk
        case '9':
            return hentaicube(source, comicSLug, chapterSLug, chapterId); //hentaicube
    }
}