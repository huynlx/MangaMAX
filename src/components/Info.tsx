import React, { useState } from 'react';
import { ComicProps } from '@/shared/types';
import { RiSortDesc } from 'react-icons/ri';
import LeftComic from '@/components/LeftComic';
import RightComic from '@/components/RightComic';
import { FaChevronLeft } from 'react-icons/fa';
import { titleCase } from '@/shared/cmanga/titleCase';
import LinkCheck from '@/components/LinkCheck';
import { CgDisplayGrid } from 'react-icons/cg';
import { setScroll } from '@/store/action';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import Head from './Head';

const Info = ({ info, slug }: ComicProps) => {
    const { reducer: select, reducer3 } = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const [dt, setDt] = useState<any>(info);

    const handleSort = () => {
        setDt({
            ...dt,
            chapters: dt.chapters.slice().reverse()
        });
    }
    const handleChapter = () => {
        dispatch(setScroll(null, null, !reducer3.indexChapters));
    }

    return (
        <>
            <Head title={info.title} />
            <div className='px-[2vw] lg:px-x lg:h-[92.5vh] pt-10 pb-3 flex flex-col lg:flex-row relative lg:max-h-[100vh] overflow-hidden gap-3'>
                <LinkCheck select={select} reducer3={reducer3}>
                    <h1
                        title='Go Back'
                        className='absolute top-[4px] text-xl font-semibold -ml-[0.3rem] text-white'>
                        <FaChevronLeft className='inline mb-[0.3rem]' size={18} /> {titleCase(select.type)}
                    </h1>
                </LinkCheck>
                {/* Left Side */}
                <LeftComic
                    info={info}
                    select={select}
                    slug={slug}
                />
                {/* Right Side Mobile */}
                <div className='lg:hidden font-bold text-xl flex justify-between items-end'>
                    Chapters
                    <span className='space-x-2 flex'>
                        <CgDisplayGrid title='List | Index' onClick={() => handleChapter()} size={30} />
                        <div className='border h-[30px] bg-white'></div>
                        <RiSortDesc title='Sort' onClick={() => handleSort()} size={30} />
                    </span>
                </div>
                {/* Right Side Desktop */}
                <RightComic
                    dt={dt}
                    handleSort={handleSort}
                    slug={slug}
                    select={select}
                    handleChapter={handleChapter}
                    reducer3={reducer3}
                    source={info.source}
                />
            </div >
        </>
    );
};

export default Info;