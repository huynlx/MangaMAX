import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../shared/useSetData';
import { setCol } from '../shared/useSetData';
import Loader from '../components/Loader';
import ColumnRender from './ColumnRender';
import useInfiniteScroll from "react-infinite-scroll-hook";
import useFetchHome from '../hooks/useFetchHome';
import { handleSource } from '../store/action';

const Grid: NextPage = () => {
    const { windowSize } = useSelector((state: any) => state.reducer2);
    const [cols, setCols] = useState(8);
    const select: any = useSelector((state: any) => state.reducer);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchHome({ source: select.source, type: select.type });
    const list = data?.pages.map((list) => list.items).flat(); //gộp các mảng page thành 1 mảng data
    const content = setData(cols, list ? list : []);
    const dispatch = useDispatch();


    useEffect(() => {
        if (cols !== setCol(windowSize)) {
            setCols(setCol(windowSize));
        }
    }, [windowSize])

    const [sentryRef] = useInfiniteScroll({
        loading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
        onLoadMore: fetchNextPage,
        rootMargin: "0px 0px 100px 0px",
    });

    return (
        <main className='main px-[2vw] md:px-[5vw] pb-[5rem]'>
            {
                (isLoading || isFetchingNextPage) && <Loader />
            }
            <div className='picker flex gap-5 items-center my-5'>
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
            <div ref={sentryRef} className='flex justify-center pt-5'></div>
        </main>
    );
};

export default Grid;