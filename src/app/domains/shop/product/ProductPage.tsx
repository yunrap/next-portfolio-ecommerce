'use client';

import { fetchProducts } from '@/app/mocks/api/productApi';
import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClickWishList = (productId: number) => {
    const wishlist: { id: number }[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]',
    );
    // 만약 wishlist에 담긴게 없다면
    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
      alert('위시리스트에 이미 존재합니다.');
      return;
    } else {
      alert('위시리스트에 담겼습니다.');
      wishlist.push({
        id: productId,
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data.data);
      } catch (error) {
        console.error('상품 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="mx:4 lg:mx:32 mt-5 mb-8 lg:mt-20 lg:mb-30">
      <h1 className="py-4 text-xl">product list</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClickWishList={handleClickWishList}
          />
        ))}
      </ul>
    </div>
  );
}
