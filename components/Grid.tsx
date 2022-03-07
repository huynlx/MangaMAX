import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useSelector } from 'react-redux'
import ReadImage from './ReadImage';
import { setData } from '../shared/useSetData';
import { setCol } from '../shared/useSetData';
import { GridProps } from '../shared/types';
import Loader from '../components/Loader';
import useRouterStatus from '../shared/useRouterStatus';

const Grid: NextPage<GridProps> = ({ data, keyword, page }) => {
    const router = useRouter();
    const { isLoading } = useRouterStatus();
    const [posts, setPosts] = useState<any[]>([]);
    const [content, setContent] = useState(setData(8, data[0].items))
    const { source, type } = useSelector((state: any) => state.reducer);
    const { windowSize } = useSelector((state: any) => state.reducer2);
    const [cols, setCols] = useState(setCol(windowSize));
    const select: any = useSelector((state: any) => state.reducer);

    useEffect(() => {
        if (cols !== setCol(windowSize)) {
            setCols(setCol(windowSize));
        }
    }, [windowSize])

    useEffect(() => {
        setPosts(data)
        setContent(setData(cols, data[0].items))
    }, [source, type])

    useEffect(() => {
        if (page) {
            const post = posts.map((item: any) => ({
                ...item,
                items: [
                    ...item.items,
                    ...data[0].items
                ]
            }))
            setPosts(post)
            post.length !== 0 && setContent(setData(cols, post[0].items))
        } else {
            setPosts(data)
            setContent(setData(cols, data[0].items))
        }
    }, [page, cols])

    useEffect(() => {
        setPosts(data)
        setContent(setData(cols, data[0].items))
    }, [keyword])


    const handleScroll = () => {
        // To get page offset of last user
        const lastUserLoaded = document.querySelector<HTMLElement>(
            ".comic-list .comic:last-child"
        )

        if (lastUserLoaded) {

            const lastUserLoadedOffset =
                lastUserLoaded.offsetTop + lastUserLoaded.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight

            // Detects when user scrolls down till the last user
            if (pageOffset - lastUserLoadedOffset > 0) {
                if (data[0].hasNextPage) {
                    // Trigger fetch
                    router.push({
                        pathname: router.pathname,
                        query: keyword ? { page: data[0].currentPage + 1, keyword: keyword, source: select.source } : { page: data[0].currentPage + 1, source: select.source, type: select.type }
                    }, router.pathname + (keyword ? `/${keyword}` : ``), { scroll: false })
                }
            }
        }
    }

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        // Listen for scroll events
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return (
        <main className='main px-[2vw] md:px-[5vw]'>
            {
                isLoading && <Loader />
            }
            <div className='picker flex gap-5 items-center my-5'>
                <h1
                    className={`font-semibold ${select.type === 'latest' ? 'text-white text-2xl' : 'text-xl brightness-75'}`}
                    onClick={() => {
                        router.push({
                            pathname: '/',
                            query: { type: 'latest', source: select.source }
                        }, '/')
                    }}
                >
                    Latest
                </h1>
                <h1
                    className={`font-semibold ${select.type === 'browse' ? 'text-white text-2xl' : 'text-xl brightness-75'}`}
                    onClick={() => {
                        router.push({
                            pathname: '/',
                            query: { type: 'browse', source: select.source }
                        }, '/')
                    }}
                >
                    Browse
                </h1>
            </div>
            <div className={`grid gap-2 comic-list mb-28`}>
                {
                    content.map((colRendered: any, index: number) => (
                        <div className='col flex flex-col gap-2' key={index}>
                            {
                                colRendered.map((item: any, index: any) => (
                                    <Link as={`/comic/${item.slug}`} href={`/comic/${item.slug}?source=${select.source}`} key={index}>
                                        <a className='flex flex-col items-stretch comic border overflow-hidden border-transparent rounded-xl'>
                                            <div className='w-full h-0 pb-[155%] relative flex-grow bg-gray-400'>
                                                <ReadImage
                                                    className='absolute top-0 left-0 w-full h-full object-cover duration-300'
                                                    key={index}
                                                    src={item.cover}
                                                    className2='!h-[16rem]'
                                                />
                                                {
                                                    item.status &&
                                                    <small className='px-2 md:py-1 rounded-full absolute bg-green-400/[.7] md:font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.status}</small>
                                                }
                                                {
                                                    item.updateAt &&
                                                    <small className='lg:leading-[1.1] px-2 md:py-1 rounded-full absolute bg-nav/[.7] md:font-semibold text-white bottom-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.updateAt}</small>
                                                }
                                            </div>
                                            <div className='root p-2 bg-gray-700 text-white'>
                                                <h1 className=' max-w-full text-center flex-shrink-0 text-sm sm:text-base'>{item.title}</h1>
                                                {/* <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.chapter}</p> */}
                                            </div>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>

                    ))
                }
            </div>
            {/* {!data[0].hasNextPage && <p className='w-full text-center mb-28 font-bold text-xl'>End</p>} */}
        </main>
    );
};

export default Grid;