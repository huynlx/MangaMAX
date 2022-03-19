import { getBookmarks } from './fetch';
import { useQuery } from "react-query";

const useFetchBookmarks = (props: any) => useQuery(["infos", props.user?.uid], () => getBookmarks({ ...props }), {
    refetchOnMount: true
});

export default useFetchBookmarks;