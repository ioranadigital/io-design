import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'via.placeholder.com' },
      { hostname: 'api.dicebear.com' },
    ],
  },
};

export default nextConfig;
