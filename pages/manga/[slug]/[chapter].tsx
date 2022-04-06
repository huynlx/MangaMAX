import { NextPage } from 'next';
import { getChapter } from 'shared/api/chapter';
import ChapterComponent from 'components/Chapter';
import { AppDispatch, wrapper } from 'store';
import { handleSource } from 'store/action';

const Chapter: NextPage<any> = ({ chapter, chapterId, comicSlug, info, scrollPosition }) => {
    console.log(scrollPosition);

    return (
        <ChapterComponent chapter={chapter} chapterId={chapterId} comicSlug={comicSlug} info={info} />
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ params, query }) => {
        store.dispatch<AppDispatch>(handleSource(query.source, query.type, store));

        try {
            const chapter = await getChapter(params?.slug, params?.chapter, query.id);

            return {
                props: {
                    chapter,
                    chapterId: query.id,
                    comicSlug: params?.slug,
                    info: {
                        title: chapter.title,
                        cover: query.cover,
                        source: query.source
                    }
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
