import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { getChapter } from '../../../shared/api/chapter';
import Image from 'next/image';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';

const Chapter: NextPage<any> = ({ chapter, chapterId, comicSlug }) => {

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
            <Navigation chapters={chapter.chapters} chapterId={chapterId} comicSlug={comicSlug} />
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