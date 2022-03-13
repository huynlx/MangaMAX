import { NextPage } from 'next';
import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const SearchComponent = dynamic(() => import('components/Search'), {
    loading: () => <Loader />,
});

const Search: NextPage = () => {

    return (
        <SearchComponent />
    );
};

export default memo(Search);