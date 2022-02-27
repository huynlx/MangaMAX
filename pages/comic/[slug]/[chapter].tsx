import { GetServerSideProps, NextPage } from 'next';
import React, { useCallback } from 'react';
import { getChapter } from '../../../shared/nettruyen/chapter';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Chapter: NextPage<any> = ({ chapter, chapterId, comicSlug }) => {
    const router = useRouter();
    const selectedIndex = chapter.chapters.indexOf(chapter.chapters.find((chap: { id: any; }) => chap.id === chapterId));
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapter.chapters[selectedIndex - 1].chap}`,
            query: { id: chapter.chapters[selectedIndex - 1].id }
        })
    }, [comicSlug, chapter.chapters, selectedIndex, router])

    return (
        <div className='flex  flex-col items-center mx-auto'>
            <p className="text-2xl px-[5vw]">
                <Link href={`/comic/${comicSlug}`}>
                    <a className="text-link">{chapter.title}</a>
                </Link>
                <span className='w-full'> {chapter.chapterCurrent} <small>{chapter.updateAt}</small></span>

            </p>
            <Navigation chapters={chapter.chapters} chapterId={chapterId} comicSlug={comicSlug} />
            <div className='min-h-[100vh] w-full md:max-w-[75vw] lg:md:max-w-[50vw]'>
                {
                    chapter.images.map((image: string | undefined, index: any) => <img className='mx-auto w-full object-cover h-auto' key={index} src={image} />)
                }
            </div>
            {/* <Navigation chapters={chapter.chapters} chapterId={chapterId} comicSlug={comicSlug} /> */}
            <div className={`w-full h-60 p-8 ${selectedIndex < 1 && 'hidden'}`}>
                <button onClick={nextChapter} className="w-full h-full border-2 border-dashed border-gray-600 text-gray-600 hover:border-white hover:text-white transition duration-300 flex items-center justify-center">
                    <p className="text-2xl flex gap-3 items-center">Chapter tiếp theo <i className="fas fa-arrow-right" style={{ marginTop: '3px' }} aria-hidden="true"></i></p>
                </button>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    try {
        const chapter = await getChapter(params?.slug, params?.chapter, query.id)
        return {
            props: {
                chapter,
                chapterId: query.id,
                comicSlug: params?.slug
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}

export default Chapter;