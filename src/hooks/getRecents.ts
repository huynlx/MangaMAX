import { useAppSelector } from "@/hooks/useRedux";

const getRecents = () => {
    const { reducer4 } = useAppSelector(state => state);

    return {
        data: {
            pages: [{
                items: [...reducer4.recents].reverse()
            }]
        }
    };
};

export default getRecents;