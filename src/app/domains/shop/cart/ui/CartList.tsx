'use client';
import { useCartItems } from '../model/cart.store';
import CartItem from './CartItem';

export default function CartList() {
  const items = useCartItems();

  return (
    <ul>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
