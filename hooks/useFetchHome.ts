import { useInfiniteQuery } from 'react-query';
import { getHome } from './fetch';

const useFetchHome = (props: any) => {
    const fetchList = ({ pageParam = 1 }) => getHome({ ...props, page: pageParam });

    return useInfiniteQuery(["home", props], fetchList, { //props is returned data
        getNextPageParam: (props) => {
            return !props.hasNextPage
                ? null
                : Number(props.currentPage) + 1;
        },
    });
};

export default useFetchHome;