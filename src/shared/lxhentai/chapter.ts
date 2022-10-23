import { parse } from "node-html-parser";
import axios from "@/utils/axios";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `truyen/${comicSLug}/${chapterId}`
    ];

    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const dom = parse(html[0]);

    const list = [...dom.querySelectorAll('.text-center img')];

    const image = (img: string | undefined) => img?.includes('https') ? `https://apoqrsgtqq.cloudimg.io/${(img?.replace('lxhentai.com//', 'lxhentai.com/'))}` : img;

    return {
        title: dom.querySelector('a.text-ellipsis.font-semibold')?.innerText,
        chapterCurrent: dom.querySelector("li.border-dashed")?.innerText,
        updateAt: null,
        images: list.filter(img => img.getAttribute('src')?.indexOf('.gif') === -1).map(img => img.getAttribute('src')?.includes('http') ? image(img.getAttribute('src')?.trim())
            : image('https:' + img.getAttribute('src')?.trim())
        ),
        source
    };
};