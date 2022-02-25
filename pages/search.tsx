import { GetServerSideProps } from 'next';
import React from 'react';
import Grid from '../components/Grid';
import getSearch from '../shared/api/search';

const search = ({ data, keyword, page }: any) => {
    return (
        <Grid data={data} keyword={keyword} page={page} />
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const data = await getSearch(query.keyword as string, +query.page!);
        return {
            props: {
                data,
                keyword: query.keyword as string,
                page: +query.page!
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
};


export default search;