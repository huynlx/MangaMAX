import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { getComicInfo } from '../../../shared/api/comic';
import { ComicProps } from '../../../shared/types';

const Comic: NextPage<ComicProps> = ({ info, slug }) => {
    console.log(info);

    return (
        <div className='px-[5vw] h-[100vh] py-10 flex'>
            <div className='w-[60vw] pr-10'>
                <div className='flex mb-2 gap-3'>
                    <img className='h-[300px] w-[200px] object-cover mr-3' src={info.cover} alt="" />
                    <div className='info gap-2 flex flex-col'>
                        <h1 className=' font-bold text-2xl'>{info.title}</h1>
                        <p>Tác giả: {info.author}</p>
                        <p>Trạng thái: {info.status}</p>
                        <p>Thể loại: {info.genres.join(", ")}</p>
                        <div>
                            <button className=' bg-link p-2 mr-2 rounded-sm hover:bg-link-hover transition duration-300'>Đọc từ đầu</button>
                            <button className=' bg-link p-2 rounded-sm hover:bg-link-hover  transition duration-300'>Đọc mới nhất</button>
                        </div>
                    </div>
                </div>
                <p className=' break-words text-justify'>{info.desc}</p>
            </div>
            <div className='chapters w-[40vw] max-h-[100vh] overflow-auto pr-3'>
                <ul>
                    {
                        info.chapters.map((item) => (
                            <Link key={item.id} href={{
                                pathname: `/comic/${slug}/${item.chap}`,
                                query: { id: item.id }
                            }}>
                                <a>
                                    <li>{item.name}<span className=' float-right'>{item.updateAt}</span></li>
                                </a>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const data = await getComicInfo(params?.slug as string);

        return {
            props: {
                slug: params?.slug,
                info: data,
            }
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
};

export default Comic;