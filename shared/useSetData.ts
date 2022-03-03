import { WINDOW_SIZE } from "./constants";

export const setCol = (windowSize: any) => {
    switch (windowSize) {
        case WINDOW_SIZE.all:
            return 8;
        case WINDOW_SIZE.desktop:
            return 7;
        case WINDOW_SIZE.laptop:
            return 5;
        case WINDOW_SIZE.tablet:
            return 4;
        case WINDOW_SIZE.phablet:
            return 3;
        case WINDOW_SIZE.mobile:
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