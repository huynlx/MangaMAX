import { SOURCES } from "@/constants/index";
import axios from "@/utils/axios";
import { logout } from "@/utils/firebase";
import { AppDispatch } from '@/store';
import { handleTypes } from "./types";

interface LooseObject {
    [key: string]: any
}

export const handleSource = (source: string | string[] | undefined, type: string | string[] | undefined, store?: any) => (dispatch: AppDispatch) => {
    // console.log('2. Page.getServerSideProps uses the store to dispatch things');
    const sourceData = SOURCES.find(item => item.source == source);

    switch (source) {
        case source:
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: source, name: sourceData?.name, url: sourceData?.url } })
            break;
        default:
            break;
    }
    if (store) { //page home ko vào đc đây vì ko có ssr truyền store
        axios.defaults.baseURL = store.getState().reducer.url;
    }
}

export const windowResize = (size: number) => ({
    type: handleTypes.WINDOW_RESIZE,
    payload: { windowSize: size }
});

export const setScroll = (position?: number | null, keyword?: string | null, indexChapters?: boolean | null) => (dispatch: any) => {
    let payload: LooseObject = {};

    if (position || position === 0) payload.scrollPosition = position;
    if (keyword) payload.keyword = keyword;
    if (indexChapters === true || indexChapters === false) payload.indexChapters = indexChapters;

    dispatch({
        type: handleTypes.SCROLL,
        payload
    });
};

export const recents = (data: any) => ({
    type: handleTypes.RECENTS,
    payload: { recents: [data] }
});

export const user = (data: any) => ({
    type: handleTypes.USER,
    user: data
});

export const bookmarks = (data: any) => ({
    type: handleTypes.BOOKMARKS,
    bookmarks: data
});

export const layout = (option: number) => ({
    type: handleTypes.LAYOUT,
    layout: option
});

export const handleLogout = () => (dispatch: AppDispatch) => {
    dispatch(user(null));
    dispatch(bookmarks([]));
    logout();
};

export const del_recents = () => ({
    type: handleTypes.DEL_RECENTS
});

export const del_bookmarks = () => ({
    type: handleTypes.DEL_BOOKMARKS
});