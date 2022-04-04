import { SOURCES } from "constants/index";
import axios from "shared/axios";

interface LooseObject {
    [key: string]: any
}

export const handleTypes = {
    SOURCE: 'SOURCE',
    WINDOW_RESIZE: 'WINDOW_RESIZE',
    SCROLL: 'SCROLL_POSITION',
    RECENTS: 'RECENTS',
    USER: 'USER',
    BOOKMARKS: 'BOOKMARKS'
}

export const handleSource = (source: string | string[] | undefined, type: string | string[] | undefined, store?: any) => (dispatch: any) => {
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

export const windowResize = (size: number) => (dispatch: any) => {
    dispatch({
        type: handleTypes.WINDOW_RESIZE,
        payload: { windowSize: size }
    });
};

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

export const recents = (data: any) => (dispatch: any) => {
    dispatch({
        type: handleTypes.RECENTS,
        payload: { recents: [data] }
    });
};

export const user = (data: any) => (dispatch: any) => {
    dispatch({
        type: handleTypes.USER,
        user: data
    });
};

export const bookmarks = (data: any) => (dispatch: any) => {
    dispatch({
        type: handleTypes.BOOKMARKS,
        bookmarks: data
    });
};