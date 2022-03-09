import axios from "axios";
import { decrypt_data } from "../cmanga/decrypt";
import { titleCase } from "../cmanga/titleCase";
import { SOURCES } from "../constants";

const getHome = async (page: number = 1, source: string | number, type: string): Promise<any> => {
    const sourceObj = SOURCES.find(item => item.source == source);

    const handleSource = () => {
        if (type === 'browse') {
            if (source === '8') return `api/list_item?page=${page}&limit=40&sort=new&type=all&tag=&child=off&status=completed&num_chapter=0`
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
                cover: sourceObj?.url + 'assets/tmp/book/avatar/' + item.avatar + '.jpg',
                chapter: 'Chapter ' + item.last_chapter,
                slug: item.url + '-' + item.id_book,
                updateAt: item.last_update
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
        Object.entries(sections).map(([_, value]) => value).map(async (url) => (await axios.get(sourceObj?.url + url)).data)
    )

    const data = handleData();

    return data;

};

export default getHome;