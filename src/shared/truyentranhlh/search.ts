import axios from "@/utils/axios";
import { parse } from "node-html-parser";

const getSearch = async (sourceNum: string, keyword: string, page: number = 1): Promise<any> => {
    const sections = {
        "Tìm truyện tranh": `tim-kiem?q=${encodeURI(keyword)}&page=${page}`
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    )

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll(".col-12 > .card:nth-child(2) > .card-body > .row .thumb-item-flow").map((item) => {
            const cover = item.querySelector(".a6-ratio > div.img-in-ratio")?.getAttribute("data-bg");

            return ({
                title: item.querySelector(".series-title > a")?.innerText,
                cover: `https://apoqrsgtqq.cloudimg.io/${cover}?width=250`,
                coverOrigin: cover,
                chapter: item.querySelector(".thumb-detail > div > a")?.innerText.split(":")[0].split('-')[0],
                chapSlug: item.querySelector(".thumb-detail > div > a")?.getAttribute('href')?.split('/').pop(),
                chapId: item.querySelector(".thumb-detail > div > a")?.getAttribute('href')?.split('/').pop()?.match(/\d+/g)?.join(''),
                slug: item
                    .querySelector(".series-title > a")
                    ?.getAttribute("href")
                    ?.split("/")
                    .slice(-1)[0],
                updateAt: item.querySelector("time.timeago")?.getAttribute("datetime"),
                source: sourceNum
            });
        });

        const pages = [];
        for (const page of [...dom.querySelectorAll(".pagination_wrap a")]) {
            const p = Number(page.innerText.trim());
            if (isNaN(p)) continue;
            pages.push(p);
        }
        const lastPage = Math.max(...pages);
        const hasNextPage = (+page) !== lastPage;
        const currentPage = (+dom.querySelector(".pagination_wrap > a.current")?.innerText!);

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