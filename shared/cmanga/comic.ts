import { parse } from "node-html-parser";
import axios from "../axios";
import { decrypt_data } from "./decrypt";
import { titleCase } from "./titleCase";
import { store } from "../../store";
import decodeHTMLEntity from "../decodeHTML";

export const getComicInfo = async (comicSLug: string): Promise<any> => {
    const state = store.getState().reducer;

    const html = (await axios.get(`${comicSLug}`)).data;
    const book_id = html.match(/book_id.+"(.+)"/)[1];
    const html2 = (await axios.get(`api/book_chapter?opt1=${book_id}`)).data;
    const hmtl3 = (await axios.get(`api/book_detail?opt1=${book_id}`)).data;

    const json = JSON.parse(decrypt_data(html2));
    const detail = JSON.parse(decrypt_data(hmtl3))[0];

    const dom = parse(html);

    const chapters = [];
    const index = json.map((item: any, index: any) => index).reverse();
    for (const i in json) {
        const time = json[i].last_update.split(' ');
        const d = time[0].split('-');
        const t = time[1].split(':');
        const d2 = d[1] + '/' + d[2] + '/' + d[0];
        const t2 = t[0] + ":" + t[1];
        chapters.push({
            name: titleCase(json[i].chapter_name),
            updateAt: time[0],
            view: json[i].total_view,
            id: json[i].id_chapter,
            chap: 'chapter-' + parseFloat(json[i].chapter_num),
            nameIndex: index[i] + 1
        });
    }

    let tags = detail.tags.split(",").slice(1, -1).map((item: any) => titleCase(item));
    let status = detail.status;
    let desc = dom.querySelectorAll("#book_detail")[0].innerText === '' ? dom.querySelectorAll("#book_more")[0].innerText : dom.querySelectorAll("#book_detail")[0].innerText;
    let image = state.url + dom.querySelectorAll(".book_avatar img")[0].getAttribute("src");
    let creator = dom.querySelector(".profile a")?.innerText || 'Updating';
    let title = dom.querySelector('.name')?.innerText

    return {
        title: title,
        cover: image,
        author: creator,
        status: status,
        genres: tags,
        desc: decodeHTMLEntity(desc),
        chapters: chapters
    }
}



