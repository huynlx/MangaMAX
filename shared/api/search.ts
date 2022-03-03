import { store } from "../../store";
import nettruyen from '../nettruyen/search';
import lxhentai from '../lxhentai/search';

const getSearch = async (keyword: string, page: number = 1): Promise<any> => {
    const {reducer} = store.getState();

    switch (reducer.source) {
        case '1':
            return nettruyen(keyword, page); //nettruyen
        case '2':
            return nettruyen(keyword, page); //nhattruyen
        case '3':
            return lxhentai(keyword, page); //lxhentai
    }
};

export default getSearch;