import type { NextConfig } from "next";
// https://ecommerce.routemisr.com/Route-Academy-products/1680402296306-3.jpeg
const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-categories/**',
      },
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-products/**',
      },
    ],
  },
};

export default nextConfig;
