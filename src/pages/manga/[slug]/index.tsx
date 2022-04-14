import { NextPage } from 'next';
import Info from '@/components/Info';
import { useRouter } from 'next/router';
import useFetchComic from '@/hooks/useFetchComic';
import Loader from '@/components/Loader';

const Comic: NextPage = () => {
    const router = useRouter();
    const { slug, source } = router.query;
    const { data, isLoading } = useFetchComic(slug, source);

    return !isLoading ? (
        <Info
            slug={slug}
            info={data}
        />) : <div className='relative min-h-[calc(100vh-7rem)]'><Loader /></div>
};

export default Comic;