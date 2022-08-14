const withPWA = require("next-pwa");
const defaultRuntimeCaching = require("./cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'st.nettruyenmoi.com',
      'st.nhattruyengo.com',
      'cmanganew.com',
      'hentaicb.top',
      'lxhentai.com',
      'i7.xem-truyen.com',
      'mangapk.com',
      'truyentranhlh.net'
    ],
    deviceSizes: [230, 300, 480, 720, 1280, 1920, 3840]
  },
  pwa: {
    dest: "public",
    buildExcludes: [
      /middleware-manifest\.json$/,
      /_middleware\.js$/,
      /_middleware\.js\.map$/,
      /middleware-runtime\.js$/,
      /middleware-runtime\.js\.map$/,
    ],
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: defaultRuntimeCaching,
  },
};

module.exports = process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);
