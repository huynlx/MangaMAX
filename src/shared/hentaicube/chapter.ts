import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import decodeHTMLEntity from "@/utils/decodeHTML";
import { black_list } from "@/shared/hentaicube/utils";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `read/${comicSLug}/${chapterSLug}/`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));

    const dom = parse(html[0]);

    const list = dom.querySelectorAll('.text-left > .doc-truyen img');

    return {
        title: decodeHTMLEntity(dom.querySelector("#chapter-heading")?.innerText.split('-')[0]),
        chapterCurrent: dom.querySelectorAll(".c-selectpicker")[0].querySelector('option:checked')?.innerText,
        updateAt: '',
        images: list.map(img => {
            const imgSrc = img.getAttribute('data-src') ?? img.getAttribute('src') as string;

            if (imgSrc.includes('/credit/')) {
                return null;
            }

            if (!black_list.includes(imgSrc)) {
                return `/api/proxy?url=${encodeURIComponent(imgSrc)}&source=${source}`;
            }
        }).filter(v => v),
        source
    };
};
