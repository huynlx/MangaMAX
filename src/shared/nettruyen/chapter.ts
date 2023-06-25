import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import { blackListImg } from "@/constants/blackListImg";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const handleSlug = comicSLug.split("-").slice(0, -1).join("-");

    const links = [
        `truyen-tranh/${handleSlug}/${chapterSLug}/${chapterId}`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const dom = parse(html[0]);
    if (!dom.querySelector(".txt-primary a")?.innerText) { //trường hợp chapter mới nhất hiển thị ở HomePage nhưng chưa đọc được
        throw new Error("Wrong Hash");
    }
    return {
        title: dom.querySelector(".txt-primary a")?.innerText,
        chapterCurrent: dom.querySelector(".txt-primary span")?.innerText,
        updateAt: dom.querySelector(".top i")?.innerText,
        images: dom.querySelectorAll(".reading-detail.box_doc .page-chapter img")
            .reduce<string[]>(
                (arr, curr) => {
                    let url = curr.getAttribute("src") as string;

                    url = url.startsWith("//")
                        ? url.replace("//", "https://")
                        : url;

                    if (blackListImg.server_1.includes(url)) return arr;

                    arr.push(`/api/proxy2?url=${encodeURIComponent(url)}&source=${source}`);

                    return arr;
                }, []
            ),
        source
    };
};
