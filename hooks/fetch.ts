import axios from "axios";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "shared/firebase";

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

export const getBookmarks = async ({ user }: any): Promise<any> => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc && doc.docs[0].data().bookmarks.reverse();

    return {
        pages: [{
            items: data
        }]
    };
}