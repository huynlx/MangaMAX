import React from "react";
import NextHead from "next/head";
import { WEBSITE_URL } from "@/constants";
import { useRouter } from "next/router";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
}

const Head: React.FC<HeadProps> = (props) => {
  const {
    title = "Manga Max - Read free manga online",
    description = "Read free manga online.",
    image = "https://mangamax-huynh.cf/_next/image?url=/favicon.ico&w=300&q=100",
  } = props;

  const { asPath } = useRouter();

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png"></link>

      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={WEBSITE_URL + asPath} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={WEBSITE_URL + asPath} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Manga Max" />
      <meta name="apple-mobile-web-app-title" content="Manga Max" />
      <meta name="theme-color" content="#1A1A1A" />
      <meta name="msapplication-navbutton-color" content="#1A1A1A" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="msapplication-starturl" content="/" />
    </NextHead>
  );
};

export default Head;
