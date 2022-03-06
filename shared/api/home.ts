import { store } from "../../store";
import nettruyen from '../nettruyen/home';
import lxhentai from '../lxhentai/home';
import truyen48 from '../truyen48/home';
import truyentranhlh from '../truyentranhlh/home';
import blogtruyen from '../blogtruyen/home';
import cmanga from '../cmanga/home';

const getHome = async (page: number = 1): Promise<any> => {
    const { reducer } = store.getState();

    switch (reducer.source) {
        case '1':
            return nettruyen(page); //nettruyen
        case '2':
            return nettruyen(page); //nhattruyen
        case '3':
            return lxhentai(page); //lxhentai
        case '4':
            return truyen48(page); //truyen48
        case '5':
            return truyentranhlh(page); //truyentranhlh
        case '6':
            return blogtruyen(page); //blogtruyen
        case '7':
            return cmanga(page); //cmanga
        case '8':
            return cmanga(page); //mangapk
    }
};

export default getHome;