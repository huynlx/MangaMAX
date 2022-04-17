import { getComicInfo as nettruyen } from "@/shared/nettruyen/comic";
import { getComicInfo as nhattruyen } from "@/shared/nettruyen/comic";
import { getComicInfo as lxhentai } from "@/shared/lxhentai/comic";
import { getComicInfo as cmanga } from "@/shared/cmanga/comic";
import { getComicInfo as mangapk } from "@/shared/cmanga/comic";
import { getComicInfo as hentaicube } from "@/shared/hentaicube/comic";
import { getComicInfo as truyen48 } from "@/shared/truyen48/comic";
import { getComicInfo as truyentranhlh } from "@/shared/truyentranhlh/comic";

export const getComicInfo = async (sourceObj: any, comicSLug: string): Promise<any> => {
    const { url, source } = sourceObj;

    switch (source) {
        case '1':
            return nettruyen(comicSLug, source);
        case '2':
            return nhattruyen(comicSLug, source);
        case '3':
            return lxhentai(comicSLug, source);
        case '4':
            return truyen48(comicSLug, source);
        case '5':
            return truyentranhlh(comicSLug, source);
        case '7':
            return cmanga(comicSLug, url, source);
        case '8':
            return mangapk(comicSLug, url, source);
        case '9':
            return hentaicube(comicSLug, source);
        case '10':
            return truyen48(comicSLug, source);
    }
}



