export interface ComicProps {
    slug: string,
    info: {
        title: string,
        cover: string,
        author: string,
        status: string,
        genres: string[],
        desc: string,
        chapters: {
            name: string,
            updateAt: string,
            view: string,
            id: string,
            chap: string,
        }[]
    }
}