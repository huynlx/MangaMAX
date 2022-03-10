import { NextPage } from 'next';
import React from 'react';
import { RiSortDesc } from 'react-icons/ri';
import { CgDisplayGrid } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import Index from './Index';

const RightComic: NextPage<any> = ({ dt, handleSort, slug, select }) => {
    const { reducer3 } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const handleChapter = () => {
        dispatch({ type: 'SCROLL_POSITION', payload: { indexChapters: !reducer3.indexChapters } })
    }

    return (
        <div className='chapters lg:w-[40%]'>
            <div className='py-1 hidden lg:block sticky bg-primary top-0 text-white text-xl font-bold'>
                <h1 className='inline text-2xl border-l-[5px] border-red-400 ml-1 pl-2'>Chapters</h1>
                <RiSortDesc title='Sort' onClick={() => handleSort()} className=' mx-2 float-right font-bold hover:brightness-75' size={30} />
                <div className='float-right border h-[31px] bg-white'></div>
                <CgDisplayGrid title='List | Index' onClick={() => handleChapter()} className='float-right font-bold hover:brightness-75 mx-2' size={30} />
            </div>
            <ul className='overflow-y-scroll max-h-[80vh] -mr-[6px]'>
                {
                    reducer3.indexChapters ? (
                        <Index
                            select={select}
                            dt={dt}
                            slug={slug}
                        />
                    ) : (
                        <List
                            select={select}
                            dt={dt}
                            slug={slug}
                        />
                    )
                }
            </ul>
        </div>
    );
};

export default RightComic;