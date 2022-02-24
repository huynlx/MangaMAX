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
    }, [comicSlug, chapters, selectedIndex, router])
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex - 1].chap}`,
            query: { id: chapters[selectedIndex - 1].id }
        })
    }, [comicSlug, chapters, selectedIndex, router])
    const selectChapter = (chapterSlug: string) => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapterSlug}`,
            query: {
                id: chapters.find((chap: { chap: any; }) => chap.chap === chapterSlug)?.id,
            },
        });
    }
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.keyCode === 37) {
                prevChapter();
            } else if (e.keyCode === 39) {
                nextChapter();
            }
        };
        window.addEventListener("keyup", handler);

        return () => window.removeEventListener("keyup", handler);
    }, [prevChapter, nextChapter]);


    return (
        <div>
            <button disabled={selectedIndex === chapters.length - 1} onClick={prevChapter} className='p-2 bg-link hover:bg-link-hover h-10'>Prev</button>
            <select onChange={(e) => selectChapter(e.target.value)} value={chapters[selectedIndex].chap} name="" id="selectChapter" className='text-black p-2 h-10 my-1 mx-1  min-w-[300px] max-w-[450px] outline-none'>
                {
                    chapters.map((item: any, index: any) => (
                        <option key={index} className=' text-black' value={item.chap}>{item.name}</option>
                    ))
                }
            </select>
            <button disabled={selectedIndex < 1} onClick={nextChapter} className='p-2 bg-link hover:bg-link-hover h-10'>Next</button>
        </div>
    );
};

export default Navigation;