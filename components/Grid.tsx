import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import getHome from '../shared/api/home';
import { useRouter } from 'next/router';

const Grid = ({ data }: any) => {
    const router = useRouter();

    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const getMorePost = async () => {
        // const res = await getHome(page);
        // const newPosts = res;
        // const post = posts.map((item: any) => ({
        //     ...item,
        //     items: [
        //         ...item.items,
        //         ...newPosts[0].items
        //     ]
        // }))
        // setPosts((post: any) => [...post, ...newPosts]);
        // setPosts(post);
        setPage(page + 1);
        router.push({
            pathname: router.pathname,
            query: { page: page + 1 }
        }, undefined, { scroll: false })
    };
    console.log(posts);


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


    return (

        <main className='main px-[5vw]'>
            {
                posts.length > 0 &&
                posts.map((section: any) => (
                    <Fragment key={section.name}>
                        <h1 className='text-2xl font-semibold my-5'>{section.name}</h1>
                        <div className='grid gap-2' style={{
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gridAutoRows: "1fr",
                        }}>
                            {
                                section.items.map((item: any) => (
                                    <Link href={`/comic/${item.slug}`} key={item.slug}>
                                        <a className='flex flex-col items-stretch'>
                                            <div className='w-full h-0 pb-[150%] relative flex-grow'>
                                                <img src={item.cover} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                                            </div>
                                            <h1 className=' max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.title}</h1>
                                            <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden  text-center flex-shrink-0'>{item.chapter}</p>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                        <div className='w-full text-center my-3'>
                            <button onClick={() => getMorePost()} className='p-2 bg-link '>next</button>
                        </div>
                    </Fragment>
                ))
            }
        </main>
    );
};

export default Grid;