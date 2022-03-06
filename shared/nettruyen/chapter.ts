import { parse } from "node-html-parser";
import axios from "../axios";
import { store } from "../../store";

export const getChapter = async (comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const handleSlug = comicSLug.split("-").slice(0, -1).join("-");
    const state = store.getState().reducer;

    const links = [
        `truyen-tranh/${handleSlug}/${chapterSLug}/${chapterId}`,
        `truyen-tranh/${comicSLug}`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const dom = parse(html[0]);
    const dom2 = parse(html[1])
    if (!dom.querySelector(".txt-primary a")?.innerText) {
        throw new Error("Wrong Hash");
    }
    return {
        title: dom.querySelector(".txt-primary a")?.innerText,
        chapterCurrent: dom.querySelector(".txt-primary span")?.innerText,
        updateAt: dom.querySelector(".top i")?.innerText,
        images: dom.querySelectorAll(".reading-detail.box_doc .page-chapter img").map(img => {
            let url = img.getAttribute("src") as string;
            url = url.startsWith("//")
                ? url.replace("//", "http://")
                : url;
            return `/api/proxy?url=${encodeURI(url)}&source=${state.source}`
        }),
        chapters: dom2.querySelectorAll("#nt_listchapter ul li:not(.heading)").map((chapter: any) => ({
            name: chapter.querySelector('.chapter').innerText.trim(),
            id: chapter.querySelector('a').getAttribute('data-id'),
            chap: chapter
                .querySelector(".chapter a")
                ?.getAttribute("href")
                ?.split("/")
                .slice(-2)[0],
        }))
    }
}