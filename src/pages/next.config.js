/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allow importing files from src directory
  webpack: (config) => {
    config.resolve.modules.push("src");
    return config;
  },
};

module.exports = nextConfig;
