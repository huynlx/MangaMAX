import '../styles/globals.css'
import '../styles/sidebar.css'
import "tailwindcss/tailwind.css"
import React, { useEffect } from 'react'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import Navbar from '../components/Navbar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  // Router event handler
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.2,
      trickleRate: 0.2
    });
    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete',  NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off('routeChangeStart', NProgress.start);
      Router.events.off('routeChangeComplete', NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    }
  }, [])

  return (
    <>
      <Head>
        <title>Nát Truyện</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
