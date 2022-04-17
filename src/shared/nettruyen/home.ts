import instance from "@/utils/axios";
import { parse } from "node-html-parser";

const getHome = async (page: number = 1, type: string, sourceNum: string): Promise<any> => {

    const handleSource = () => {
        if (type === 'browse') {
            return `hot?page=${page}`
        } else {
            return `?page=${page}`
        }
    }

    const handleData = () => {
        return htmls.map((source, index) => {
            const dom = parse(source);

            const items = dom.querySelectorAll(".ModuleContent .items .item").map((item) => {
                let elStatus = item.querySelectorAll('.message_main p')
                    .find(el => el.querySelector("label")?.innerText.includes("Tình trạng:"));
                let status = elStatus?.childNodes[2] ?
                    elStatus?.childNodes[2]?.textContent.includes("Đang") ? 'ONGOING' : 'COMPLETED' : 'ONGOING';
                let cover = item
                    .querySelector("img")
                    ?.getAttribute("data-original")
                    ?.replace("//", "https://");

                return ({
                    title: item.querySelector(".jtip")?.innerText,
                    cover: cover,
                    chapter: item.querySelector(".chapter a")?.innerText,
                    chapSlug: item.querySelector(".chapter a")?.getAttribute('href')?.split("/").slice(-2)[0],
                    chapId: item.querySelector(".chapter a")?.getAttribute('href')?.split("/").pop(),
                    slug: item
                        .querySelector("a")
                        ?.getAttribute("href")
                        ?.split("/")
                        .slice(-1)[0],
                    updateAt: item.querySelector(".chapter i")?.innerText,
                    status: status,
                    source: sourceNum
                });
            });

            const pages = [];
            for (const page of [...dom.querySelectorAll("ul.pagination > li")]) {
                const p = Number(page.querySelector('a')?.innerText.trim());
                if (isNaN(p)) continue;
                pages.push(p);
            }
            const lastPage = Math.max(...pages);
            const hasNextPage = (+page) !== lastPage;
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
        [type]: handleSource()
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await instance.get(url)).data)
    )

    const data = handleData();

    return data;

};

export default getHome;