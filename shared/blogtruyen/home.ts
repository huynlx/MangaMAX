import instance from "../axios";
import { parse } from "node-html-parser";
import decodeHTMLEntity from "../decodeHTML";

const getHome = async (page: number = 1, type: string, source: string, url: string): Promise<any> => {

    const handleSource = () => {
        if (type === 'browse') {
            return `ajax/Search/AjaxLoadListManga?key=tatca&orderBy=3&p=${page}`
        } else {
            return `thumb-${page}`
        }
    }

    const handleData = () => {
        if (type === 'browse') { //browse
            return htmls.map((source, index) => {
                const dom = parse(source);

                const items = dom.querySelectorAll(".list p:not(:first-child)").map((item) => {
                    const cover = item.nextElementSibling.querySelector("img")?.getAttribute("src")?.replace('150x', '300x300');

                    return ({
                        title: decodeHTMLEntity(item.querySelector("a")?.innerText!),
                        cover: `/_next/image?url=${cover}&w=230&q=75`,
                        chapter: item.querySelector("span:nth-child(2)")?.innerText + ' chương' ?? '',
                        slug: item
                            .querySelector("a")
                            ?.getAttribute("href")?.substr(1),
                        updateAt: null,
                    });
                });

                const pages: number[] = [];
                for (const page of [...dom.querySelectorAll(".paging a")]) {
                    const p = Number(page?.innerText.trim());
                    if (isNaN(p)) continue;
                    pages.push(p);
                }
                const lastPage = Math.max(...pages);
                const hasNextPage = (+page) !== lastPage;
                const currentPage = (+dom.querySelector("span.current_page")?.innerText!);

                return {
                    name: Object.keys(sections)[index],
                    items,
                    hasNextPage,
                    currentPage
                };
            });
        } else { //latest
            return htmls.map((source, index) => {
                const dom = parse(source);

                const items = dom.querySelectorAll(".list-mainpage .storyitem .row").map((item) => {
                    const cover = item.querySelector("div:nth-child(1) > a > img")?.getAttribute("src");

                    return ({
                        title: decodeHTMLEntity(item.querySelector("h3.title > a")?.innerText!),
                        cover: `/_next/image?url=${cover}&w=230&q=75`,
                        chapter: item.querySelector("div:nth-child(2) > div:nth-child(4) > span:nth-child(1)")?.innerText ?? '',
                        slug: item
                            .querySelector("div:nth-child(1) > a")
                            ?.getAttribute("href")?.substr(1).replace('/', '-'),
                        updateAt: item.querySelector(".publishedDate")?.childNodes[2].textContent,
                    });
                });

                const pages: number[] = [];
                for (const page of [...dom.querySelectorAll("ul.pagination > li a")]) {
                    const p = Number(page?.innerText.trim());
                    if (isNaN(p)) continue;
                    pages.push(p);
                }
                const lastPage = Math.max(...pages);
                const hasNextPage = (+page) !== lastPage;
                const currentPage = (+dom.querySelector("ul.pagination > li > select > option:checked")?.innerText.split(' ')[1]!);

                return {
                    name: Object.keys(sections)[index],
                    items,
                    hasNextPage,
                    currentPage
                };
            });
        }
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