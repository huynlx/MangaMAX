import NProgress from "nprogress";
import Router from 'next/router';

export const callLoadingBar = () => {
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100, //ms
    minimum: 0.1,
    trickleRate: 0.05
  });

  Router.events.on('routeChangeStart', NProgress.start);
  Router.events.on('routeChangeComplete', NProgress.done);
  // Router.events.on("routeChangeError", NProgress.done);
}

export const removeLoadingBar = () => {
  Router.events.off('routeChangeStart', NProgress.start);
  Router.events.off('routeChangeComplete', NProgress.done);
  // Router.events.off("routeChangeError", NProgress.done);
}