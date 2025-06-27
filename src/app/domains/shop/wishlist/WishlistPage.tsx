'use client';

import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../product/api/fetchProducts.client';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    async function loadCartItems() {
      const savedWish: { id: string }[] = JSON.parse(
        localStorage.getItem('wishlist') || '[]',
      );
      if (savedWish.length === 0) {
        setWishlist([]);
        return;
      }

      try {
        const data = await fetchProducts({
          ids: savedWish.map(item => item.id),
        });

        const sorted = savedWish
          .map(wish =>
            data.data.find((product: Product) => product.id === wish.id),
          )
          .filter(Boolean) as Product[];

        setWishlist(sorted);
      } catch (error) {
        console.error('장바구니 상품 로드 실패:', error);
        setWishlist([]);
      }
    }
    loadCartItems();
  }, []);

  if (!wishlist.length) {
    return <p className="mt-10 text-center">위리리스트가 비어 있습니다.</p>;
  }
  return (
    <div className="mt-4 mb-20 lg:mt-20">
      <h1 className="py-4 text-xl">Wishlist ({wishlist.length})</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map(list => (
          <ProductCard
            key={list.id}
            product={list}
            showWishlistButton={false}
          />
        ))}
      </ul>
    </div>
  );
}
