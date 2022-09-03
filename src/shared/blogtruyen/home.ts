import { parse } from "node-html-parser";
import decodeHTMLEntity from "@/utils/decodeHTML";
import axios from "axios";

const getHome = async (page: number = 1, type: string, sourceNum: string, url: string): Promise<any> => {
    let origin: string;

    const handleSource = () => {
        if (type === 'browse') {
            origin = url;

            return `ajax/Search/AjaxLoadListManga?key=tatca&orderBy=3&p=${page}`;
        } else {
            origin = 'https://m.blogtruyen.vn/';

            return `thumb-${page}`;
        }
    };

    const handleData = () => {
        if (type === 'browse') { //browse
            return htmls.map((source, index) => {
                const dom = parse(source);

                const items = dom.querySelectorAll(".list p:not(:first-child)").map((item) => {
                    const cover = item.nextElementSibling.querySelector("img")?.getAttribute("src")?.replace('150x', '300x300');

                    return ({
                        title: decodeHTMLEntity(item.querySelector("a")?.innerText!),
                        cover: cover,
                        chapter: item.querySelector("span:nth-child(2)")?.innerText + ' chương' ?? '',
                        slug: item
                            .querySelector("a")
                            ?.getAttribute("href")?.split('/')[1],
                        updateAt: null,
                        source: sourceNum
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

                const items = dom.querySelectorAll(".gridview .row")[0]
                    ?.querySelectorAll('.item')
                    ?.map((item) => {
                        const cover = item.querySelector(".image img")?.getAttribute("src");
                        const time = item.querySelector(".chapter .timesince")?.getAttribute('data-date');

                        return ({
                            title: decodeHTMLEntity(item.querySelector("figcaption h3 a")?.innerText.trim()),
                            cover: cover,
                            chapter: item.querySelector(".chapter a")?.getAttribute('title') ?? '',
                            slug: item
                                .querySelector("figcaption h3 a")
                                ?.getAttribute("href")?.substr(1).split('/')[0],
                            updateAt: time,
                            source: sourceNum,
                            chapSlug: item.querySelector(".chapter a")?.getAttribute('href')?.split("/")[2],
                            chapId: item.querySelector(".chapter a")?.getAttribute('href')?.split("/")[1],
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
    };

    const sections = {
        "Truyện": handleSource()
    };

    const htmls = await Promise.all(
        Object
            .entries(sections)
            .map(([_, value]) => value)
            .map(async (url) => (await axios.get(`${origin}${url}`)).data)
    );

    const data = handleData();

    return data;

};

export default getHome;