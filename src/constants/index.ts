import { mangaProps } from "@/components/Info/LeftComic";
import { RootState } from "@/store";

export const regexMatchMultiString =
  /NhatTruyen|TruyenQQ|NetTruyen|Cmangavip.com|Cmanga/g;

export const API_URL = "https://www.nettruyenup.com/";

export const SOURCES = [
  {
    source: "1",
    name: "Server 1",
    url: "https://www.nettruyenus.com/",
    type: "latest",
    server: "nettruyen",
    adult: false,
  },
  {
    source: "2",
    name: "Server 2",
    url: "https://nhattruyenplus.com/",
    type: "latest",
    server: "netruyen",
    adult: false,
  },
  {
    source: "3",
    name: "Server 3 (18+)",
    url: "https://lxmanga.net/",
    type: "latest",
    server: "lxhentai",
    adult: true,
  },
  {
    source: "4",
    name: "Server 4",
    url: "https://truyenqqvn.com/",
    type: "latest",
    server: "truyen48",
    adult: false,
  },
  {
    source: "5",
    name: "Server 5",
    url: "https://truyentranhlh.net/",
    type: "latest",
    server: "truyentranhlh",
    adult: false,
  },
  {
    source: "6",
    name: "Server 6",
    url: "https://blogtruyen.vn/",
    type: "latest",
    server: "blogtruyen",
    adult: false,
  },
  {
    source: "7",
    name: "Server 7",
    url: "https://cmangaaz.com/",
    type: "latest",
    server: "cmanga",
    adult: false,
  },
  {
    source: "8",
    name: "Server 8",
    url: "https://comick.xyz/",
    type: "latest",
    server: "comick",
    adult: false,
  },
  {
    source: "9",
    name: "Server 9 (18+)",
    url: "https://hentaicube.net/",
    type: "latest",
    server: "hentaicube",
    adult: true,
  },
  {
    source: "10",
    name: "Server 10",
    url: "https://mangaii.com/",
    type: "latest",
    server: "mangaii",
    adult: false,
  },
];

export const WINDOW_SIZE = {
  mobile: 320,
  phablet: 480,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
  all: 0,
};

export const WINDOW_RESIZE_DEBOUNCE = 400;

export const mangaObj = (
  info: any,
  slug: string,
  select: RootState,
  type: string
): mangaProps => ({
  title: info.title,
  cover: info.cover,
  slug: slug,
  url: `/manga/${slug}?source=${info.source ?? select?.source}&type=${type}`,
  source: info.source ?? select?.source,
  type: type,
});

export const TITLES = ["latest", "browse"];
export const FORYOU = ["recents", "bookmarks"];

export const WEBSITE_URL = "https://mangamax-huynh.cf/";

export const GA_MEASUREMENT_ID = "G-MGL73630CW";
