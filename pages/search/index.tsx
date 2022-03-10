import React from 'react';
import Grid from '../../components/Grid';
import { wrapper } from '../../store';
import { handleSource } from '../../store/action';

const search = ({ keyword }: any) => {

    return (
        <Grid keyword={keyword} />
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ query }) => {
        store.dispatch<any>(handleSource(query.source, query.type, store))
        return {
            props: {
                keyword: query.keyword as string,
                page: +query.page!
            },
        };
    }
)

export default search;