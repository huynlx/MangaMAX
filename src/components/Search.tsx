import Grid from '@/components/Grid';
import { useRouter } from 'next/router';
import useFetchSearch from '@/hooks/useFetchSearch';
import TypeRender from './TypeRender';

const SearchComponent = () => {
    const router = useRouter();
    const { keyword } = router.query;

    return (
        <Grid
            keyword={keyword as string}
            fetch={useFetchSearch}
            typeRender={() => TypeRender('Search')}
        />
    );
};

export default SearchComponent;