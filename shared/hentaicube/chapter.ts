import { parse } from "node-html-parser";
import axios from "../axios";
import { store } from "../../store";
import decodeHTMLEntity from "../decodeHTML";

export const getChapter = async (comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `manga/${comicSLug}/${chapterSLug}/`
    ];
    const state = store.getState().reducer;
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));

    const dom = parse(html[0]);

    const list = dom.querySelectorAll('.text-left > div > img');
    const index = dom.querySelectorAll(".c-selectpicker")[0].querySelectorAll('option').map((item, index) => index).reverse();

    return {
        title: decodeHTMLEntity(dom.querySelector("#chapter-heading")?.innerText.split('-')[0]),
        chapterCurrent: dom.querySelectorAll(".c-selectpicker")[0].querySelector('option:checked')?.innerText,
        updateAt: '',
        images: list.map(img => `/api/proxy?url=${encodeURI((img.getAttribute('data-src') ?? img.getAttribute('src')) as string)}&source=${state.source}`),
        chapters: dom.querySelectorAll(".c-selectpicker")[0].querySelectorAll('option').map((option, i) => ({
            name: option.innerText,
            id: index[i].toString(),
            chap: option.getAttribute('data-redirect')?.split('/').slice(5, -1)[0],
        }))
    }
}