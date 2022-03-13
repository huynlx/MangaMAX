import React from 'react';
import Grid from 'components/Grid';
import { useRouter } from 'next/router';

const SearchComponent = () => {
    const router = useRouter();
    const { keyword } = router.query;

    return (
        <Grid keyword={keyword as string} />
    );
};

export default SearchComponent;