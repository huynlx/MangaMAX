import instance from "../axios";
import { store } from "../../store";
import { decrypt_data } from "./decrypt";
import { titleCase } from "./titleCase";

const getHome = async (page: number = 1): Promise<any> => {
    const state = store.getState().reducer;

    const handleSource = () => {
        if (state.type === 'browse') {
            return `api/list_item?page=${page}&limit=40&sort=new&type=all&tag=Truy%E1%BB%87n%20si%C3%AAu%20hay&child=off&status=all&num_chapter=0`
        } else {
            return `api/list_item?page=${page}&limit=40&sort=new&type=all&tag=&child=off&status=all&num_chapter=0`
        }
    }

    const handleData = () => {
        let listItems = [];
        let json = JSON.parse(decrypt_data((htmls[0])));

        for (var i of Object.keys(json)) {
            var item = json[i];
            if (!item.name) continue;

            listItems.push({
                title: titleCase(item.name),
                cover: state.url + 'assets/tmp/book/avatar/' + item.avatar + '.jpg',
                chapter: 'Chapter ' + item.last_chapter,
                slug: item.url + '-' + item.id_book,
                updateAt: item.last_update,
            });
        };

        var allPage = (json['total'] / 40);
        var metadata = (page < allPage) ? true : false;
        const hasNextPage = metadata;
        const currentPage = page;

        return [{
            name: Object.keys(sections)[0],
            items: listItems,
            hasNextPage,
            currentPage
        }]
    }

    const sections = {
        "Truyện": handleSource()
    }

    const htmls = await Promise.all(
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await instance.get(url)).data)
    )

    const data = handleData();

    return data;

};

export default getHome;