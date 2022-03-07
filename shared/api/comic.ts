import { store } from "../../store";
import { getComicInfo as nettruyen } from "../nettruyen/comic";
import { getComicInfo as lxhentai } from "../lxhentai/comic";
import { getComicInfo as cmanga } from "../cmanga/comic";
import { getComicInfo as hentaicube } from "../hentaicube/comic";

export const getComicInfo = async (comicSLug: string): Promise<any> => {
    const { reducer } = store.getState();

    switch (reducer.source) {
        case '1':
            return nettruyen(comicSLug); //nettruyen
        case '2':
            return nettruyen(comicSLug); //nhattruyen
        case '3':
            return lxhentai(comicSLug); //lxhentai
        case '7':
            return cmanga(comicSLug); //cmanga
        case '8':
            return cmanga(comicSLug); //mangapk
        case '9':
            return hentaicube(comicSLug); //hentaicube
    }
}



