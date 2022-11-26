import NProgress from "nprogress";
import Router from 'next/router';
import { pageview } from "src/libs/gtag";

NProgress.configure({
  showSpinner: true,
  trickleSpeed: 100, //ms
  minimum: 0.7,
  trickleRate: 0.05,
  speed: 220,
});

const handleRouteChangeError = (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`);
  }
};

const handleRouteChange = (url) => {
  pageview(url);
};

export const callLoadingBar = () => {
  Router.events.on('routeChangeStart', NProgress.start);
  Router.events.on('routeChangeComplete', NProgress.done);
  Router.events.on('routeChangeComplete', handleRouteChange);
  Router.events.on("routeChangeError", handleRouteChangeError);
};

export const removeLoadingBar = () => {
  Router.events.off('routeChangeStart', NProgress.start);
  Router.events.off('routeChangeComplete', NProgress.done);
  Router.events.off('routeChangeComplete', handleRouteChange);
  Router.events.off("routeChangeError", handleRouteChangeError);
};