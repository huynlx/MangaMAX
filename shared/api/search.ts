import nettruyen from '../nettruyen/search';
import lxhentai from '../lxhentai/search';
import cmanga from '../cmanga/search';
import hentaicube from '../hentaicube/search';
import truyen48 from '../truyen48/search';

const getSearch = async (page: number = 1, source: string, url: string, keyword: string): Promise<any> => {

    switch (source) {
        case '1':
            return nettruyen(keyword, page); //nettruyen
        case '2':
            return nettruyen(keyword, page); //nhattruyen
        case '3':
            return lxhentai(keyword, page, url); //lxhentai
        case '4':
            return truyen48(keyword, page); //truyen48
        case '7':
            return cmanga(keyword, page, url); //cmanga
        case '8':
            return cmanga(keyword, page, url); //mangapk
        case '9':
            return hentaicube(keyword, page, source); //hentaicube
    }
};

export default getSearch;