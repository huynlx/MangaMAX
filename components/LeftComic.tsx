import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import ReadImage from './ReadImage';

const LeftComic: NextPage<any> = ({ info, select, slug }) => {
    return (
        <div className='lg:w-[60vw] lg:pr-10 max-h-[none] lg:max-h-[100vh] overflow-auto'>
            <div className='flex mb-2 gap-4 flex-col sm:flex-row'>
                <ReadImage
                    className='h-[300px] w-[200px] min-w-[200px] object-cover mx-auto sm:mx-0 rounded-lg duration-[0ms]'
                    src={info.cover}
                    alt=""
                    className2='bg-gray-400 rounded-lg !h-[300px]'
                />
                <div className='info gap-2 flex flex-col'>
                    <h1 className=' font-bold text-2xl'>{info.title}</h1>
                    <p>Author: {info.author}</p>
                    <p>Status: {info.status}</p>
                    {/* <p>Thể loại: {info.genres.join(", ")}</p> */}
                    {
                        info.chapters.length > 0 && <div className='my-2'>
                            <Link href={{
                                pathname: `/comic/${slug}/${info.chapters.slice(-1)[0].chap}`,
                                query: { id: info.chapters.slice(-1)[0].id, source: select.source },
                            }}>
                                <a className='text-white bg-link p-2 mr-2 rounded-[4px] hover:bg-link-hover transition duration-300'>Start reading</a>
                            </Link>
                            <Link href={{
                                pathname: `/comic/${slug}/${info.chapters[0].chap}`,
                                query: { id: info.chapters[0].id, source: select.source },
                            }}>
                                <a className='text-white bg-link p-2 rounded-[4px] hover:bg-link-hover  transition duration-300'>Read Last</a>
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <p className=' break-words text-justify'>{info.desc}</p>
            {
                info.genres.map((item: any) => (
                    <p key={item} className='inline-block border-[1.6px] mr-2 px-4 py-[2px] rounded-full mt-2'>{item}</p>
                ))
            }
        </div>
    );
};

export default LeftComic;