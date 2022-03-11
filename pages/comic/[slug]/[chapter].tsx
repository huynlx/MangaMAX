import { NextPage } from 'next';
import React from 'react';
import { getChapter } from 'shared/api/chapter';
import dynamic from 'next/dynamic';
const ChapterComponent = dynamic(() => import('components/Chapter'), {
    loading: () => <Loader />,
});
import { wrapper } from 'store';
import { handleSource } from 'store/action';
import Loader from 'components/Loader';

const Chapter: NextPage<any> = ({ chapter, chapterId, comicSlug }) => (
    <ChapterComponent chapter={chapter} chapterId={chapterId} comicSlug={comicSlug} />
);

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ params, query }) => {
        store.dispatch<any>(handleSource(query.source, query.type, store));

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
);

export default Chapter;
