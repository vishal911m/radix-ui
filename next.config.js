/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/radix-ui",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
