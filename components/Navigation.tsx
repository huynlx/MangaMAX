import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const Navigation: NextPage<any> = ({ chapters, chapterId, chapterSlug }) => {
    // const router = useRouter();
    // const prevChapter = useCallback(() => {

    // }, [])
    // const nextChapter = useCallback(() => {

    // }, [])
    // const selectChapter = () => {

    // }


    return (
        <div>
            <button className='p-2 bg-link hover:bg-link-hover h-10'>Prev</button>
            <select defaultValue={chapterId} name="" id="selectChapter" className='text-black p-2 h-10 my-1 mx-1  min-w-[300px] max-w-[450px] outline-none'>
                {
                    chapters.map((item: any, index: any) => (
                        <option key={index} className=' text-black' value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <button className='p-2 bg-link hover:bg-link-hover h-10'>Next</button>
        </div>
    );
};

export default Navigation;