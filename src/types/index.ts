import { RootState } from "@/store"

export interface ChaptersProps {
    name: string,
    updateAt: string,
    view: string,
    id: string,
    chap: string,
    source: string
}

export interface ComicProps {
    slug: string | string[] | undefined,
    info: {
        title: string,
        cover: string,
        author: string,
        status: string,
        genres: string[],
        desc: string,
        chapters: ChaptersProps[],
        source: string
    },
    chapters: ChaptersProps[]
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
    select2: RootState,
    source: string
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

export interface SidebarProps {
    id: string,
    closeNav: () => void
}