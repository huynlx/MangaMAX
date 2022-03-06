import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { RiSortDesc } from 'react-icons/ri';

const RightComic: NextPage<any> = ({ dt, handleSort, slug, select }) => {
    return (
        <div className='chapters lg:w-[40%] max-h-[100vh] overflow-auto border-gray-700 border lg:border-0'>
            <ul>
                <div className='px-3 py-1 hidden lg:block sticky bg-primary top-0 text-xl font-bold'>
                    <h1 className='inline'>Chapters</h1>
                    <RiSortDesc title='Sort' onClick={() => handleSort()} className='float-right font-bold hover:brightness-75' size={30} />
                </div>
                {
                    dt.chapters.map((item: any) => (
                        <Link key={item.id} href={{
                            pathname: `/comic/${slug}/${item.chap}`,
                            query: { id: item.id, source: select.source }
                        }}>
                            <a className='border-gray-700 px-3 pt-2 lg:border-0 border-b flex justify-between hover:text-link visited:text-link visited:hover:text-link-hover'>
                                <span className='transition duration-150 w-auto sm:w-7/12 text-left'>{item.name}</span>
                                <span className='text-gray-400 w-auto sm:w-1/4 text-right sm:text-center italic'>{item.updateAt}</span>
                                <span className='text-gray-400 w-2/12 text-sm text-right italic hidden sm:block self-start leading-[1.88]'>{item.view}</span>
                            </a>
                        </Link>
                    ))
                }
            </ul>
        </div>
    );
};

export default RightComic;