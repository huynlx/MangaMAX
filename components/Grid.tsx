import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../shared/useSetData';
import { setCol } from '../shared/useSetData';
import Loader from '../components/Loader';
import ColumnRender from './ColumnRender';
import dynamic from 'next/dynamic';
const LoadMore = dynamic(() => import('./LoadMore'));
import { User } from 'firebase/auth';
import { setScroll } from 'store/action';

interface GridProps {
    keyword?: string,
    fetch?: (props: any) => any,
    typeRender: React.ComponentType<{}>,
    user?: User | null
}

const Grid = ({ keyword, fetch, typeRender: TypeRender, user }: GridProps) => {
    const { windowSize } = useSelector((state: any) => state.reducer2);
    const [cols, setCols] = useState(8);
    const select: any = useSelector((state: any) => state.reducer);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = fetch!({ source: select.source, type: select.type, keyword: keyword, user: user });
    const [page, setPage] = useState<any>(1);
    const list = useMemo(() => data?.pages.map((list: any) => list.items).flat(), [data]); //gộp nhiều mảng page thành 1 mảng duy nhất
    const content = useMemo(() => setData(cols, list ? list : []), [cols, list]);
    const dispatch = useDispatch();
    const { reducer3 } = useSelector((state: any) => state);

    useEffect(() => {
        (page > 1) && fetchNextPage();
    }, [page])

    useEffect(() => {
        if (cols !== setCol(windowSize)) {
            setCols(setCol(windowSize));
        }
    }, [windowSize])

    useEffect(() => {
        window.scrollTo(0, reducer3.scrollPosition);

        const handleClick = () => {
            const position = window.pageYOffset;
            dispatch(setScroll(position));
        };

        window.addEventListener('click', handleClick, { passive: true });

        return () => {
            window.removeEventListener('click', handleClick);
        };
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
        <main className={`main px-[2vw] lg:px-[5vw] mb-28 min-h-[75vh] ${isLoading && 'bg-grid bg-no-repeat bg-contain sm:bg-auto bg-sm lg:bg-lg'}`}>
            {
                isLoading && <Loader />
            }
            {
                isFetchingNextPage && <Loader className='md:hidden' />
            }
            <div className='picker flex gap-5 items-center my-5'>
                <TypeRender />
            </div>
            <div className={`grid gap-2 comic-list mb-10`}>
                {
                    content.map((colRendered: any, key: number) => {
                        return (
                            <ColumnRender
                                colRendered={colRendered}
                                key={key}
                                select={select}
                            />
                        );
                    })
                }
            </div>
            {
                (hasNextPage && page > 1) && <LoadMore />
            }
        </main>
    );
};

export default Grid;