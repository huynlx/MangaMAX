import { NextPage } from 'next';
import React, { memo } from 'react';
import Grid from '../../components/Grid';
import { useRouter } from 'next/router';

const Search: NextPage = () => {
    const router = useRouter();
    const { keyword } = router.query;
    
    return (
        <Grid keyword={keyword as string} />
    );
};

export default memo(Search);