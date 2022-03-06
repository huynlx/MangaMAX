import '../styles/globals.css'
import '../styles/sidebar.css'
import "tailwindcss/tailwind.css"
import React, { useEffect, useState } from 'react'
import "../styles/nprogress.css";
import Navbar from '../components/Navbar'
import Head from 'next/head';
import { wrapper } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { WINDOW_RESIZE_DEBOUNCE, WINDOW_SIZE } from '../shared/constants';
import { windowResize } from '../store/action';
import NProgress from "nprogress";
import Router from 'next/router';
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

const MyApp = ({ Component, pageProps, initialData }) => {
  const { windowSize } = useSelector((state) => state.reducer2);
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();

  //handle router loading
  useEffect(() => {
    NProgress.configure({
      showSpinner: true,
      trickleSpeed: 100, //ms
      minimum: 0.1,
      trickleRate: 0.05
    });

    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete', NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off('routeChangeStart', NProgress.start);
      Router.events.off('routeChangeComplete', NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    }
  }, [])

  //watch resize
  useEffect(() => {
    let timeout = null;
    const resize = () => {
      const { innerWidth } = window;
      if (
        innerWidth < WINDOW_SIZE.mobile &&
        windowSize !== WINDOW_SIZE.mobile
      ) {
        dispatch(windowResize(WINDOW_SIZE.mobile))
      } else if (
        innerWidth >= WINDOW_SIZE.mobile &&
        innerWidth < WINDOW_SIZE.phablet &&
        windowSize !== WINDOW_SIZE.phablet
      ) {
        dispatch(windowResize(WINDOW_SIZE.phablet))
      } else if (
        innerWidth >= WINDOW_SIZE.phablet &&
        innerWidth < WINDOW_SIZE.tablet &&
        windowSize !== WINDOW_SIZE.tablet
      ) {
        dispatch(windowResize(WINDOW_SIZE.tablet))
      } else if (
        innerWidth >= WINDOW_SIZE.tablet &&
        innerWidth < WINDOW_SIZE.laptop &&
        windowSize !== WINDOW_SIZE.laptop
      ) {
        dispatch(windowResize(WINDOW_SIZE.laptop))
      } else if (
        innerWidth >= WINDOW_SIZE.laptop &&
        innerWidth < WINDOW_SIZE.desktop &&
        windowSize !== WINDOW_SIZE.desktop
      ) {
        dispatch(windowResize(WINDOW_SIZE.desktop))
      } else if (
        innerWidth >= WINDOW_SIZE.desktop &&
        windowSize !== WINDOW_SIZE.all
      ) {
        dispatch(windowResize(WINDOW_SIZE.all))
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
  }, [windowSize]) //=> add windowSize để cập nhật giá trị của windowSize trong useEffect()

  //watch scroll
  useEffect(() => {
    const listenToScroll = () => {
      const scrolled = window.pageYOffset; //scroll position

      if (scrolled > 0) { //scroll => true
        if (!scroll) {
          console.log('set scroll true');
          setScroll(true);
        }
      } else { //scroll => false
        if (scroll) {
          console.log('set scroll false');
          setScroll(false);
        }
      }
    }

    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    }
  }, [scroll]) //=> add scroll để cập nhật giá trị của scroll trong useEffect()

  // let persistor = persistStore(wrapper);

  return (
    <>
      <Head>
        <title>MangaMAX</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      {/* <PersistGate loading={<p className='w-full text-center'>Loading Source</p>} persistor={persistor}> */}
      <Navbar scroll={scroll} />
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </>
  )
}

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   const footerData = { cc: 'cc' };
//   let pageProps = {};
//   console.log(ctx.query);
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   return { pageProps, footerData };
// };

MyApp.getInitialProps = async ({ store }) => {
  // console.log(store);
  const initialData = { data: 'test' }

  return { initialData }
};

export default wrapper.withRedux(MyApp);
