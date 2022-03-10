import { useInfiniteQuery } from 'react-query';
import { getHome } from './fetch';

const useFetchHome = (props: any) => {
    const fetchList = ({ pageParam = 1 }) => getHome({ ...props, page: pageParam });

    return useInfiniteQuery(["home", props], fetchList, { //props trên này là props truyền vào
        getNextPageParam: (props) => { //props dưới này là dữ liệu trả về
            return !props.hasNextPage
                ? null
                : Number(props.currentPage) + 1;
        },
    });
};

export default useFetchHome;