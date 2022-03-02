import axios from "../axios";
import { parse } from "node-html-parser";
import { store } from "../../store";
import getQueryParams from "../useGetQueryParams";
import decodeHTMLEntity from "../decodeHTML";

const getSearch = async (keyword: string, page: number = 1): Promise<any> => {
    const state = store.getState();

    const sections = {
        "Tìm truyện tranh": `story/search.php?key=${encodeURIComponent(keyword)}&p=${page ? page : 1}`
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    )

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll(".row div.py-2").map((item) => {
            let style = (item.querySelector('div')?.getAttribute('style'));
            const bg = (style?.split(";")[0]);
            const image = bg?.replace('url(', '').replace(')', '').replace(/\"/gi, "").replace(/['"]+/g, '').split(":")[1].trim();

            return {
                title: decodeHTMLEntity(item.childNodes[3].innerText),
                cover: state.url + image,
                chapter: item.querySelector(".newestChapter a")?.innerText,
                slug: getQueryParams('id', item.getElementsByTagName('a')[1].getAttribute('href')!),
                updateAt: null,
                id: getQueryParams('id', item.getElementsByTagName('a')[1].getAttribute('href')!)
            }
        });

        const pages = [];
        for (const page of [...dom.querySelectorAll("ul.pagination li")]) {
            const p = Number(page.querySelector('a')?.childNodes[0]?.textContent.trim());
            if (isNaN(p)) continue;
            pages.push(p);
        }
        const lastPage = Math.max(...pages);
        const hasNextPage = !isFinite(lastPage) ? false : (+page ? page : 1) !== lastPage;
        const currentPage = Number(dom.querySelector('li.active a.page-link')?.childNodes[0].textContent.trim());

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