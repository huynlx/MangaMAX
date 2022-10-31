import axios from "axios";

type IProps = {
    source?: string;
    type?: string;
};
class Fetch {
    source?: string;
    type?: string;

    constructor(select: IProps) {
        this.source = select.source;
        this.type = select.type;
    }

    home = async ({ page }: any): Promise<any> => {
        const { data } = await axios.get(`/api/home?source=${this.source}&type=${this.type}&page=${page}`);

        return data[0];
    };

    search = async ({ page, keyword }: any): Promise<any> => {
        try {
            const { data } = await axios.get(`/api/search?source=${this.source}&keyword=${keyword}&page=${page}`);

            return data[0];
        } catch (error) {
            return {
                hasNextPage: false,
                name: 'Search',
                nameAlt: 'Search results',
                items: [],
                currentPage: null
            };
        }
    };

    comic = async ({ slug }: any): Promise<any> => {
        const { data } = await axios.get(`/api/comic?source=${this.source}&slug=${slug}`);

        return data;
    };

    chapter = async ({ slug, chapter, id }: any): Promise<any> => {
        const { data } = await axios.get(`/api/chapter?source=${this.source}&slug=${slug}&chapSlug=${chapter}&id=${id}`);

        return data;
    };

    chapters = async ({ slug, chapter, id }: any): Promise<any> => {
        const { data } = await axios.get(`/api/chapters?source=${this.source}&slug=${slug}&chapSlug=${chapter}&id=${id}`);

        return data;
    };
}

export default Fetch;