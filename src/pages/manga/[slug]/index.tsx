import { NextPage } from 'next';
import Info from '@/components/info/Info';
import { useRouter } from 'next/router';
import useFetchComic from '@/hooks/useFetchComic';
import Loader from '@/components/Loader';
import useFetchChapters from '@/hooks/useFetchChapters';

const Comic: NextPage = () => {
    const router = useRouter();
    const { slug, source } = router.query;
    const { data: info, isLoading: isLoadingInfo } = useFetchComic(slug, source);
    const { data: chapters } = useFetchChapters(slug, source);

    return !isLoadingInfo ?
        <Info
            slug={slug}
            info={info}
            chapters={chapters?.chapters}
        />
        :
        <div className='relative min-h-[calc(100vh-7rem)]'><Loader /></div>
};

export default Comic;