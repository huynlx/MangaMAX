import instance from "@/utils/axios";
import { parse } from "node-html-parser";
import decodeHTMLEntity from "@/utils/decodeHTML";
import { getCover } from "./utils";

const getHome = async (page: number = 1, type: string, sourceNum: string, url: string): Promise<any> => {
    const handleSource = () => {
        if (type === 'browse') {
            return `danh-sach?sort=-views&page=${page}&filter%5Bstatus%5D=2,1`;
        } else {
            return `danh-sach?sort=-updated_at&page=${page}&filter%5Bstatus%5D=2,1`;
        }
    };

    const handleData = () => {
        return htmls.map((source, index) => {
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