import { useInfiniteQuery } from 'react-query';
import Fetch from '@/core/fetch';

const useFetchHome = (props: any) => {
    const fetch = new Fetch(props);

    const fetchList = ({ pageParam = 1 }) => fetch.home({ ...props, page: pageParam });

    return useInfiniteQuery(["home", props], fetchList, { //props trên này là props truyền vào
        getNextPageParam: ({ hasNextPage, currentPage }) => { //props dưới này là dữ liệu trả về
            return !hasNextPage
                ? null
                : Number(currentPage) + 1;
        },
    });
};

export default useFetchHome;