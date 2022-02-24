/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['st.nettruyengo.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config

    return config
  },
  optimization: {
    runtimeChunk: 'single'
  },
}

module.exports = nextConfig
