import { mangaProps } from "components/LeftComic";
import { RootState } from "store";

export const regexMatchMultiString = /NhatTruyen|TruyenQQ|NetTruyen|Cmangavip.com|Cmanga/g;

export const API_URL = "http://www.nettruyenmoi.com/";

export const SOURCES = [
    {
        source: '1',
        name: 'Server 1',
        url: 'http://www.nettruyenmoi.com/',
        type: 'latest',
        server: "nettruyen"
    },
    {
        source: '2',
        name: 'Server 2',
        url: 'http://nhattruyengo.com/',
        type: 'latest',
        server: 'netruyen'
    },
    {
        source: '3',
        name: 'Server 3',
        url: 'https://lxhentai.com/',
        type: 'latest',
        server: 'lxhentai'
    },
    {
        source: '4',
        name: 'Server 4',
        url: 'http://truyen48.com/',
        type: 'latest',
        server: 'truyen48'
    },
    {
        source: '5',
        name: 'Server 5',
        url: 'https://truyentranhlh.net/',
        type: 'latest',
        server: 'truyentranhlh'
    },
    {
        source: '6',
        name: 'Server 6',
        url: 'https://blogtruyen.vn/',
        type: 'latest',
        server:'blogtruyen'
    },
    {
        source: '7',
        name: 'Server 7',
        url: 'https://cmanganew.com/',
        type: 'latest',
        server:'cmanga'
    },
    {
        source: '8',
        name: 'Server 8',
        url: 'https://mangapk.com/',
        type: 'latest',
        server: 'cmanga'
    },
    {
        source: '9',
        name: 'Server 9',
        url: 'https://hentaicb.top/',
        type: 'latest',
        server: 'hentaicube'
    }
]

export const WINDOW_SIZE = {
    mobile: 320,
    phablet: 480,
    tablet: 768,
    laptop: 992,
    desktop: 1200,
    all: 0
};

export const WINDOW_RESIZE_DEBOUNCE = 400;

export const mangaObj = (info: any, slug: string, select: RootState, type: string): mangaProps => ({
    title: info.title,
    cover: info.cover,
    slug: slug,
    url: `/manga/${slug}?source=${info.source ?? select.source}&type=${type}`,
    source: info.source ?? select.source,
    type: type
});