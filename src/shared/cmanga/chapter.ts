import axios from "@/utils/axios";
import { decrypt_data } from "./decrypt";
import { titleCase } from "./titleCase";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `api/chapter_content?opt1=${chapterId}`,
        `${comicSLug}`
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const chapter = JSON.parse(decrypt_data(html[0]))[0];
    const chapter_content = JSON.parse(chapter.content);
    var pages: string[] = [];
    for (const img of chapter_content) {
        const image = img.replace('.net', '.com').replace('?v=1&', '?v=9999&') as string;
        pages.push(image); //1,01,11,21,31,41,...
    }

    const book_id = html[1].match(/book_id.+"(.+)"/)[1];
    const html2 = (await axios.get(`api/book_chapter?opt1=${book_id}`)).data;
    const json = JSON.parse(decrypt_data(html2));
    const chapters: any = [];
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

    return {
        title: chapter.book_name,
        chapterCurrent: chapter.chapter_name,
        updateAt: chapter.last_update,
        images: pages,
        chapters: chapters,
        source
    }
}