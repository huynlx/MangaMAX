import instance from "../axios";
import { parse } from "node-html-parser";
import { store } from "../../store";

const getHome = async (page: number = 1): Promise<any> => {
    const state = store.getState();

    const handleSource = () => {
        if (state.type === 'browse') {
            return `hot?page=${page}`
        } else {
            return `?page=${page}`
        }
    }

    const handleData = () => {
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