import { useInfiniteQuery } from 'react-query';
import { getHome } from './fetch';

const useFetchHome = (props: any) => {
    const fetchList = ({ pageParam = 1 }) => getHome({ ...props, page: pageParam });

    return useInfiniteQuery(["home", props], fetchList, { //props trên này là props truyền vào
        getNextPageParam: ({ hasNextPage, currentPage }) => { //props dưới này là dữ liệu trả về
            return !hasNextPage
                ? null
                : Number(currentPage) + 1;
        },
    });
};

export default useFetchHome;