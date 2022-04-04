import { RootState } from "store"

export interface ChaptersProps {
    name: string,
    updateAt: string,
    view: string,
    id: string,
    chap: string,
}

export interface ComicProps {
    slug: string,
    info: {
        title: string,
        cover: string,
        author: string,
        status: string,
        genres: string[],
        desc: string,
        chapters: ChaptersProps[]
    }
}

export interface SourceProps {
    source: string | number,
    name: string,
    url: string,
    type: string
}

export interface NavigationProps {
    chapters: ChaptersProps[],
    chapterId: string,
    comicSlug: string,
    select: RootState,
    select2: RootState
}

export interface GridProps {
    data: {
        name: string,
        items: {
            title: string,
            cover: string,
            slug: string[],
            updateAt: string,
            chapter: string
        }[],
        hasNextPage: boolean,
        currentPage: number
    }[],
    keyword?: string,
    size: number,
    setSize: (value: number) => void
}