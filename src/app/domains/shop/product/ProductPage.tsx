'use client';

import { fetchProducts } from '@/app/mocks/api/productApi';
import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data.data);
      })
      .catch(error => {
        console.error('상품 로딩 실패:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return '로딩중';

  return (
    <div className="mx:4 lg:mx:32 mt-5 mb-8 lg:mt-20 lg:mb-30">
      <h1 className="py-4 text-xl">product list</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
