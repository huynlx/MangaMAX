import { parse } from "node-html-parser";
import useSlug from "@/utils/setSlug";
import axios from "@/utils/axios";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `story/chapter.php?id=${chapterId}`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const dom = parse(html[0]);
    const list = [...dom.querySelectorAll('#content_chap p img')].length === 0 ? dom.querySelectorAll('#content_chap div:not(.text-center) img')
        : dom.querySelectorAll('#content_chap p img');
    const image = (img: string | undefined) => img?.includes('https') ? `https://images.weserv.nl/?url=${encodeURIComponent(img?.replace('lxhentai.com//', 'lxhentai.com/') as string)}` : img;

    return {
        title: dom.querySelector("#mainpage h4 a")?.innerText,
        chapterCurrent: dom.querySelector("#mainpage h4")?.childNodes[1].textContent,
        updateAt: dom.querySelector(".col-md-6 .flexRow .pl-2 .fa-clock")?.nextSibling.textContent,
        images: list.map(img => img.getAttribute('src')?.includes('http') ? image(img.getAttribute('src'))
            : image('https:' + img.getAttribute('src'))
        ),
        chapters: dom.querySelectorAll("#selectChapter:first-child option").map((option, i) => ({
            name: option.innerText,
            id: option.getAttribute("value"),
            chap: useSlug(option.innerText)
        })),
        source
    }
}