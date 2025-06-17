'use client';
import { useState } from 'react';
import type { CartItemType } from './cart.model';

// 임시: 추후 zustand 등 상태관리로 대체 가능
export function useCartItems(): CartItemType[] {
  const [items] = useState<CartItemType[]>([
    { id: '1', name: '운동화', quantity: 2 },
    { id: '2', name: '티셔츠', quantity: 1 },
  ]);
  return items;
}
