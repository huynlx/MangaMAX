import nettruyen from '../nettruyen/search';
import lxhentai from '../lxhentai/search';
import cmanga from '../cmanga/search';
import hentaicube from '../hentaicube/search';

const getSearch = async (page: number = 1, source: string, url: string, keyword: string): Promise<any> => {

    switch (source) {
        case '1':
            return nettruyen(keyword, page); //nettruyen
        case '2':
            return nettruyen(keyword, page); //nhattruyen
        case '3':
            return lxhentai(keyword, page); //lxhentai
        case '7':
            return cmanga(keyword, page); //cmanga
        case '8':
            return cmanga(keyword, page); //mangapk
        case '9':
            return hentaicube(keyword, page); //hentaicube
    }
};

export default getSearch;