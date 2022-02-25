import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import getHome from '../shared/api/home';

const Grid = ({ data }: any) => {
    const [posts, setPosts] = useState(data);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const getMorePost = async () => {
        const res = await getHome(page);
        const newPosts = res;
        const post = posts.map((item: any) => ({
            ...item,
            items: [
                ...item.items,
                ...newPosts[0].items
            ]
        }))
        setPosts((post: any) => [...post, ...newPosts]);
        setPosts(post);
        setPage(page + 1);
    };

    console.log(posts);
    

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={getMorePost}
            hasMore={hasMore}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
        >
            <main className='main px-[5vw]'>
                {
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
                        </Fragment>
                    ))
                }
            </main>
            {/* <style jsx>
                {`
              .main {
                 padding: 10px;
                background-color: dodgerblue;
                 color: white;
                 margin: 10px;
                  }
            `}
            </style> */}
        </InfiniteScroll>
    );
};

export default Grid;