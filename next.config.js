/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa')({
//   dest: 'public'
// });

// module.exports = withPWA({
//   reactStrictMode: true,
//   swcMinify: true,
//   env: {
//     HOST: process.env.HOST,
//     TOYYIBPAY_URL: process.env.TOYYIBPAY_URL
//   },
//   eslint: {
//     ignoreDuringBuilds: true
//   }
// });

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    HOST: process.env.HOST,
    TOYYIBPAY_URL: process.env.TOYYIBPAY_URL
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
