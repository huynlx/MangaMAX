import instance from "../axios";
import { parse } from "node-html-parser";
import { store } from "../../store";
import decodeHTMLEntity from "../decodeHTML";
import getQueryParams from "../useGetQueryParams";

const getHome = async (page: number = 1): Promise<any> => {
    const state = store.getState();

    const handleSource = () => {
        if (state.type === 'browse') {
            return `story/index.php?p=${page}&hot`
        } else {
            return `story/index.php?p=${page}`
        }
    }

    const handleData = () => {
        return htmls.map((source, index) => {
            const dom = parse(source);

            const items = dom.querySelectorAll(".main .col-md-8 > .row div.col-md-3").map((item) => {
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
            const hasNextPage = (+page) !== lastPage;
            const currentPage = Number(dom.querySelector('li.active a.page-link')?.childNodes[0].textContent.trim());

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