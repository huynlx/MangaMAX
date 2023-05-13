import instance from "@/utils/axios";
import { parse } from "node-html-parser";

const getHome = async (page: number = 1, type: string, sourceNum: string, url: string): Promise<any> => {

    const handleSource = () => {
        if (type === 'browse') {
            return `truyen-yeu-thich/trang-${page}.html`;
        } else {
            return `truyen-moi-cap-nhat/trang-${page}.html`;
        }
    };

    const handleData = () => {
        return htmls.map((source, index) => {
            const dom = parse(source);

            const items = dom.querySelectorAll(".list_grid li").map((item) => ({
                title: item.querySelector("h3 > a")?.innerText,
                cover: item.querySelector(".book_avatar > a > img")?.getAttribute("src"),
                chapter: item.querySelector(".last_chapter a")?.innerText,
                chapSlug: 'chap-' + item.querySelector(".last_chapter a")?.innerText.split(' ')[1],
                chapId: item.querySelector(".last_chapter a")?.getAttribute('href')?.split('/').pop()?.match(/\d+/g)?.join(''),
                slug: item
                    .querySelector("a")
                    ?.getAttribute("href")
                    ?.split("/")
                    .slice(-1)[0].replace('.html', ''),
                updateAt: item.querySelector(".time-ago")?.innerText,
                hot: item.querySelector('.type-label.hot')?.innerText,
                source: sourceNum
            }));

            const pages = [];
            for (const page of [...dom.querySelectorAll(".page_redirect p")]) {
                const p = Number(page.innerText.trim());
                if (isNaN(p)) continue;
                pages.push(p);
            }
            const lastPage = Math.max(...pages);
            const hasNextPage = (+page) !== lastPage;
            const currentPage = (+dom.querySelector(".page_redirect p.active")?.innerText!);

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
