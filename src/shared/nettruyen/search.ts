import axios from "@/utils/axios";
import { parse } from "node-html-parser";

const getSearch = async (sourceNum: string, keyword: string, page: number = 1): Promise<any> => {
    const sections = {
        "Tìm truyện tranh": `tim-truyen?keyword=${encodeURI(keyword)}&page=${page ? page : 1}`
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    )

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll(".ModuleContent .items .item").map((item) => {
            let elStatus = item.querySelectorAll('.message_main p')
                .find(el => el.querySelector("label")?.innerText.includes("Tình trạng:"));
            let status = elStatus?.childNodes[2] ?
                elStatus?.childNodes[2]?.textContent.includes("Đang") ? 'ONGOING' : 'COMPLETED' : 'ONGOING'

            return ({
                title: item.querySelector(".jtip")?.innerText,
                cover: item
                    .querySelector("img")
                    ?.getAttribute("data-original")
                    ?.replace("//", "http://"),
                chapter: item.querySelector(".chapter a")?.innerText,
                chapSlug: item.querySelector(".chapter a")?.getAttribute('href')?.split("/").slice(-2)[0],
                chapId: item.querySelector(".chapter a")?.getAttribute('href')?.split("/").pop(),
                slug: item
                    .querySelector("a")
                    ?.getAttribute("href")
                    ?.split("/")
                    .slice(-1)[0],
                updateAt: item.querySelector(".chapter i")?.innerText,
                status: status,
                source: sourceNum
            });
        });

        const pages = dom.querySelectorAll('ul.pagination > li > a').map((item: any) => {
            const p = item.innerText.trim();
            if (isNaN(p)) return false
            return p;
        });
        const maxPage = Math.max(...pages);
        const hasNextPage = !isFinite(maxPage) ? false : (+page ? page : 1) !== maxPage;
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