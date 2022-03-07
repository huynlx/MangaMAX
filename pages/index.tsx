import type { NextPage } from 'next'
import getHome from '../shared/api/home'
import Grid from '../components/Grid'
import { wrapper } from '../store'
import { handleSource } from '../store/action';
import { GridProps } from '../shared/types';

const Home: NextPage<GridProps> = ({ data, page }) => {

  return (
    <Grid data={data} page={page} />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res, query }) => {
    store.dispatch<any>(handleSource(query.source, query.type, store));

    try {
      const data = await getHome(query.page ? +query.page! : 1);

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
          page: +query.page!,
          statusCode: 200
        },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true //404
      };
    }
  }
);

export default Home