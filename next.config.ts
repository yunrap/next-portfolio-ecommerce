import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://picsum.photos/seed/**'),
      new URL('https://d2tjz755xvdxig.cloudfront.net/**'),
      new URL('http://localhost:8080/**'),
    ],
  },
};

export default withNextIntl(nextConfig);
