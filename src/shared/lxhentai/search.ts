import axios from "@/utils/axios";
import decodeHTMLEntity from "@/utils/decodeHTML";
import { parse } from "node-html-parser";
import { getCover } from "./utils";

const getSearch = async (sourceNum: string, keyword: string, page: number = 1, url: string): Promise<any> => {

    const sections = {
        "Tìm truyện tranh": `tim-kiem?sort=-updated_at&filter%5Bname%5D=${encodeURI(keyword)}&filter%5Bstatus%5D=2%2C1&page=${page ? page : 1}`
    };

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    );

    const data = htmls.map((source, index) => {
        const dom = parse(source);

        const items = dom.querySelectorAll("div.grid div.manga-vertical").map((item) => {
            let style = item.querySelector('div.cover')?.getAttribute('style');
            const bg = style?.split(";")[0];
            const image = 'https:' + bg?.replace('url(', '').replace(')', '').replace(/\"/gi, "").replace(/['"]+/g, '').split(":")[2].trim();

            return {
                title: decodeHTMLEntity(item.childNodes[3].innerText),
                cover: getCover(image),
                chapter: item.querySelector(".latest-chapter a")?.innerText,
                chapSlug: item.getElementsByTagName('a')[1].getAttribute('href')?.split('/').pop(),
                chapId: item.getElementsByTagName('a')[1].getAttribute('href')?.split('/').pop(),
                slug: item.getElementsByTagName('a')[1].getAttribute('href')?.split('/')[2],
                updateAt: null,
                id: item.getElementsByTagName('a')[1].getAttribute('href')!,
                source: sourceNum
            };
        });

        const pages = [];
        for (const page of [...dom.querySelectorAll("ul.flex.gap-2 a.page-link")]) {
            const p = Number(page.querySelector('li')?.childNodes[0]?.textContent.trim());
            if (isNaN(p)) continue;
            pages.push(p);
        }
        const lastPage = Math.max(...pages);
        const hasNextPage = (+page) !== lastPage;
        const currentPage = Number(dom.querySelector('li.bg-white')?.childNodes[0].textContent.trim());

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