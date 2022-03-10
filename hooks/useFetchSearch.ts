import { useInfiniteQuery } from 'react-query';
import { getSearch } from './fetch';

const useFetchHome = (props: any) => {
    const fetchList = ({ pageParam = 1 }) => getSearch({ ...props, page: pageParam });

    return useInfiniteQuery(["search", props], fetchList, { //props is returned data
        getNextPageParam: (props) => {
            return !props.hasNextPage
                ? null
                : Number(props.currentPage) + 1;
        },
    });
};

export default useFetchHome;