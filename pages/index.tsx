import type { NextPage } from 'next'
import getHome from '../shared/api/home'
import Grid from '../components/Grid'
import { wrapper } from '../store'
import { handleSource } from '../store/action';
import { GridProps } from '../shared/types';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite'

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.


const Home: NextPage<GridProps> = ({ /* data, page */ }) => {
  
  return (
    <Grid />
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async ({ req, res, query }) => {
//     store.dispatch<any>(handleSource(query.source, query.type, store));

//     try {
//       const data = await getHome(query.page ? +query.page! : 1);

//       if (data.status >= 400) {
//         return {
//           props: {
//             statusCode: data.status
//           }
//         }
//       }
//       return {
//         props: {
//           data,
//           page: +query.page!,
//           statusCode: 200
//         },
//       };
//     } catch (error) {
//       console.log(error);
//       return {
//         notFound: true //404
//       };
//     }
//   }
// );

export default Home