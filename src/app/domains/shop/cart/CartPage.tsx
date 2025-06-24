'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/app/mocks/api/productApi';
import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCartItems() {
      const savedCart: CartItem[] = JSON.parse(
        localStorage.getItem('cart') || '[]',
      );
      if (savedCart.length === 0) {
        setCartItems([]);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchProducts({
          ids: savedCart.map(item => item.id),
        });
        const merged = data.data.map((product: Product) => {
          const cartItem = savedCart.find(item => item.id === product.id);
          return { ...product, quantity: cartItem?.quantity ?? 1 };
        });

        setCartItems(merged);
      } catch (error) {
        console.error('장바구니 상품 로드 실패:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }
    loadCartItems();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <h1>장바구니</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {cartItems.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ul>
    </>
  );
}
