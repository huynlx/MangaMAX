import { store } from "../../store";
import nettruyen from '../nettruyen/home2';
import lxhentai from '../lxhentai/home2';
import truyen48 from '../truyen48/home2';
import truyentranhlh from '../truyentranhlh/home2';
import blogtruyen from '../blogtruyen/home2';
import cmanga from '../cmanga/home2';
import hentaicube from '../hentaicube/home2';

const getHome = async (page: number = 1, source: string, type: string, url: string): Promise<any> => {
    // const { reducer } = store.getState();

    switch (source) {
        case '1':
            return nettruyen(page, type); //nettruyen
        case '2':
            return nettruyen(page, type); //nhattruyen
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