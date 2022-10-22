import nettruyen from '@/shared/nettruyen/home';
import lxhentai from '@/shared/lxhentai/home';
import truyen48 from '@/shared/truyen48/home';
import truyentranhlh from '@/shared/truyentranhlh/home';
import blogtruyen from '@/shared/blogtruyen/home';
import cmanga from '@/shared/cmanga/home';
import hentaicube from '@/shared/hentaicube/home';
import mangaii from '@/shared/mangaii/home';
import comick from '@/shared/comick/home';

export const getHome = async (page: number = 1, source: string, type: string, url: string): Promise<any> => {
    switch (source) {
        case '1':
            return nettruyen(page, type, source); //nettruyen
        case '2':
            return nettruyen(page, type, source); //nhattruyen
        case '3':
            return lxhentai(page, type, source, url); //lxhentai
        case '4':
            return truyen48(page, type, source, url); //truyen48
        case '5':
            return truyentranhlh(page, type, source, url); //truyentranhlh
        case '6':
            return blogtruyen(page, type, source, url); //blogtruyen
        case '7':
            return cmanga(page, type, source, url); //cmanga
        case '8':
            return comick(page, type, source); //comick
        case '9':
            return hentaicube(page, type, source, url); //hentaicube
        case '10':
            return mangaii(page, type, source); //mangaii
    }
};

export default getHome;