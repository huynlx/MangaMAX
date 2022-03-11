import { NextPage } from 'next';
import React from 'react';
import { getComicInfo } from 'shared/api/comic';
import { ComicProps } from 'shared/types';
import { wrapper } from 'store';
import { handleSource } from 'store/action';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const Info = dynamic(() => import('components/Info'), {
    loading: () => <Loader />,
});

const Comic: NextPage<ComicProps> = ({ info, slug }) => (
    <Info info={info} slug={slug} />
);

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ params, query }) => {
        store.dispatch<any>(handleSource(query.source, query.type, store));

        try {
            const data = await getComicInfo(params?.slug as string);

            if (data.status >= 400) {
                return {
                    props: {
                        statusCode: data.status
                    }
                }
            }
            return {
                props: {
                    slug: params?.slug,
                    info: data
                }
            };
        } catch (error) {
            console.log(error);
            return {
                notFound: true
            };
        }
    }
);

export default Comic;