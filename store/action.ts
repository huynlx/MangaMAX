import axios from "../shared/axios";

export const handleSourceTypes = {
    SOURCE: 'SOURCE',
}

export const handleSource = (source: any, type: any, store: any) => (dispatch: any) => {
    console.log('2. Page.getServerSideProps uses the store to dispatch things');

    switch (source) {
        case "1":
            dispatch({ type: handleSourceTypes.SOURCE, payload: { type: type ?? "latest", source: '1', name: 'Server 1', url: 'http://nettruyengo.com/' } })
            break;
        case "2":
            dispatch({ type: handleSourceTypes.SOURCE, payload: { type: type ?? "latest", source: '2', name: 'Server 2', url: 'http://nhattruyenvip.com/' } })
            break;
        case "3":
            dispatch({ type: handleSourceTypes.SOURCE, payload: { type: type ?? "latest", source: '3', name: 'Server 3 (18+)', url: 'https://lxhentai.com/' } })
            break;
        case "4":
            dispatch({ type: handleSourceTypes.SOURCE, payload: { type: type ?? "latest", source: '4', name: 'Server 4', url: 'http://truyen48.com/' } })
            break;
        default:
            break;
    }
    axios.defaults.baseURL = store.getState().url;
}