'use client';

import { Button } from '@/app/shared/ui/Button';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../product/api/fetchProducts.client';
import Image from 'next/image';

export default function CartPage() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const cartIds = useMemo(() => cart.map(item => item.id), [cart]);

  const { data: fetchData } = useQuery({
    queryKey: ['cart', cartIds],
    queryFn: () => fetchProducts({ ids: cartIds }),
    enabled: cartIds.length > 0,
  });

  const productsWithQuantity = useMemo(() => {
    if (!cart || !fetchData?.data) return [];

    const cartMap = Object.fromEntries(
      cart.map(item => [item.id, item.quantity]),
    );

    return fetchData.data.map(product => ({
      ...product,
      quantity: cartMap[product.id] ?? 0,
    }));
  }, [cart, fetchData]);

  const handleRemoveCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('cart') || '[]') as {
      id: string;
      quantity: number;
    }[];
    setCart(carts);
  }, []);

  if (!productsWithQuantity.length) {
    return <p className="mt-10 text-center">장바구니가 비어 있습니다.</p>;
  }

  const totalPrice = productsWithQuantity?.reduce(
    (acc, data) => acc + data.price * data.quantity,
    0,
  );

  // 모바일일때 list, pc일때 table
  // 모바일일때 cart
  return (
    <>
      <div className="mt-4 mb-20 lg:mt-20">
        <h1 className="py-4 text-xl">
          <span className="opacity-50">HOME /</span> Cart
        </h1>
        <ul className="mb-20 sm:hidden">
          <li className="flex h-18 items-center justify-between border-b px-4 py-2 font-semibold shadow-sm">
            <div className="flex-1">Product</div>
            <div className="flex-1 text-center">Price</div>
            <div className="flex-1 text-center">Quantity</div>
            <div className="flex-1 text-center">Subtotal</div>
          </li>

          {productsWithQuantity.map(product => (
            <li
              key={product.id}
              className="flex h-18 items-center justify-between border-b px-4 py-2 shadow-sm"
            >
              <span className="flex flex-1 flex-col items-center gap-2 font-medium">
                <Image
                  src={product.imageUrl}
                  width={40}
                  height={40}
                  alt={`${product.name} image`}
                />
                {product.name}
              </span>
              <span className="flex-1 text-center text-gray-600">
                {product.price}
              </span>
              <span className="flex-1 text-center">{product.quantity}</span>
              <span className="flex-1 flex-col items-center gap-2 text-center">
                {product.price * product.quantity}
                <Image
                  src="/icon/icon-cancel.svg"
                  width={20}
                  height={20}
                  alt={`${product.name} 삭제하기`}
                  onClick={() => handleRemoveCart(product.id)}
                  className="inline-block"
                />
              </span>
            </li>
          ))}
        </ul>
        <table className="hidden w-full border-separate border-spacing-y-8 sm:table">
          <thead className="h-18 border-b text-gray-600 shadow-sm">
            <tr>
              <th></th>
              <th scope="col" className="px-4 py-2 text-left">
                Product
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Price
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Quantity
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Subtotal
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsWithQuantity.map(product => (
              <tr
                key={product.id}
                className="h-25 border-b text-gray-600 shadow-sm hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <Image
                    src={product.imageUrl}
                    width={40}
                    height={40}
                    alt={`${product.name} image`}
                  ></Image>
                </td>
                <td className="gap-4 px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2 text-gray-600">{product.price}</td>
                <td className="px-10 py-2">{product.quantity}</td>
                <td className="px-6 py-2">
                  {product.price * product.quantity}
                </td>
                <td onClick={() => handleRemoveCart(product.id)}>
                  <Image
                    src="/icon/icon-cancel.svg"
                    width={20}
                    height={20}
                    alt={`${product.name} 삭제하기`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="ml-auto border-1 px-6 py-8 lg:w-[30vw]"
          aria-labelledby="장바구니 합계"
        >
          <h1>Cart Total</h1>
          <ul>
            <li className="flex justify-between border-b-1 border-gray-400 py-4">
              <div>subtotal</div>
              <div>${totalPrice}</div>
            </li>
            <li className="flex justify-between border-b-1 border-gray-400 py-4">
              <div>Shipping</div>
              <div>Free</div>
            </li>
            <li className="flex justify-between py-4">
              <div>Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
          <div className="mt-10 flex justify-center">
            <Button size="md" variant="primary">
              pay
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
