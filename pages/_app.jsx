import '../styles/globals.css'
import '../styles/sidebar.css'
import "tailwindcss/tailwind.css"
import React, { useEffect } from 'react'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import Navbar from '../components/Navbar'
import Head from 'next/head';
import { wrapper } from '../store';
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

const MyApp = ({ Component, pageProps }) => {

  // Router event handler
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.2,
      trickleRate: 0.2
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

  // let persistor = persistStore(wrapper);

  return (
    <>
      <Head>
        <title>MangaMAX</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      {/* <PersistGate loading={<p className='w-full text-center'>Loading Source</p>} persistor={persistor}> */}
      <Navbar />
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </>
  )
}

export default wrapper.withRedux(MyApp);
