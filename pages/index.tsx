import type { NextPage } from 'next'
import getHome from '../shared/api/home'
import Grid from '../components/Grid'
import { wrapper } from '../store'
import { handleSource } from '../store/action';
import { useEffect, useState } from 'react';
import { WINDOW_RESIZE_DEBOUNCE, WINDOW_SIZE } from '../shared/constants';


const Home: NextPage<any> = ({ data, page }) => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    let timeout: any = null;
    const resize = () => {
      const { innerWidth } = window;
      if (
        innerWidth < WINDOW_SIZE.mobile &&
        windowSize !== WINDOW_SIZE.mobile
      ) {
        setWindowSize(WINDOW_SIZE.mobile);
      } else if (
        innerWidth >= WINDOW_SIZE.mobile &&
        innerWidth < WINDOW_SIZE.phablet &&
        windowSize !== WINDOW_SIZE.phablet
      ) {
        setWindowSize(WINDOW_SIZE.phablet);
      } else if (
        innerWidth >= WINDOW_SIZE.phablet &&
        innerWidth < WINDOW_SIZE.tablet &&
        windowSize !== WINDOW_SIZE.tablet
      ) {
        setWindowSize(WINDOW_SIZE.tablet);
      } else if (
        innerWidth >= WINDOW_SIZE.tablet &&
        innerWidth < WINDOW_SIZE.laptop &&
        windowSize !== WINDOW_SIZE.laptop
      ) {
        setWindowSize(WINDOW_SIZE.laptop);
      } else if (
        innerWidth >= WINDOW_SIZE.laptop &&
        innerWidth < WINDOW_SIZE.desktop &&
        windowSize !== WINDOW_SIZE.desktop
      ) {
        setWindowSize(WINDOW_SIZE.desktop);
      } else if (
        innerWidth >= WINDOW_SIZE.desktop &&
        windowSize !== WINDOW_SIZE.all
      ) {
        setWindowSize(WINDOW_SIZE.all);
      }
    };
    const onWidthResize = () => {
      clearTimeout(timeout); //tránh lặp value, gọi hàm quá nhiều lần
      timeout = setTimeout(() => {
        resize();
      }, WINDOW_RESIZE_DEBOUNCE);
    };
    onWidthResize();
    window.addEventListener('resize', onWidthResize);
    return () => {
      window.removeEventListener('resize', onWidthResize);
    };
  }, [windowSize])

  return (
    <Grid data={data} page={page} windowSize={windowSize} />
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