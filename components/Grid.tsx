import React, { useEffect, useState } from 'react';
import { setData } from '../shared/useSetData';
import { setCol } from '../shared/useSetData';
import Loader from '../components/Loader';
import ColumnRender from './ColumnRender';
import dynamic from 'next/dynamic';
const LoadMore = dynamic(() => import('./LoadMore'));
import { User } from 'firebase/auth';
import { useAppSelector } from 'hooks/useRedux';
import { usePosition } from 'hooks/usePosition';

interface GridProps {
    keyword?: string,
    fetch?: (props: any) => any,
    typeRender: React.ComponentType<{}>,
    user?: User | null
}

const Grid: React.FC<GridProps> = ({ keyword, fetch, typeRender: TypeRender, user }) => {
    const [cols, setCols] = useState(8);
    const [page, setPage] = useState<number>(1);
    const { reducer2: { windowSize }, reducer3, reducer: select } = useAppSelector(state => state);
    const { handleScrollTo } = usePosition();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = fetch!({ source: select.source, type: select.type, keyword: keyword, user: user });
    const list = data?.pages.map((list: any) => list.items).flat(); //gộp nhiều mảng page thành 1 mảng duy nhất
    const content = setData(cols, list ? list : []);

    useEffect(() => {
        (page > 1) && fetchNextPage();
    }, [page])

    useEffect(() => {
        if (cols !== setCol(windowSize)) {
            setCols(setCol(windowSize));
        }
    }, [windowSize])

    useEffect(() => {
        handleScrollTo('auto', reducer3.scrollPosition);
    }, []);

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        const handleScroll = () => {
            // To get page offset of last comic
            const lastComicLoaded = document.querySelector<HTMLElement>(
                ".comic-list .comic:last-child"
            )

            if (lastComicLoaded) {
                const lastComicLoadedOffset = lastComicLoaded.offsetTop + lastComicLoaded.clientHeight
                const pageOffset = window.pageYOffset + window.innerHeight

                // Detects when user scrolls down till the last comic
                if (pageOffset - lastComicLoadedOffset > -300) {
                    if (hasNextPage) {
                        // Trigger fetch
                        let nextPage = data?.pages.slice(-1)[0].currentPage + 1;
                        if (page !== nextPage) {
                            setPage(nextPage);
                        }
                    }
                }
            }
        }

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [data, page])

    useEffect(() => {
        (page > 1) && setPage(1);
    }, [select])

    return (
        <main className={`main px-[2vw] min-h-[calc(100vh-4rem)] relative lg:px-x ${isLoading ? 'bg-grid bg-no-repeat bg-contain xs:bg-auto bg-center' : 'mb-28'}`}>
            {
                isLoading && <Loader />
            }
            {
                isFetchingNextPage && <Loader className='md:hidden' />
            }
            <div className='picker flex gap-5 items-center mb-3 md:mt-1'>
                <TypeRender />
            </div>
            <div className={`gap-2 comic-list mb-10`}>
                {
                    content.map((colRendered: any, key: number) => (
                        <ColumnRender
                            colRendered={colRendered}
                            key={key}
                            select={select}
                        />
                    ))
                }
            </div>
            {
                (hasNextPage && page > 1) && <LoadMore />
            }
        </main>
    );
};

export default Grid;