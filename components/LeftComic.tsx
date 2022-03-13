import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import ReadImage from './ReadImage';

const LeftComic = ({ info, select, slug }: any) => (
    <div className='lg:w-[59vw] lg:pr-10 max-h-[none] lg:max-h-[100vh] overflow-auto'>
        <div className='flex mb-4 gap-5 flex-col sm:flex-row'>
            <ReadImage
                className='h-[315px] w-[200px] min-w-[200px] object-cover mx-auto sm:mx-0 rounded-lg duration-[0ms]'
                src={info.cover}
                className2='bg-gray-400 rounded-lg !h-[315px] max-w-[200px]'
            />
            <div className='info gap-2 flex flex-col'>
                <h1 className=' font-bold text-3xl text-white'>{info.title}</h1>
                <p className='text-white text-lg font-semibold'>Author: <span className='text-gray-300'>{info.author}</span></p>
                <p className='text-white text-lg font-semibold'>Status: <span className='text-gray-300'>{info.status}</span></p>
                {/* <p>Thể loại: {info.genres.join(", ")}</p> */}
                {info.chapters.length > 0 && <div className='my-2 flex items-center'>
                    <Link as={`/comic/${slug}/${info.chapters.slice(-1)[0].chap}`} href={{
                        pathname: `/comic/${slug}/${info.chapters.slice(-1)[0].chap}`,
                        query: { id: info.chapters.slice(-1)[0].id, source: select.source, type: select.type },
                    }}>
                        <a className='text-white mr-4 bg-link pr-2 py-1 pl-4 rounded-full hover:bg-link-hover text-2xl font-bold transition duration-300'>READ<FaChevronRight className='inline mb-[0.3rem]' /></a>
                    </Link>
                    <Link as={`/comic/${slug}/${info.chapters[0].chap}`} href={{
                        pathname: `/comic/${slug}/${info.chapters[0].chap}`,
                        query: { id: info.chapters[0].id, source: select.source, type: select.type },
                    }}>
                        <a className='text-white text-xl bg-yellow-500/[.8] h-[42px] min-w-[42px] px-2 flex items-center justify-center rounded-full hover:bg-yellow-500 duration-300 font-bold'>{info.chapters[0].nameIndex}</a>
                    </Link>
                </div>}
            </div>
        </div>
        <h1 className='text-2xl text-white font-bold border-l-[5px] border-red-400 pl-2 mb-3'>Summary</h1>
        <p className=' break-words text-justify text-white'>{info.desc}</p>
        <div className='mt-4'>
            {
                info.genres.map((item: any, index: number) => (
                    <p key={index} className='inline-block bg-gray-700 mr-2 px-4 py-[5px] rounded-full mb-2 text-white'>{item}</p>
                ))
            }
        </div>
    </div >
);

export default LeftComic;