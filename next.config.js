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
  }
}

module.exports = nextConfig
