import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import decodeHTMLEntity from "@/utils/decodeHTML";
import { getCover, getCoverOrigin } from "./utils";

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
    const html = (await axios.get(`read/${comicSLug}/`)).data;
    const dom = parse(html);
    let author = '';
    let genres = [];
    let status = '';
    let url = dom.querySelector('.tab-summary img')?.getAttribute('src')?.replace('-193x278', '')!;
    let desc = '';
    dom.querySelectorAll('.description-summary > .summary__content ul li').map((item) => {
        desc += '●  ' + item.innerText + '\n';
    });

    for (const test of dom.querySelectorAll('.post-content .post-content_item')) {
        switch (test.querySelector('.summary-heading > h5')?.innerText.trim()) {
            case 'Tác giả':
                author = test.querySelector('.author-content')?.innerText!;
                break;
            case 'Thể loại':
                for (const t of test.querySelectorAll('.genres-content > a')) {
                    const genre = t.innerText.trim();
                    // const id = t.getAttribute('href')
                    genres.push(genre);
                }
                break;
            case 'Tình trạng':
                status = test.querySelector('.summary-content')?.innerText.trim().toLowerCase().includes("đang") ? 'Ongoing' : 'Completed';
                break;
            default:
                break;
        }
    }

    return {
        title: decodeHTMLEntity(dom.querySelector('.post-title > h1')?.innerText.trim()!),
        cover: getCover(url),
        coverOrigin: getCoverOrigin(url),
        author: author !== '' ? author : 'Updating',
        status: status !== '' ? status : 'Updating',
        genres,
        desc,
        chapters: [],
        source,
        lastUpdate: dom.querySelector(".col-12 p")?.innerText.match(/Last Updated:(.*)/)?.[1]
    };
}



