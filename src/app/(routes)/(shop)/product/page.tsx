import ProductPage from '@/app/domains/shop/product/ProductPage';
import { Suspense } from 'react';

export default function Product() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-gray-300"></div>
        </div>
      }
    >
      <ProductPage />
    </Suspense>
  );
}
