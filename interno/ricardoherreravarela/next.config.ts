import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las redirecciones deben ir dentro de esta función async
  async redirects() {
    return [
      {
        source: '/r/:path*',
        destination: 'https://qr.iorana.dev/slug/ricardoherreravarela.com/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;