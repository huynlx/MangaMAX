import nettruyen from '../nettruyen/home';
import lxhentai from '../lxhentai/home';
import truyen48 from '../truyen48/home';
import truyentranhlh from '../truyentranhlh/home';
import blogtruyen from '../blogtruyen/home';
import cmanga from '../cmanga/home';
import hentaicube from '../hentaicube/home';

const getHome = async (page: number = 1, source: string, type: string, url: string): Promise<any> => {
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
            return cmanga(page, type, source, url); //mangapk
        case '9':
            return hentaicube(page, type, source, url); //hentaicube
    }
};

export default getHome;