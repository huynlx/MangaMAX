import Link from 'next/link';
import React from 'react';

const List = ({ select, slug, dt }: any) => {
    return dt.chapters.map((item: any) => (
        <Link key={item.id} href={{
            pathname: `/comic/${slug}/${item.chap}`,
            query: {
                id: item.id,
                source: select.source,
                type: select.type
            }
        }}>
            <a className='border-gray-700 text-white pr-[10px] pt-2 lg:border-0 border-b flex justify-between hover:text-link visited:text-link visited:hover:text-link-hover'>
                <span className='transition duration-150 w-auto sm:w-7/12 text-left'>{item.name}</span>
                <span className='text-gray-400 w-auto sm:w-1/4 text-right sm:text-center'>{item.updateAt}</span>
                <span className='text-gray-400 w-2/12 text-sm text-right hidden sm:block self-start leading-[1.88]'>{item.view}</span>
            </a>
        </Link>
    ))
};

export default List;