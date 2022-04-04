
import { useAppSelector } from "hooks/useRedux";

const getBookmarks = () => {
    const { reducer4 } = useAppSelector(state => state);

    return {
        data: {
            pages: [{
                items: reducer4.bookmarks.slice().reverse()
            }]
        }
    };
};

export default getBookmarks;