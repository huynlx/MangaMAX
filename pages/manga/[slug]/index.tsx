import { NextPage } from 'next';

import { getComicInfo } from 'shared/api/comic';
import { ComicProps } from 'shared/types';
import { AppDispatch, wrapper } from 'store';
import { handleSource } from 'store/action';
import Info from 'components/Info';
import ToolNav from 'components/ToolNav';

const Comic: NextPage<ComicProps> = ({ info, slug }) => (
    <>
        <Info info={info} slug={slug} />
        <ToolNav />
    </>
);

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ params, query }) => {
        store.dispatch<AppDispatch>(handleSource(query.source, query.type, store));

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