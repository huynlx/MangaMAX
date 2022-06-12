import axios from "@/utils/axios";
import { decrypt_data } from "./decrypt";

export const getChapter = async (source: string, comicSLug: any, chapterSLug: any, chapterId: any): Promise<any> => {
    const links = [
        `api/chapter_content?opt1=${chapterId}`,
    ];
    const html = await Promise.all(links.map(async (link) => (await axios.get(link)).data));
    const chapter = JSON.parse(decrypt_data(html[0]))[0];
    const chapter_content = JSON.parse(chapter.content);
    var pages: string[] = [];
    for (const img of chapter_content) {
        const image = img.replace('.net', '.com').replace('?v=1&', '?v=9999&') as string;
        pages.push(image); //1,01,11,21,31,41,...
    }

    return {
        title: chapter.book_name,
        chapterCurrent: chapter.chapter_name,
        updateAt: chapter.last_update,
        images: pages,
        source
    }
}