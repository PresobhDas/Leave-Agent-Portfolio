/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'export' if you want SSR. Keep it for pure static hosting.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
