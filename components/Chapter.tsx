import React, { memo, useCallback } from 'react';
import Link from 'next/link';
import Navigation from 'components/Navigation';
import { useRouter } from 'next/router';
import ReadImage from 'components/ReadImage';
import Head from 'next/head';
import { FaArrowRight } from 'react-icons/fa';
import { useAppSelector } from "hooks/useRedux";
import Spinner from './Spinner';

const ChapterComponent = ({ chapter, chapterId, comicSlug }: any) => {
    const { reducer: select, reducer3: select2 } = useAppSelector(state => state);
    const router = useRouter();
    const selectedIndex = chapter.chapters.indexOf(chapter.chapters.find((chap: { id: string }) => chap.id === chapterId));
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/manga/${comicSlug}/${chapter.chapters[selectedIndex - 1].chap}`,
            query: { id: chapter.chapters[selectedIndex - 1].id, source: chapter.source }
        })
    }, [comicSlug, chapter.chapters, selectedIndex, router, select.source, select.type])

    return (
        <>
            <Head>
                <title>{chapter.title + " (" + chapter.chapterCurrent.replace('- ', '') + ")"}</title>
            </Head>
            <div className='flex flex-col items-center mx-auto'>
                <p className="text-2xl px-[5vw]">
                    <Link href={`/manga/${comicSlug}?source=${chapter.source}`}>
                        <a className="text-main">{chapter.title}</a>
                    </Link>
                    <span className='w-full'> {chapter.chapterCurrent} <small>{chapter.updateAt}</small></span>
                </p>
                <Navigation
                    chapters={chapter.chapters}
                    source={chapter.source}
                    chapterId={chapterId}
                    comicSlug={comicSlug}
                    select={select}
                    select2={select2}
                />
                <div className='min-h-[100vh] w-full py-4'>
                    {
                        chapter.images.map((image: string, index: number) =>
                            <ReadImage
                                className='mx-auto object-cover w-full h-auto lg:min-w-[50vw] lg:max-w-[55vw] transition-opacity'
                                key={index}
                                src={image}
                                icon={Spinner}
                                className3='text-logo-darken'
                                alt='Đọc truyện tại Manga Max'
                            />)
                    }
                </div>
                <div className={`w-full h-60 p-8 mb-20 ${selectedIndex < 1 && 'hidden'}`}>
                    <button onClick={nextChapter} className="w-full h-full border-2 border-dashed border-gray-600 text-gray-600 hover:border-white hover:text-white transition duration-300 flex items-center justify-center">
                        <p className="text-2xl flex gap-3 items-center">Next Chapter <FaArrowRight className='mt-[3px]' /></p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default memo(ChapterComponent);
