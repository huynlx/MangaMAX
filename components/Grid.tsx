import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../shared/useSetData';
import { setCol } from '../shared/useSetData';
import Loader from '../components/Loader';
import ColumnRender from './ColumnRender';
import useInfiniteScroll from "react-infinite-scroll-hook";
import useFetchHome from '../hooks/useFetchHome';
import useFetchSearch from '../hooks/useFetchSearch';
import { handleSource } from '../store/action';
import { IoArrowBack } from 'react-icons/io5';
import Router from 'next/router';

const Grid: NextPage<{ keyword?: string }> = ({ keyword }) => {
    const { windowSize } = useSelector((state: any) => state.reducer2);
    const [cols, setCols] = useState(8);
    const select: any = useSelector((state: any) => state.reducer);
    const fetch = keyword ? useFetchSearch : useFetchHome;
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = fetch({ source: select.source, type: select.type, keyword: keyword });
    const list = data?.pages.map((list) => list.items).flat(); //gộp các mảng page thành 1 mảng data
    const content = setData(cols, list ? list : []);
    const dispatch = useDispatch();
    const { reducer3 } = useSelector((state: any) => state);

    useEffect(() => {
        if (cols !== setCol(windowSize)) {
            setCols(setCol(windowSize));
        }
    }, [windowSize, cols])

    const [sentryRef] = useInfiniteScroll({
        loading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
        onLoadMore: fetchNextPage,
        rootMargin: "0px 0px 200px 0px",
    });

    useEffect(() => {
        const handleClick = () => {
            const position = window.pageYOffset;
            dispatch({ type: 'SCROLL_POSITION', payload: { scrollPosition: position } })
        };

        window.addEventListener('click', handleClick, { passive: true });

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, reducer3.scrollPosition);
    }, [reducer3.scrollPosition])

    return (
        <main className='main px-[2vw] lg:px-[5vw] pb-[5rem]'>
            {
                (isLoading || isFetchingNextPage) && <Loader />
            }
            <div className='picker flex gap-5 items-center my-5'>
                {
                    keyword && <h1
                        className={`w-full font-semibold ${select.type === 'search' ? 'text-white text-2xl' : 'text-xl brightness-75'}`}
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
            <div className={`grid gap-2 comic-list`}>
                {
                    content.map((colRendered: any, key: number) => (
                        <ColumnRender
                            colRendered={colRendered}
                            key={key}
                            keyProp={key}
                            content={content}
                            select={select}
                        />
                    ))
                }
            </div>
            <div ref={sentryRef} />
        </main>
    );
};

export default Grid;