import axios from "../axios";
import { parse } from "node-html-parser";
import { store } from "../../store";
import decodeHTMLEntity from "../decodeHTML";

const getSearch = async (keyword: string, page: number = 1): Promise<any> => {
    const state = store.getState().reducer;

    const sections = {
        "Tìm truyện tranh": `page/${page ? page : 1}/?s=${encodeURI(keyword)}&post_type=wp-manga`
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    )

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll(".tab-content-wrap .c-tabs-item > .row.c-tabs-item__content").map((item) => {
            const url = item
                .querySelector(".c-image-hover > a > img")
                ?.getAttribute("src");

            return ({
                title: decodeHTMLEntity(item.querySelector(".post-title > h3 > a")?.innerText!),
                cover: `/api/proxy?url=${encodeURI(url as string)}&source=${state.source}`,
                chapter: item.querySelector(".chapter > a")?.innerText,
                slug: item
                    .querySelector(".c-image-hover > a")
                    ?.getAttribute("href")?.split('/').slice(4, -1)[0],
                updateAt: item.querySelector(".post-on .font-meta")?.innerText.trim()
            });
        });

        const pages = [];
        for (const page of [...dom.querySelectorAll(".wp-pagenavi a")]) {
            const p = Number(page.querySelector('a')?.innerText.trim());
            if (isNaN(p)) continue;
            pages.push(p);
        }
        const lastPage = Math.max(...pages);
        const hasNextPage = (+page) !== lastPage;
        const currentPage = Number(dom.querySelector('.wp-pagenavi > span.current')?.innerText.trim());

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