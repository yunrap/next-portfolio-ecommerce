'use client';

import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../product/api/fetchProducts.client';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCartItems() {
      const savedWish: { id: string }[] = JSON.parse(
        localStorage.getItem('wishlist') || '[]',
      );
      if (savedWish.length === 0) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProducts({
          ids: savedWish.map(item => item.id),
        });

        const sorted = savedWish
          .map(wish =>
            data.products.find((product: Product) => product.id === wish.id),
          )
          .filter(Boolean) as Product[];

        setWishlist(sorted);
      } catch (error) {
        console.error('장바구니 상품 로드 실패:', error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }
    loadCartItems();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      <nav className="mb-8 text-xl">
        <span>Wishlist {loading ? `` : `(${wishlist.length})`}</span>
      </nav>
      {loading ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-gray-300"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="mb-4 text-2xl">🛒</span>
          <p className="mb-6 text-lg text-gray-500">
            위시리스트가 비어있어요.
            <br />
            상품을 보러 가볼까요?
          </p>
          <Link
            href="/product"
            className="rounded bg-black px-6 py-2 font-semibold text-white transition hover:bg-gray-800"
          >
            상품 보러가기
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map(list => (
            <ProductCard
              key={list.id}
              product={list}
              showWishlistButton={false}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
