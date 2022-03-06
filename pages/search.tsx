import React from 'react';
import Grid from '../components/Grid';
import getSearch from '../shared/api/search';
import { wrapper } from '../store';
import { handleSource } from '../store/action';

const search = ({ data, keyword, page }: any) => {

    return (
        <Grid data={data} keyword={keyword} page={page} />
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ query }) => {
        store.dispatch<any>(handleSource(query.source, query.type, store))

        try {
            const data = await getSearch(query.keyword as string, +query.page!);

            if (data.status >= 400) {
                return {
                    props: {
                        statusCode: data.status
                    }
                }
            }
            return {
                props: {
                    data,
                    keyword: query.keyword as string,
                    page: +query.page!
                },
            };
        } catch (error) {
            console.log('lỗi server search');
            return {
                notFound: true,
            };
        }
    }
)

export default search;