import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useFetchComic from '@/hooks/useFetchComic';
import Loader from '@/components/Loading/Loader';
import useFetchChapters from '@/hooks/useFetchChapters';
import Info from '@/components/Info/Info';

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