import axios from "../axios";
import { parse } from "node-html-parser";

const getSearch = async (keyword: string, page: number = 1): Promise<any> => {
    const sections = {
        "Tìm truyện tranh": `tim-truyen?keyword=${keyword}&page=${page ? page : 1}`
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

        const pages=dom.querySelectorAll('ul.pagination > li > a').map((item:any)=>{
            const p = item.innerText.trim();
            if (isNaN(p)) return false
            return p;
        });
        const maxPage=Math.max(...pages);
        const hasNextPage = (+page ? page : 1) !== maxPage;
        const currentPage = (+dom.querySelector("ul.pagination > li.active > a")?.innerText!);

        return {
            name: Object.keys(sections)[index],
            nameAlt: 'Search results',
            items,
            hasNextPage,
            currentPage
        };
    });

    return data;

};

export default getSearch;