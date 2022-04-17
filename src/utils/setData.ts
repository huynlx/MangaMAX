import { WINDOW_SIZE } from "@/constants/index";

export const setCol = (windowSize: any) => {
    switch (windowSize) {
        case WINDOW_SIZE.all: //min-width: 1200px
            return 8;
        case WINDOW_SIZE.desktop: //min-width: 992px
            return 7;
        case WINDOW_SIZE.laptop: //min-width: 768px
            return 5;
        case WINDOW_SIZE.tablet: //min-width: 480px
            return 4;
        case WINDOW_SIZE.phablet: //min-width: 320px
            return 3;
        case WINDOW_SIZE.mobile: //max-width: 320px
            return 2;
        default:
            return 1;
    }
}

export const setData = (colRendered: number, lists: string | any[]) => {
    let col = 0;
    const items: any[] = [];

    for (let i = 0; i < colRendered; i++) {
        items.push([]);
    }

    for (let i = 0; i < lists.length; i++) {
        items[col].push(lists[i]);
        col++;
        if (col === colRendered) {
            col = 0;
        }
    }
    return items;
}