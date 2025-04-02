// next.config.js 또는 next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true, // ✅ 이 안에 있어야 함!
    },
  };
  
  module.exports = nextConfig;