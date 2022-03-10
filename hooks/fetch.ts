import axios from "axios";

export const getHome = async ({ source, type, page }: any): Promise<any> => {
    const { data } = await axios.get(`/api/home?source=${source}&type=${type}&page=${page}`);

    return data[0];
}

export const getSearch = async ({ source, page, keyword }: any): Promise<any> => {
    const { data } = await axios.get(`/api/search?source=${source}&keyword=${keyword}&page=${page}`);

    return data[0];
}