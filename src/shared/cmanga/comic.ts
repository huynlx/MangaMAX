import { parse } from "node-html-parser";
import axios from "@/utils/axios";
import { decrypt_data } from "./decrypt";
import { titleCase } from "./titleCase";
import decodeHTMLEntity from "@/utils/decodeHTML";

export const getComicInfo = async (comicSLug: string, url: string, source: string): Promise<any> => {
    const html = (await axios.get(`${comicSLug}`)).data;
    const book_id = html.match(/book_id.+"(.+)"/)[1];
    const hmtl3 = (await axios.get(`api/book_detail?opt1=${book_id}`)).data;

    const detail = JSON.parse(decrypt_data(hmtl3))[0];

    const dom = parse(html);

    let tags = detail.tags.split(",").slice(1, -1).map((item: any) => titleCase(item));
    let status = detail.status;
    let desc = dom.querySelectorAll("#book_detail")[0].innerText === '' ? dom.querySelectorAll("#book_more")[0].innerText : dom.querySelectorAll("#book_detail")[0].innerText;
    let image = url + dom.querySelectorAll(".book_avatar img")[0].getAttribute("src");
    let creator = dom.querySelector(".profile a")?.innerText || 'Updating';
    let title = dom.querySelector('.name')?.innerText

    return {
        title: title,
        cover: image,
        author: creator,
        status: status,
        genres: tags,
        desc: decodeHTMLEntity(desc),
        chapters: [],
        source,
        lastUpdate: detail.last_update
    }
}



