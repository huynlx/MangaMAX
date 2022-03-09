import axios from "../shared/axios";

export const handleTypes = {
    SOURCE: 'SOURCE',
    WINDOW_RESIZE: 'WINDOW_RESIZE'
}

export const handleSource = (source: any, type: any, store?: any) => (dispatch: any) => {
    console.log('2. Page.getServerSideProps uses the store to dispatch things');

    switch (source) {
        case "1":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '1', name: 'Server 1', url: 'http://www.nettruyenmoi.com/' } })
            break;
        case "2":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '2', name: 'Server 2', url: 'http://nhattruyengo.com/' } })
            break;
        case "3":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '3', name: 'Server 3', url: 'https://lxhentai.com/' } })
            break;
        case "4":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '4', name: 'Server 4', url: 'http://truyen48.com/' } })
            break;
        case "5":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '5', name: 'Server 5', url: 'https://truyentranhlh.net/' } })
            break;
        case "6":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '6', name: 'Server 6', url: 'https://blogtruyen.vn/' } })
            break;
        case "7":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '7', name: 'Server 7', url: 'https://cmangaka.com/' } })
            break;
        case "8":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '8', name: 'Server 8', url: 'https://mangapk.com/' } })
            break;
        case "9":
            dispatch({ type: handleTypes.SOURCE, payload: { type: type ?? "latest", source: '9', name: 'Server 9', url: 'https://hentaicube.net/' } })
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