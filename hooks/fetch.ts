import axios from "axios";

export const getHome = async ({ source, type, page }: any): Promise<any> => {
    const { data } = await axios.get(`/api/home?source=${source}&type=${type}&page=${page}`);

    return data[0];
}

export const getSearch = async ({ source, page, keyword }: any): Promise<any> => {
    try {
        const { data } = await axios.get(`/api/search?source=${source}&keyword=${keyword}&page=${page}`);

        return data[0];
    } catch (error) {
        return {
            hasNextPage: false,
            name: 'Search',
            nameAlt: 'Search results',
            items: [],
            currentPage: null
        }
    }
}

export const getComic = async ({ source, slug }: any): Promise<any> => {
    const { data } = await axios.get(`/api/comic?source=${source}&slug=${slug}`);

    return data;
}

export const getChapter = async ({ source, slug, chapter, id }: any): Promise<any> => {
    const { data } = await axios.get(`/api/chapter?source=${source}&slug=${slug}&chapSlug=${chapter}&id=${id}`);

    return data;
}