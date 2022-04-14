import { NextPage } from 'next';
import ChapterComponent from '@/components/Chapter';
import { useRouter } from 'next/router';
import useFetchChapter from '@/hooks/useFetchChapter';
import Loader from '@/components/Loader';

const Chapter: NextPage = () => {
    const router = useRouter();
    const { slug, chapter, id, source } = router.query;
    const { data, isLoading } = useFetchChapter(slug, source, chapter, id);

    return !isLoading ? (
        <ChapterComponent chapter={data} chapterId={id} comicSlug={slug} />
    ) : <div className='relative min-h-[calc(100vh-7rem)]'><Loader /></div>;
};

export default Chapter;
