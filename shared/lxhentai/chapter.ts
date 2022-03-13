import { parse } from "node-html-parser";
import axios from "../axios";

export const getChapter = async (comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `story/chapter.php?id=${chapterId}`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const dom = parse(html[0]);
    const list = [...dom.querySelectorAll('#content_chap p img')].length === 0 ? dom.querySelectorAll('#content_chap div:not(.text-center) img')
        : dom.querySelectorAll('#content_chap p img');
    const index = dom.querySelectorAll("#selectChapter:first-child option").map((item, index) => index).reverse();
    const image = (img: string | undefined) => (`/_next/image?url=${img}&w=1280&q=75`);

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
            chap: "chapter-" + (index[i] + 1)
        }))
    }
}