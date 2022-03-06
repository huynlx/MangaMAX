import axios from "../axios";
import { store } from "../../store";
import { titleCase } from "./titleCase";

const getSearch = async (keyword: string, page: number = 1): Promise<any> => {
    const sections = {
        "Tìm truyện tranh": `api/search?opt1=${encodeURI(keyword)}`
    }

    const state = store.getState().reducer;

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(url)).data)
    )

    const data = htmls.map((source, index) => {
        var json = source;

        const items = json.map((item: any) => ({
            title: titleCase(item.name),
            cover: state.url + 'assets/tmp/book/avatar/' + item.avatar + '.jpg',
            chapter: 'Chapter ' + item.last_chapter,
            slug: item.url + '-' + item.id_book,
            updateAt: item.last_update
        }));

        const hasNextPage = false;
        const currentPage = page;

        return {
            name: Object.keys(sections)[index],
            nameAlt: 'Search results',
            items,
            hasNextPage,
            currentPage
        };
    });

    return data;

};

export default getSearch;