import nettruyen from '@/shared/nettruyen/search';
import lxhentai from '@/shared/lxhentai/search';
import cmanga from '@/shared/cmanga/search';
import hentaicube from '@/shared/hentaicube/search';
import truyen48 from '@/shared/truyen48/search';
import truyentranhlh from '@/shared/truyentranhlh/search';
import comick from '@/shared/comick/search';

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
            return comick(source, keyword, page); //comick
        case '9':
            return hentaicube(source, keyword, page); //hentaicube
        case '10':
            return truyen48(source, keyword, page); //truyenqq
    }
};

export default getSearch;