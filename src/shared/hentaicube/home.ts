import instance from "@/utils/axios";
import { parse } from "node-html-parser";
import decodeHTMLEntity from "@/utils/decodeHTML";
import { getCover } from "./utils";

const getHome = async (page: number = 1, type: string, sourceNum: string, url: string): Promise<any> => {

    const handleSource = () => {
        if (type === 'browse') {
            return `page/${page}/?s&post_type=wp-manga&m_orderby=views`;
        } else {
            return `page/${page}/?s&post_type=wp-manga&m_orderby=latest`;
        }
    };

    const handleData = () => {
        return htmls.map((html, index) => {
            const dom = parse(html);

            const items = dom.querySelectorAll(".tab-content-wrap .c-tabs-item__content").map((item, index) => {
                const url = item.querySelector(".c-image-hover > a > img")?.getAttribute("data-src") ?? item.querySelector(".c-image-hover > a > img")?.getAttribute("src");
                const time = item.querySelector(".post-on")?.innerText.trim();

                return ({
                    title: decodeHTMLEntity(item.querySelector(".post-title > h3 > a")?.innerText!),
                    cover: getCover(url),
                    chapter: item.querySelector(".chapter > a")?.innerText.trim(),
                    chapSlug: item.querySelector(".chapter a")?.getAttribute('href')?.split('/').slice(5, -1)[0],
                    chapId: item.querySelector(".chapter a")?.getAttribute('href')?.split('/').slice(5, -1)[0],
                    slug: item
                        .querySelector(".c-image-hover > a")
                        ?.getAttribute("href")?.split('/').slice(4, -1)[0],
                    updateAt: time,
                    source: sourceNum
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
    };

    const sections = {
        "Truyện": handleSource()
    };

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await instance.get(url)).data)
    );

    const data = handleData();

    return data;

};

export default getHome;