import { NextPage } from 'next';
import React, { memo, useEffect } from 'react';
import SearchComponent from 'components/Search';
import { handleSource } from 'store/action';
import { useDispatch, useSelector } from 'react-redux';

const Search: NextPage = () => {
    const { reducer: { source } } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleSource(source, 'search'));
    }, [])

    return (
        <SearchComponent />
    );
};

export default memo(Search);