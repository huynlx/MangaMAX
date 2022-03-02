import { store } from "../../store";
import { getComicInfo as nettruyen } from "../nettruyen/comic";
import { getComicInfo as lxhentai } from "../lxhentai/comic";
import { getComicInfo as cmanga } from "../cmanga/comic";

export const getComicInfo = async (comicSLug: string): Promise<any> => {
    const state = store.getState();

    switch (state.source) {
        case '1':
            return nettruyen(comicSLug); //nettruyen
        case '2':
            return nettruyen(comicSLug); //nhattruyen
        case '3':
            return lxhentai(comicSLug); //lxhentai
        case '7':
            return cmanga(comicSLug); //cmanga
    }
}



