import { getChapter as nettruyen } from "../nettruyen/chapter";
import { getChapter as lxhentai } from "../lxhentai/chapter";
import { getChapter as cmanga } from "../cmanga/chapter";
import { getChapter as hentaicube } from "../hentaicube/chapter";
import { getChapter as truyen48 } from "../truyen48/chapter";
import { store } from "../../store";

export const getChapter = async (comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const { reducer } = store.getState();

    switch (reducer.source) {
        case '1':
            return nettruyen(comicSLug, chapterSLug, chapterId); //nettruyen
        case '2':
            return nettruyen(comicSLug, chapterSLug, chapterId); //nhattruyen
        case '3':
            return lxhentai(comicSLug, chapterSLug, chapterId); //lxhentai
        case '4':
            return truyen48(comicSLug, chapterSLug, chapterId); //truyen48
        case '7':
            return cmanga(comicSLug, chapterSLug, chapterId); //cmanga
        case '8':
            return cmanga(comicSLug, chapterSLug, chapterId); //mangapk
        case '9':
            return hentaicube(comicSLug, chapterSLug, chapterId); //hentaicube
    }
}