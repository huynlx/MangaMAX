import axios from "../axios";
import { parse } from "node-html-parser";

const getHome = async (page: number = 1): Promise<any> => {
    const sections = {
        "Truyện mới cập nhật": `?page=${page}`
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    )

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll(".ModuleContent .items .item").map((item) => ({
            title: item.querySelector(".jtip")?.innerText,
            cover: item
                .querySelector("img")
                ?.getAttribute("data-original")
                ?.replace("//", "http://"),
            chapter: item.querySelector(".chapter a")?.innerText,
            slug: item
                .querySelector("a")
                ?.getAttribute("href")
                ?.split("/")
                .slice(-1)[0]
                .split("-")
                .slice(0, -1)
                .join("-"),
            updateAt: item.querySelector(".chapter i")?.innerText,
        }));

        const hasNextPage = (+page) !== (+(dom.querySelector('ul.pagination > li.PagerSSCCells:last-child')?.innerText!))
        const currentPage = (+dom.querySelector("ul.pagination > li.active > a")?.innerText!);

        return {
            name: Object.keys(sections)[index],
            nameAlt: 'Latest',
            items,
            hasNextPage,
            currentPage
        };
    });

    return data;

};

export default getHome;