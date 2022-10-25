import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import decodeHTMLEntity from "@/utils/decodeHTML";
import { getCover, getCoverOrigin } from "./utils";

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
    const html = (await axios.get(`truyen/${comicSLug}`)).data;
    const dom = parse(html);
    let style = dom.querySelector('div.cover')?.getAttribute('style');
    const bg = style?.split(";")[0];
    const cover = 'https:' + bg?.replace('url(', '').replace(')', '').replace(/\"/gi, "").replace(/['"]+/g, '').split(":")[2].trim();

    return {
        title: decodeHTMLEntity(dom.querySelector('div.truncate > span.font-semibold')?.innerText.trim()!),
        cover: getCover(cover),
        coverOrigin: getCoverOrigin(cover),
        author: dom.querySelector('.grow .mt-2 span a[href*="tac-gia"]')?.innerText ?? null,
        status: dom.querySelectorAll('.grow .mt-2')[2].querySelector(".text-blue-500")?.innerText,
        genres: dom.querySelectorAll('.grow .mt-2 span:last-child a').map(genre => genre.innerText),
        desc: dom.querySelector('.border-gray-200.py-4.border-t > p:nth-child(3)')?.innerText ?? '',
        chapters: [],
        source,
        lastUpdate: dom.querySelector(".timeago")?.getAttribute('datetime')
    };
}



