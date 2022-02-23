import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { getChapter } from '../../../shared/api/chapter';
import Image from 'next/image';
import Navigation from '../../../components/Navigation';

const Chapter: NextPage<any> = ({ chapter, chapterId, chapterSlug }) => {
    console.log(chapter);

    return (
        <div className='flex  flex-col max-w-[50vw] items-center mx-auto'>
            <Navigation chapters={chapter.chapters} chapterId={chapterId} />
            {
                chapter.images.map((image: string | undefined, index: any) => <img key={index} src={image} />)
            }
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
                chapterSlug: params?.slug
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