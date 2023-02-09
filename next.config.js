/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    HOST: process.env.HOST
  }
}

module.exports = nextConfig
