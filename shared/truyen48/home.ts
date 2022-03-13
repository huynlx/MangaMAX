import instance from "../axios";
import { parse } from "node-html-parser";

const getHome = async (page: number = 1, type: string, source: string, url: string): Promise<any> => {

    const handleSource = () => {
        if (type === 'browse') {
            return `truyen-yeu-thich/trang-${page}.html`
        } else {
            return `truyen-moi-cap-nhat/trang-${page}.html`
        }
    }

    const handleData = () => {
        return htmls.map((source, index) => {
            const dom = parse(source);

            const items = dom.querySelectorAll(".list-stories li").map((item) => ({
                title: item.querySelector("h3.title-book > a")?.innerText,
                cover: item.querySelector("a > img")?.getAttribute("src"),
                chapter: item.querySelector(".episode-book > a")?.innerText,
                slug: item
                    .querySelector("a")
                    ?.getAttribute("href")
                    ?.split("/")
                    .slice(-1)[0],
                updateAt: item.querySelector(".time-ago")?.innerText,
            }));

            const pages = [];
            for (const page of [...dom.querySelectorAll("ul.pagination-list li")]) {
                const p = Number(page.querySelector('a')?.innerText.trim());
                if (isNaN(p)) continue;
                pages.push(p);
            }
            const lastPage = Math.max(...pages);
            const hasNextPage = (+page) !== lastPage;
            const currentPage = (+dom.querySelector("li > a.is-current")?.innerText!);

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