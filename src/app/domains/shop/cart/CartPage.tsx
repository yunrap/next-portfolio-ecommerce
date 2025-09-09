'use client';

import { Button } from '@/app/shared/ui/Button';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../product/api/fetchProducts.client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function CartPage() {
  const t = useTranslations('CartPage');
  const locale = useLocale();
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const cartIds = useMemo(() => cart.map(item => item.id), [cart]);

  const { data: fetchData, refetch } = useQuery({
    queryKey: ['cart', cartIds],
    queryFn: () => fetchProducts({ ids: cartIds }),
    enabled: cartIds.length > 0,
  });

  useEffect(() => {
    if (cartIds.length > 0) {
      refetch();
    }
  }, [cartIds, refetch]);

  const productsWithQuantity = useMemo(() => {
    if (!cart || cart.length === 0) return [];
    if (!fetchData?.products) {
      return cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        name: '',
        price: 0,
        imageUrl: '',
      }));
    }
    const cartMap = Object.fromEntries(
      cart.map(item => [item.id, item.quantity]),
    );
    return fetchData.products.map(product => ({
      ...product,
      quantity: cartMap[product.id] ?? 0,
    }));
  }, [cart, fetchData]);

  const handleRemoveCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = productsWithQuantity.reduce(
    (acc, data) => acc + data.price * data.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    if (locale === 'ko') {
      return `₩${price.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('cart') || '[]') as {
      id: string;
      quantity: number;
    }[];
    setCart(carts);
  }, []);

  // 모바일일때 list, pc일때 table
  // 모바일일때 cart
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
        <nav className="mb-8 text-xl">
          <span className="opacity-50">{t('home')} /</span> {t('cart')}
        </nav>
        {productsWithQuantity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-4 text-2xl">🛒</span>
            <p className="mb-6 text-lg text-gray-500">
              {t('emptyCartTitle')}
              <br />
              {t('emptyCartSubtitle')}
            </p>
            <Link
              href="/product"
              className="rounded bg-black px-6 py-2 font-semibold text-white transition hover:bg-gray-800"
            >
              {t('goShopping')}
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-20 space-y-4 sm:hidden">
              {productsWithQuantity.map(product => (
                <div
                  key={product.id}
                  className="relative rounded-lg border bg-white p-4 shadow-sm"
                >
                  <button
                    onClick={() => handleRemoveCart(product.id)}
                    className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                    aria-label={`${product.name} ${t('removeItem')}`}
                  >
                    <Image
                      src="/icon/icon-cancel.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                  </button>
                  <div className="flex items-start gap-3 pr-12">
                    <Image
                      src={product.imageUrl || '/image/test.jpg'}
                      width={60}
                      height={60}
                      alt={`${product.name} image`}
                      className="rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-3 line-clamp-2 text-base font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>
                          <span className="mb-1 block font-medium text-gray-900">
                            {t('price')}
                          </span>
                          <span className="text-lg font-medium">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <div>
                          <span className="mb-1 block font-medium text-gray-900">
                            {t('quantity')}
                          </span>
                          <span className="text-lg font-medium">
                            {product.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 border-t border-gray-200 pt-3">
                        <span className="text-sm font-medium text-gray-900">
                          {t('subtotal')}:{' '}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price * product.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden w-full border-separate border-spacing-y-8 sm:table">
              <thead className="h-18 border-b text-gray-600 shadow-sm">
                <tr>
                  <th></th>
                  <th scope="col" className="px-4 py-2 text-left">
                    {t('product')}
                  </th>
                  <th scope="col" className="px-4 py-2 text-left">
                    {t('price')}
                  </th>
                  <th scope="col" className="px-4 py-2 text-left">
                    {t('quantity')}
                  </th>
                  <th scope="col" className="px-4 py-2 text-left">
                    {t('subtotal')}
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
                        src={product.imageUrl || '/image/test.jpg'}
                        width={40}
                        height={40}
                        alt={`${product.name} image`}
                      ></Image>
                    </td>
                    <td className="gap-4 px-4 py-2 font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-10 py-2">{product.quantity}</td>
                    <td className="px-6 py-2">
                      {formatPrice(product.price * product.quantity)}
                    </td>
                    <td onClick={() => handleRemoveCart(product.id)}>
                      <Image
                        src="/icon/icon-cancel.svg"
                        width={20}
                        height={20}
                        alt={`${product.name} ${t('removeItem')}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="ml-auto border-1 px-6 py-8 lg:w-[30vw]"
              aria-labelledby={t('cartTotal')}
            >
              <h1>{t('cartTotal')}</h1>
              <ul>
                <li className="flex justify-between border-b-1 border-gray-400 py-4">
                  <div>{t('subtotal')}</div>
                  <div>{formatPrice(totalPrice)}</div>
                </li>
                <li className="flex justify-between border-b-1 border-gray-400 py-4">
                  <div>{t('shipping')}</div>
                  <div>{t('free')}</div>
                </li>
                <li className="flex justify-between py-4">
                  <div>{t('total')}</div>
                  <div>{formatPrice(totalPrice)}</div>
                </li>
              </ul>
              <div className="mt-10 flex justify-center">
                <Button size="md" variant="primary">
                  {t('pay')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
