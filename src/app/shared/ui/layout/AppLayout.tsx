import Footer from '../footer';
import Header from '../Header';
import { PageContainer } from './PageContainer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white">
        <PageContainer>{children}</PageContainer>
      </main>
      <Footer />
    </div>
  );
}
