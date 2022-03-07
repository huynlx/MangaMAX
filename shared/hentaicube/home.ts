import instance from "../axios";
import { parse } from "node-html-parser";
import { store } from "../../store";
import decodeHTMLEntity from "../decodeHTML";

const getHome = async (page: number = 1): Promise<any> => {
    const state = store.getState().reducer;

    const handleSource = () => {
        if (state.type === 'browse') {
            return `page/${page}/?s&post_type=wp-manga&m_orderby=views`
        } else {
            return `page/${page}/?s&post_type=wp-manga&m_orderby=latest`
        }
    }

    const handleData = () => {
        return htmls.map((source, index) => {
            const dom = parse(source);

            const items = dom.querySelectorAll(".tab-content-wrap .c-tabs-item__content").map((item) => {
                const url = item.querySelector(".c-image-hover > a > img")?.getAttribute("data-src")
                    ?? item.querySelector(".c-image-hover > a > img")?.getAttribute("src");
                return ({
                    title: decodeHTMLEntity(item.querySelector(".post-title > h3 > a")?.innerText!),
                    cover: `/api/proxy?url=${encodeURI(url as string)}&source=${state.source}`,
                    chapter: item.querySelector(".chapter > a")?.innerText,
                    slug: item
                        .querySelector(".c-image-hover > a")
                        ?.getAttribute("href")?.split('/').slice(4, -1)[0],
                    updateAt: item.querySelector(".post-on")?.innerText.trim()
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
                items,
                hasNextPage,
                currentPage
            };
        });
    }

    const sections = {
        "Truyện": handleSource()
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await instance.get(url)).data)
    )

    const data = handleData();

    return data;

};

export default getHome;