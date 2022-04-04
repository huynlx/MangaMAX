import { useAppSelector } from "hooks/useRedux";

const getRecents = () => {
    const { reducer4 }: any = useAppSelector(state => state);

    return {
        data:{
            pages: [{
                items: reducer4.recents.slice().reverse()
            }]
        }
    };
};

export default getRecents;