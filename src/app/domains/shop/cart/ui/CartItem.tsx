import { CartItemType } from '../model/cart.model';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  return (
    <li>
      <p>{item.name}</p>
      <p>{item.quantity}개</p>
    </li>
  );
}
