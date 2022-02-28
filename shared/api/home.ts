import instance from "../axios";
import { parse } from "node-html-parser";
import { store } from "../../store";

const getHome = async (page: number = 1): Promise<any> => {
    const state = store.getState();

    const handleSource = () => {
        if (state.type === 'browse') {
            if (state.source === 'lxhentai') {
                return `story/index.php?p=${page}&hot`
            }
            return `hot?page=${page}`
        } else {
            if (state.source === 'lxhentai') {
                return `story/index.php?p=${page}`
            }
            return `?page=${page}`
        }
    }

    const handleData = () => {
        if (state.source === 'lxhentai') {
            return htmls.map((source, index) => {
                const dom = parse(source);

                const items = dom.querySelectorAll(".main .col-md-8 > .row div.col-md-3").map((item) => {
                    let style = (item.querySelector('div')?.getAttribute('style'));
                    const bg = (style?.split(";")[0]);
                    const image = bg?.replace('url(', '').replace(')', '').replace(/\"/gi, "").replace(/['"]+/g, '').split(":")[1].trim();

                    return {
                        title: 'cc',
                        cover: state.url + image,
                        chapter: item.querySelector(".newestChapter a")?.innerText,
                        // slug: item.querySelector("a")?.getAttribute('href'),
                        // updateAt: item.querySelector(".chapter i")?.innerText,
                    }
                });

                const pages = [];
                for (const page of [...dom.querySelectorAll("ul.pagination li")]) {
                    const p = Number(page.querySelector('a')?.innerText.trim());
                    if (isNaN(p)) continue;
                    pages.push(p);
                }
                const lastPage = Math.max(...pages);
                const hasNextPage = (+page) !== lastPage;
                const currentPage =Number(dom.querySelector('li.active a.page-link')?.childNodes[0].textContent.trim());

                return {
                    name: Object.keys(sections)[index],
                    items,
                    hasNextPage,
                    currentPage
                };
            });
        } else {
            return htmls.map((source, index) => {
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