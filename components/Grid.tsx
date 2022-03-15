import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../shared/useSetData';
import { setCol } from '../shared/useSetData';
import Loader from '../components/Loader';
import ColumnRender from './ColumnRender';
import useFetchHome from '../hooks/useFetchHome';
import useFetchSearch from '../hooks/useFetchSearch';
import { handleSource } from '../store/action';
import { IoArrowBack } from 'react-icons/io5';
import Router from 'next/router';
import dynamic from 'next/dynamic';
const LoadMore = dynamic(() => import('./LoadMore'));

const Grid = ({ keyword }: { keyword?: string }) => {
    const { windowSize } = useSelector((state: any) => state.reducer2);
    const [cols, setCols] = useState(8);
    const select: any = useSelector((state: any) => state.reducer);
    const fetch = keyword ? useFetchSearch : useFetchHome;
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = fetch({ source: select.source, type: select.type, keyword: keyword });
    const [page, setPage] = useState<any>(1);
    const list = useMemo(() => data?.pages.map((list) => list.items).flat(), [data]); //gộp nhiều mảng page thành 1 mảng duy nhất
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
            dispatch({ type: 'SCROLL_POSITION', payload: { scrollPosition: position } })
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
        let currentPage = data?.pageParams.slice(-1)[0] || 1;
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [select])

    return (
        <main className='main px-[2vw] lg:px-[5vw] mb-28'>
            {
                isLoading && <Loader />
            }
            {
                isFetchingNextPage && <Loader className='md:hidden' />
            }
            <div className='picker flex gap-5 items-center my-5'>
                {
                    keyword && <h1
                        className={`w-full font-semibold text-white text-2xl`}
                    >
                        Search
                        <span onClick={() => { dispatch(handleSource(select.source, 'latest')); Router.push(`/`); }} className='float-right flex text-gray-300 hover:text-white transition gap-1 font-normal'><IoArrowBack size={30} /> Back</span>
                    </h1>
                }
                {
                    !keyword && (
                        <>
                            <h1
                                className={`font-semibold ${select.type === 'latest' ? 'text-white text-2xl' : 'text-xl brightness-75'}`}
                                onClick={() => {
                                    dispatch(handleSource(select.source, 'latest'))
                                }}
                            >
                                Latest
                            </h1>
                            <h1
                                className={`font-semibold ${select.type === 'browse' ? 'text-white text-2xl' : 'text-xl brightness-75'}`}
                                onClick={() => {
                                    dispatch(handleSource(select.source, 'browse'))
                                }}
                            >
                                Browse
                            </h1>
                        </>
                    )
                }
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