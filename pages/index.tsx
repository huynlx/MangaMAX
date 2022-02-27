import type { GetServerSideProps, NextPage } from 'next'
import getHome from '../shared/nettruyen/home'
import Grid from '../components/Grid'
import { useSelector } from 'react-redux'
import { wrapper } from '../store'
import { NextPageContext } from 'next';
import axios from '../shared/axios';
import Router from 'next/router'


const Home: NextPage<any> = ({ data, page }) => {
  const select = useSelector(state => state);
  // console.log(select);
  // console.log(Router);
  

  return (
    <Grid data={data} page={page} />
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   try {
//     const data = await getHome(+query.page!);
//     return {
//       props: {
//         data,
//         page: +query.page!
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// };

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res, query }) => {
    console.log('2. Page.getServerSideProps uses the store to dispatch things');
    switch (query.source) {
      case "nhattruyen":
        store.dispatch({ type: 'SOURCE', payload: { source: 'nhattruyen', name: 'NhatTruyen', url: 'http://nhattruyenvip.com/' } })
        axios.defaults.baseURL = store.getState().url
        break;
      case "nettruyen":
        store.dispatch({ type: 'SOURCE', payload: { source: 'nettruyen', name: 'NetTruyen', url: 'http://nettruyengo.com/' } })
        axios.defaults.baseURL = store.getState().url
        break;
    }

    try {
      const data = await getHome(+query.page!, query.source);
      return {
        props: {
          data,
          page: +query.page!
        },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true,
      };
    }
  }
);

export default Home