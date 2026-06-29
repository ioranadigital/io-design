/** @type {import('next').NextConfig} */
const WP_HOST = process.env.WP_HOST ?? "http://89.167.103.147";

const nextConfig = {
  async rewrites() {
    return [
      // Todo /blog/* se proxifica al VPS donde corre WordPress
      {
        source: "/blog",
        destination: `${WP_HOST}/blog`,
      },
      {
        source: "/blog/:path*",
        destination: `${WP_HOST}/blog/:path*`,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/r/:path*",
        destination: "https://qr.iorana.dev/slug/iorana.digital/:path*",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
