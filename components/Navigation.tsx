import { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { NavigationProps } from '../shared/types';

const Navigation: NextPage<NavigationProps> = ({ chapters, chapterId, comicSlug, select }) => {
    let oldScrollY = 0;
    const [direction, setDirection] = useState('up');
    const selectedIndex = chapters.indexOf(chapters.find((chap) => chap.id === chapterId)!);
    const router = useRouter();

    const prevChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex + 1].chap}`,
            query: { id: chapters[selectedIndex + 1].id, source: select.source }
        })
    }, [comicSlug, chapters, selectedIndex, router])
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex - 1].chap}`,
            query: { id: chapters[selectedIndex - 1].id, source: select.source }
        })
    }, [comicSlug, chapters, selectedIndex, router])
    const selectChapter = (chapterSlug: string) => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapterSlug}`,
            query: {
                id: chapters.find((chap: { chap: any; }) => chap.chap === chapterSlug)?.id,
                source: select.source
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

    const controlDirection = () => {
        if (window.scrollY > oldScrollY) {
            setDirection('down');
        } else {
            setDirection('up');
        }
        oldScrollY = window.scrollY;
    }

    useEffect(() => {
        window.addEventListener('scroll', controlDirection);
        return () => {
            window.removeEventListener('scroll', controlDirection);
        };
    }, []);

    return (
        <div className={`z-10 overflow-x-hidden flex items-center gap-1 w-full justify-center bg-primary ${direction === 'up' && 'sticky top-0'}`}>
            <Link  href={`/?source=${select.source}`}>
                <a className='mr-2'>
                    <i className="fas fa-home text-2xl"></i>
                </a>
            </Link>
            <Link  href={`/comic/${router.query.slug}?source=${select.source}`}>
                <a className='mr-2'>
                    <i className="fas fa-list text-3xl"></i>
                </a>
            </Link>
            <button disabled={selectedIndex === chapters.length - 1} onClick={prevChapter} className='p-2 bg-link hover:bg-link-hover w-10 h-10 text-white disabled:opacity-50'>
                <i className="fas fa-chevron-left"></i>
            </button>
            <select
                onChange={(e) => selectChapter(e.target.value)}
                value={chapters[selectedIndex].chap}
                id="selectChapter"
                className='text-black p-2 h-10 my-1 max-w-[170px] sm:min-w-[300px] sm:max-w-[350px] outline-none'
            >
                {
                    chapters.map((item: any, index: any) => (
                        <option key={index} className=' text-black' value={item.chap}>{item.name}</option>
                    ))
                }
            </select>
            <button disabled={selectedIndex < 1} onClick={nextChapter} className='p-2 bg-link hover:bg-link-hover w-10 h-10 text-white disabled:opacity-50'>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Navigation;