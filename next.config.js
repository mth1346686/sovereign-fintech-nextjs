/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/sovereign-fintech-nextjs' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};
module.exports = nextConfig;
