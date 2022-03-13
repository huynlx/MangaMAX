import Link from 'next/link';
import React from 'react';
import ReadImage from './ReadImage';

const Comic = ({ item, select, mangaRef }: any) => (
    <Link href={`/comic/${item.slug}?source=${select.source}&type=${select.type}`} as={`/comic/${item.slug}`}>
        <a ref={mangaRef} className='flex flex-col items-stretch comic border overflow-hidden border-transparent rounded-xl'>
            <div className='w-full h-0 pb-[155%] relative flex-grow bg-gray-400'>
                <ReadImage
                    className='object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-300'
                    src={item.cover}
                    color={item.color}
                    className2='!h-[16rem]'
                />
                {item.status &&
                    <small className='px-2 md:py-1 rounded-full absolute bg-green-400/[.7] md:font-semibold text-white top-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.status}</small>}
                {item.updateAt &&
                    <small className='lg:leading-[1.1] px-2 md:py-1 rounded-full absolute bg-nav/[.7] md:font-semibold text-white bottom-1 left-1 whitespace-nowrap text-ellipsis overflow-hidden max-w-[80%] 2xl:w-[auto]'>{item.updateAt}</small>}
            </div>
            <div className='root p-2 bg-gray-700 text-white'>
                <h1 className=' max-w-full text-center flex-shrink-0 text-sm sm:text-base'>{item.title}</h1>
                {/* <p className='max-w-full whitespace-nowrap overflow-ellipsis overflow-hidden text-center flex-shrink-0'>{item.chapter}</p> */}
            </div>
        </a>
    </Link>
);

export default Comic;