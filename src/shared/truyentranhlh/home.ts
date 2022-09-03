import instance from "@/utils/axios";
import { parse } from "node-html-parser";
import decodeHTMLEntity from "@/utils/decodeHTML";

const getHome = async (page: number = 1, type: string, sourceNum: string, url: string): Promise<any> => {
    const handleSource = () => {
        if (type === 'browse') {
            return `danh-sach?sort=new&page=${page}`;
        } else {
            return `danh-sach?sort=update&page=${page}`;
        }
    };

    const handleData = () => {
        return htmls.map((source, index) => {
            const dom = parse(source);

            const items = dom.querySelectorAll(".col-md-8 > .card > .card-body > .row .thumb-item-flow").map((item, index) => {
                const cover = item.querySelector(".a6-ratio > div.img-in-ratio")?.getAttribute("data-bg");
                const time = item.querySelector("time.timeago")?.getAttribute("datetime");

                return ({
                    title: decodeHTMLEntity(item.querySelector(".series-title > a")?.innerText),
                    cover: `https://apoqrsgtqq.cloudimg.io/${cover}?width=250`,
                    coverOrigin: cover,
                    chapter: item.querySelector(".thumb-detail > div > a")?.innerText.split(":")[0].split('-')[0],
                    chapSlug: item.querySelector(".thumb-detail > div > a")?.getAttribute('href')?.split('/').pop(),
                    chapId: item.querySelector(".thumb-detail > div > a")?.getAttribute('href')?.split('/').pop()?.match(/\d+/g)?.join(''),
                    slug: item
                        .querySelector(".series-title > a")
                        ?.getAttribute("href")
                        ?.split("/")
                        .slice(-1)[0],
                    updateAt: time,
                    source: sourceNum
                });
            });

            const pages = [];
            for (const page of [...dom.querySelectorAll(".pagination_wrap a")]) {
                const p = Number(page?.innerText.trim());
                if (isNaN(p)) continue;
                pages.push(p);
            }
            const lastPage = Math.max(...pages);
            const hasNextPage = (+page) !== lastPage;
            const currentPage = (+dom.querySelector(".pagination_wrap > a.current")?.innerText!);

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