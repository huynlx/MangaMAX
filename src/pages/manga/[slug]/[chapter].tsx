import { NextPage } from 'next';
import ChapterComponent from '@/components/Chapter/Chapter';
import { useRouter } from 'next/router';
import useFetchChapter from '@/hooks/useFetchChapter';
import Loader from '@/components/Loading/Loader';
import Page404 from '@/pages/404';
import useFetchChapters from '@/hooks/useFetchChapters';
import { useEffect } from 'react';

const Chapter: NextPage = () => {
    const router = useRouter();
    const { slug, chapter, id, source } = router.query;
    const { data, isLoading } = useFetchChapter(slug, source, chapter, id);
    const { data: chapters, isLoading: loadingChapters } = useFetchChapters(slug, source);
    const selectedIndex = chapters?.chapters?.indexOf(chapters?.chapters.find((chap: { id: string; }) => chap.id === id));

    if (selectedIndex === -1) {
        return <Page404 />;
    }

    return (
        <div className='inset-0 absolute bg-primary z-50'>
            {
                // !loadingChapters ? (
                <ChapterComponent
                    loadChapter={isLoading}
                    loadChapters={loadingChapters}
                    chapter={{ ...data, ...chapters }}
                    chapterId={id}
                    comicSlug={slug}
                    selectedIndex={selectedIndex}
                />
                // ) : <div className='relative min-h-[calc(100vh-7rem)]'><Loader /></div>
            }
        </div>
    );
};

export default Chapter;
