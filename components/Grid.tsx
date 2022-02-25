import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Grid = ({ data, keyword }: any) => {
    const router = useRouter();
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        if (posts.length > 0) {
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
    }, [data])


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
            if (pageOffset - lastUserLoadedOffset > -500) {
                // Stops loading
                if (data[0].hasNextPage) {
                    // Trigger fetch
                    router.push({
                        pathname: router.pathname,
                        query: keyword ? { page: data[0].currentPage + 1, keyword: keyword } : { page: data[0].currentPage + 1 }
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
                        <h1 className='text-2xl font-semibold my-5'>{section.nameAlt}</h1>
                        <div className={`grid gap-2 comic-list ${data[0].hasNextPage ? 'mb-28' : 'mb-10'}`} style={{
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gridAutoRows: "1fr",
                        }}>
                            {
                                section.items.map((item: any, index: number) => (
                                    <Link href={`/comic/${item.slug}`} key={index}>
                                        <a className='flex flex-col items-stretch comic'>
                                            <div className='w-full h-0 pb-[150%] relative flex-grow'>
                                                <img src={item.cover} alt="cover" className='absolute top-0 left-0 w-full h-full object-cover' />
                                                <small className='p-2 py-1 rounded-full absolute bg-nav text-white opacity-90 top-1 left-1'>{item.updateAt}</small>
                                            </div>
                                            <h1 className=' max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.title}</h1>
                                            <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden  text-center flex-shrink-0'>{item.chapter}</p>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                    </Fragment>
                ))
            }
            {!data[0].hasNextPage && <p className='w-full text-center mb-10 font-bold text-xl'>End</p>}
        </main>
    );
};

export default Grid;