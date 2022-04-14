import { parse } from "node-html-parser";
import axios from "../axios";
import decodeHTMLEntity from "../decodeHTML";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `manga/${comicSLug}/${chapterSLug}/`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));

    const dom = parse(html[0]);

    const list = dom.querySelectorAll('.text-left > div img');

    return {
        title: decodeHTMLEntity(dom.querySelector("#chapter-heading")?.innerText.split('-')[0]),
        chapterCurrent: dom.querySelectorAll(".c-selectpicker")[0].querySelector('option:checked')?.innerText,
        updateAt: '',
        images: list.map(img => `/api/proxy?url=${encodeURIComponent((img.getAttribute('data-src') ?? img.getAttribute('src')) as string)}&source=${source}`),
        chapters: dom.querySelectorAll(".c-selectpicker")[0].querySelectorAll('option').map((option, i) => ({
            name: option.innerText,
            id: option.getAttribute('data-redirect')?.split('/').slice(5, -1)[0],
            chap: option.getAttribute('data-redirect')?.split('/').slice(5, -1)[0],
        })),
        source
    }
}