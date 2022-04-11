import nettruyen from '../nettruyen/search';
import lxhentai from '../lxhentai/search';
import cmanga from '../cmanga/search';
import hentaicube from '../hentaicube/search';
import truyen48 from '../truyen48/search';
import truyentranhlh from '../truyentranhlh/search';

const getSearch = async (page: number = 1, source: string, url: string, keyword: string): Promise<any> => {

    switch (source) {
        case '1':
            return nettruyen(source, keyword, page); //nettruyen
        case '2':
            return nettruyen(source, keyword, page); //nhattruyen
        case '3':
            return lxhentai(source, keyword, page, url); //lxhentai
        case '4':
            return truyen48(source, keyword, page); //truyen48
        case '5':
            return truyentranhlh(source, keyword, page); //truyen48
        case '7':
            return cmanga(source, keyword, page, url); //cmanga
        case '8':
            return cmanga(source, keyword, page, url); //mangapk
        case '9':
            return hentaicube(source, keyword, page); //hentaicube
    }
};

export default getSearch;