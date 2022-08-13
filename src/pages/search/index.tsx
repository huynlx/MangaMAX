import { NextPage } from 'next';
import React, { memo, useEffect } from 'react';
import SearchComponent from '@/components/Search/Search';
import { handleSource } from '@/store/action';
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Head from '@/components/Shared/Head';

const Search: NextPage = () => {
    const { reducer: { source } } = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(handleSource(source, 'search'));
    }, [])

    return (
        <>
            <Head title='Search' />
            <SearchComponent />
        </>
    );
};

export default memo(Search);