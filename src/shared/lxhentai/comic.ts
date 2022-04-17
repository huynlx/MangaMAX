import { parse } from "node-html-parser";
import useSlug from "@/utils/setSlug";
import axios from "@/utils/axios"
import decodeHTMLEntity from "@/utils/decodeHTML";
import getQueryParams from "@/utils/getQueryParams";

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
    const html = (await axios.get(`story/view.php?id=${comicSLug}`)).data;
    const dom = parse(html);
    const cover = 'https://lxhentai.com' + dom.querySelector('.col-md-8 > .row > .col-md-4 > img')?.getAttribute('src');
    const index = dom.querySelectorAll('#listChuong > ul > .row:not(:first-child) > div.col-5').map((item, index) => index).reverse();

    return {
        title: decodeHTMLEntity(dom.querySelector('h1.title-detail')?.innerText.trim()!),
        cover: `/api/proxy?url=${encodeURIComponent(cover as string)}&source=3`,
        author: dom.querySelector('.col-md-8 .row.mt-2 a[href*=tacgia]')?.innerText,
        status: dom.querySelectorAll('.col-md-8 .row.mt-2 .col-8')[1].innerText,
        genres: dom.querySelectorAll('.col-md-8 .row.mt-2 .col-8')[2].querySelectorAll('a').map(genre => genre.innerText),
        desc: dom.querySelector('.detail-content > p')?.innerText,
        chapters: dom.querySelectorAll('#listChuong > ul > .row:not(:first-child)').map((chapter, i) => ({
            name: chapter.querySelector('div.col-5 a')?.innerText.trim(),
            updateAt: chapter.childNodes[3].textContent,
            view: chapter.childNodes[5].textContent,
            id: getQueryParams('id', chapter.querySelector('div.col-5 a')?.getAttribute('href')!),
            chap: useSlug(chapter.querySelector('div.col-5 a')?.innerText.trim()!),
            nameIndex: index[i] + 1
        })),
        source,
        lastUpdate: dom.querySelector("time.small")?.innerText.match(/\[Cập nhật lúc: (.*?)\]/)?.[1]
    }
}



