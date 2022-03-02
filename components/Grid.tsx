import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner8 } from 'react-icons/im';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux'
import ReadImage from './ReadImage';

const Grid: NextPage<any> = ({ data, keyword, page }: any) => {
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>([]);
    const { source, type } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const select: any = useSelector(state => state);

    useEffect(() => {
        setPosts(data)
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
        } else {
            setPosts(data)
        }
    }, [page])

    useEffect(() => {
        setPosts(data)
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
            console.log(pageOffset - lastUserLoadedOffset);

            // Detects when user scrolls down till the last user
            if (pageOffset - lastUserLoadedOffset >= -900) {
                if (data[0].hasNextPage) {
                    // Trigger fetch
                    router.push({
                        pathname: router.pathname,
                        query: keyword ? { page: data[0].currentPage + 1, keyword: keyword, source: select.source } : { page: data[0].currentPage + 1, source: select.source, type: select.type }
                    }, undefined, { scroll: false })
                }
            }
        }
    }

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return (

        <main className='main px-[5vw]'>
            {
                posts.length > 0 &&
                posts.map((section: any) => (
                    <Fragment key={section.name}>
                        {/* <h1 className='text-2xl font-semibold my-5'>{section.nameAlt}</h1> */}
                        <div className='picker flex gap-5 items-center my-5'>
                            <h1
                                className={`font-semibold ${select.type === 'latest' ? 'text-white text-2xl' : 'text-xl brightness-75'}`}
                                onClick={() => {
                                    router.push({
                                        pathname: '/',
                                        query: { type: 'latest', source: select.source }
                                    })
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
                                    })
                                }}
                            >
                                Browse
                            </h1>
                        </div>
                        <div className={`grid gap-2 comic-list mb-28`} style={{
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gridAutoRows: "1fr",
                        }}>
                            {
                                section.items.map((item: any, index: number) => (
                                    <Link href={`/comic/${item.slug}?source=${select.source}`} key={index}>
                                        <a className='flex flex-col items-stretch comic border overflow-hidden border-transparent rounded-lg'>
                                            <div className='w-full h-0 pb-[150%] relative flex-grow bg-gray-400'>
                                                <ReadImage className='absolute top-0 left-0 w-full h-full object-cover duration-200' key={index} src={item.cover} className2='!h-[16rem]' />
                                                {
                                                    item.updateAt && <small className='p-2 py-1 rounded-full absolute bg-nav text-white opacity-90 top-1 left-1'>{item.updateAt}</small>
                                                }
                                            </div>
                                            <div className='root p-2 bg-gray-700 text-white'>
                                                <h1 className=' max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.title}</h1>
                                                <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden  text-center flex-shrink-0'>{item.chapter}</p>
                                            </div>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                        {data[0].hasNextPage && <ImSpinner8 size={30} className='mb-28 animate-spin mx-auto' />}
                    </Fragment>
                ))
            }
            {!data[0].hasNextPage && <p className='w-full text-center mb-28 font-bold text-xl'>End</p>}
        </main >
    );
};

export default Grid;