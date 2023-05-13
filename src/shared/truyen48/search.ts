import axios from "@/utils/axios";
import { parse } from "node-html-parser";

const getSearch = async (sourceNum: string, keyword: string, page: number = 1): Promise<any> => {
    const sections = {
        "Tìm truyện tranh": `tim-kiem/trang-${page}.html?q=${encodeURI(keyword)}`
    };

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    );

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll(".list_grid li").map((item) => ({
            title: item.querySelector("h3 > a")?.innerText,
            cover: item.querySelector(".book_avatar > a > img")?.getAttribute("src"),
            chapter: item.querySelector(".last_chapter a")?.innerText,
            chapSlug: 'chap-' + item.querySelector(".last_chapter a")?.innerText.split(' ')[1],
            chapId: item.querySelector(".last_chapter a")?.getAttribute('href')?.split('/').pop()?.match(/\d+/g)?.join(''),
            slug: item
                .querySelector("a")
                ?.getAttribute("href")
                ?.split("/")
                .slice(-1)[0].replace('.html', ''),
            updateAt: item.querySelector(".time-ago")?.innerText,
            hot: item.querySelector('.type-label.hot')?.innerText,
            source: sourceNum
        }));

        const pages = [];
        for (const page of [...dom.querySelectorAll(".page_redirect p")]) {
            const p = Number(page.innerText.trim());
            if (isNaN(p)) continue;
            pages.push(p);
        }
        const lastPage = Math.max(...pages);
        const hasNextPage = (+page) !== lastPage;
        const currentPage = (+dom.querySelector(".page_redirect p.active")?.innerText!);

        return {
            name: Object.keys(sections)[index],
            nameAlt: 'Search results',
            items,
            hasNextPage,
            currentPage,
        };
    });

    return data;

};

export default getSearch;
