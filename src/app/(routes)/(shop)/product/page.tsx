import ProductPage from '@/app/domains/shop/product/ProductPage';
import { Suspense } from 'react';

export default function Product() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ProductPage />
    </Suspense>
  );
}
