/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable webpack caching to prevent cache corruption issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
