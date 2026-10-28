/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.CLOSEPAY_BUILD_DIR ? { distDir: process.env.CLOSEPAY_BUILD_DIR } : {}),
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
