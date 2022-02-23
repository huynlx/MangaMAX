import { parse } from "node-html-parser";
import axios from "../axios";

export const getChapter = async (comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `truyen-tranh/${comicSLug}/${chapterSLug}/${chapterId}`,
        `truyen-tranh/${comicSLug}`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const dom = parse(html[0]);
    const dom2 = parse(html[1])

    return {
        title: dom.querySelector(".txt-primary a")?.innerText,
        chapterCurrent: dom.querySelector(".txt-primary span")?.innerText,
        images: dom.querySelectorAll(".reading-detail.box_doc .page-chapter img").map(img => `/api/image?url=${encodeURIComponent(
            img.getAttribute("src") as string
        )}`),
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