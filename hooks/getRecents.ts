import { useSelector } from "react-redux";

const getRecents = () => {
    const { reducer4 }: any = useSelector((state: any) => state);

    return {
        data:{
            pages: [{
                items: reducer4.recents.slice().reverse()
            }]
        }
    };
};

export default getRecents;