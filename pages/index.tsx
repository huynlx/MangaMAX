import type { NextPage } from 'next'
import getHome from '../shared/api/home'
import Grid from '../components/Grid'
import { wrapper } from '../store'
import axios from '../shared/axios';
import { handleSource } from '../store/action';


const Home: NextPage<any> = ({ data, page }) => {
  // console.log(data);

  return (
    <Grid data={data} page={page} />
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res, query }) => {
    store.dispatch<any>(handleSource(query.source, query.type, store));

    try {
      const data = await getHome(query.page ? +query.page! : 1);
      return {
        props: {
          data,
          page: +query.page!
        },
      };
    } catch (error) {
      // console.log(error);
      return {
        notFound: true,
      };
    }
  }
);

export default Home