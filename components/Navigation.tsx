import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const Navigation: NextPage<any> = ({ chapters, chapterId, comicSlug }) => {
    console.log(chapters);

    const selectedIndex = chapters.indexOf(chapters.find((chap: { id: any; }) => chap.id === chapterId));
    console.log(selectedIndex);

    const router = useRouter();
    const prevChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex + 1].chap}`,
            query: { id: chapters[selectedIndex + 1].id }
        })
    }, [])
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex - 1].chap}`,
            query: { id: chapters[selectedIndex - 1].id }
        })
    }, [])
    const selectChapter = (chapterSlug: string) => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapterSlug}`,
            query: {
                id: chapters.find((chap: { id: any; }) => chap.id === chapterId)?.id,
            },
        });
    }


    return (
        <div>
            <button onClick={prevChapter} className='p-2 bg-link hover:bg-link-hover h-10'>Prev</button>
            <select onChange={(e) => selectChapter(e.target.value)} value={chapters[selectedIndex].chap} name="" id="selectChapter" className='text-black p-2 h-10 my-1 mx-1  min-w-[300px] max-w-[450px] outline-none'>
                {
                    chapters.map((item: any, index: any) => (
                        <option key={index} className=' text-black' value={item.chap}>{item.name}</option>
                    ))
                }
            </select>
            <button onClick={nextChapter} className='p-2 bg-link hover:bg-link-hover h-10'>Next</button>
        </div>
    );
};

export default Navigation;