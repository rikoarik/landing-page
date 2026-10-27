/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.CLOSEPAY_BUILD_DIR || '.next',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
