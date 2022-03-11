import React, { useState } from 'react';
import { ComicProps } from 'shared/types';
import { RiSortDesc } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import LeftComic from 'components/LeftComic';
import RightComic from 'components/RightComic';
import { FaChevronLeft } from 'react-icons/fa';
import { titleCase } from 'shared/cmanga/titleCase';
import Head from 'next/head';
import LinkCheck from 'components/LinkCheck';

const Info = ({ info, slug }: ComicProps) => {
    const select: any = useSelector((state: any) => state.reducer);
    const { reducer3 }: any = useSelector((state: any) => state);
    const [dt, setDt] = useState<any>(info);
    const handleSort = () => {
        setDt({
            ...dt,
            chapters: dt.chapters.slice().reverse()
        });
    }

    return (
        <>
            <Head>
                <title>{info.title}</title>
            </Head>
            <div className='px-[2vw] lg:px-[5vw] lg:h-[92.5vh] pt-10 pb-3 flex flex-col lg:flex-row relative lg:max-h-[100vh] overflow-hidden gap-3'>
                <LinkCheck select={select} reducer3={reducer3}>
                    <h1
                        title='Go Back'
                        className='absolute top-[4px] text-2xl font-bold -ml-[0.3rem] hover:text-white'>
                        <FaChevronLeft className='inline mb-[0.3rem]' /> {titleCase(select.type)}
                    </h1>
                </LinkCheck>
                {/* Left Side */}
                <LeftComic
                    info={info}
                    select={select}
                    slug={slug}
                />
                {/* Right Side */}
                <p className='lg:hidden font-bold text-xl my-2 flex justify-between items-center'>
                    Chapters <span><RiSortDesc onClick={() => handleSort()} size={28} /></span>
                </p>
                <RightComic
                    dt={dt}
                    handleSort={handleSort}
                    slug={slug}
                    select={select}
                />
            </div >
        </>
    );
};

export default Info;