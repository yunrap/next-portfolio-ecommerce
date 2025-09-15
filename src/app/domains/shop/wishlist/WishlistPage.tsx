'use client';

import ProductCard from '@/app/domains/shop/product/ui/ProductCard';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../product/api/fetchProducts.client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Product } from '../product/model/product.model';

export default function WishlistPage() {
  const t = useTranslations('WishlistPage');
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
        console.error(t('loadError'), error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }
    loadCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      <nav className="mb-8 text-xl">
        <span>
          {t('wishlist')} {loading ? `` : `(${wishlist.length})`}
        </span>
      </nav>
      {loading ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-gray-300"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="mb-4 text-2xl">🛒</span>
          <p className="mb-6 text-lg text-gray-500">
            {t('emptyWishlistTitle')}
            <br />
            {t('emptyWishlistSubtitle')}
          </p>
          <Link
            href="/product"
            className="rounded bg-black px-6 py-2 font-semibold text-white transition hover:bg-gray-800"
          >
            {t('goShopping')}
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
