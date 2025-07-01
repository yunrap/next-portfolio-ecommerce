import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://picsum.photos/seed/**'),
      {
        protocol: 'https',
        hostname: 'd2tjz755xvdxig.cloudfront.net',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
