import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from './shared/ui/Header';
import Footer from './shared/ui/footer';
import MSWInit from './mocks/msw-init';
import ClientProviders from './shared/context/ClientProviders';

const notoSans = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '인기 쇼핑몰 - 최신 트렌드 상품 한눈에',
  description:
    '인기 상품, 베스트셀러, 최신 트렌드 제품을 빠르게 만나보세요. 트렌디한 쇼핑 경험을 제공합니다.',
  keywords: ['쇼핑몰', '인기상품', '베스트셀러', '온라인 쇼핑', '트렌드 상품'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} antialiased`}>
        <ClientProviders>
          <MSWInit />
          <Header />
          <main className="mx-10 min-h-screen md:mx-15 lg:mx-30">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
