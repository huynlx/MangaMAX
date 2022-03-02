import { parse } from "node-html-parser";
import axios from "../axios";
import { decrypt_data } from "./decrypt";
import { titleCase } from "./titleCase";
import { store } from "../../store";

export const getComicInfo = async (comicSLug: string): Promise<any> => {
    const state = store.getState();

    const html = (await axios.get(`${comicSLug}`)).data;
    const book_id = html.match(/book_id.+"(.+)"/)[1];
    const html2 = (await axios.get(`api/book_chapter?opt1=${book_id}`)).data;
    const hmtl3 = (await axios.get(`api/book_detail?opt1=${book_id}`)).data;

    const json = JSON.parse(decrypt_data(html2));

    const dom = parse(html);

    const chapters = [];
    for (const obj of json) {
        const time = obj.last_update.split(' ');
        const d = time[0].split('-');
        const t = time[1].split(':');
        const d2 = d[1] + '/' + d[2] + '/' + d[0];
        const t2 = t[0] + ":" + t[1];
        chapters.push({
            name: titleCase(obj.chapter_name),
            updateAt: time[0],
            view: obj.total_view,
            id: obj.id_chapter,
            chap: 'chapter-' + parseFloat(obj.chapter_num),
        });
    }

    let tags = JSON.parse(decrypt_data(hmtl3))[0].tags.split(",").slice(1, -1).map((item: any) => titleCase(item));
    let status = dom.querySelectorAll(".status")[0].innerText.indexOf("Đang") != -1 ? 'Đang tiến hành' : "Đã hoàn thành";
    let desc = dom.querySelectorAll("#book_detail")[0].innerText === '' ? dom.querySelectorAll("#book_more")[0].innerText : dom.querySelectorAll("#book_detail")[0].innerText;
    let image = state.url + dom.querySelectorAll(".book_avatar img")[0].getAttribute("src");
    let creator = dom.querySelector(".profile a")?.innerText || 'Unknown';
    let title = dom.querySelector('.name')?.innerText

    return {
        title: title,
        cover: image,
        author: creator,
        status: status,
        genres: tags,
        desc: desc,
        chapters: chapters
    }
}



