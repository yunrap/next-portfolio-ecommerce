import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://picsum.photos/seed/**'),
      new URL('https://d2tjz755xvdxig.cloudfront.net/**'),
      ...(process.env.NEXT_PUBLIC_API_BASE_URL
        ? [
            new URL(
              `${process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api', '')}/**`,
            ),
          ]
        : []),
    ],
  },
};

export default withNextIntl(nextConfig);
