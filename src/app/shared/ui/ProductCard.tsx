'use client';

import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { RoundedIcon } from './RoundedIcon';
import Image from 'next/image';
import { Button } from './Button';
import Link from 'next/link';
import { Product } from '../model/product.model';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './shadcn/alert-dialog';
import { useEffect, useState } from 'react';

export default function ProductCard({
  product,
  showWishlistButton = true,
}: {
  product: Product;
  showWishlistButton?: boolean;
}) {
  const { id, discount, name, price, originPrice, reviewStar, imageUrl } =
    product;
  const star = new Array(5).fill(0);
  const [open, setOpen] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [alertType, setAlertType] = useState<'wishlist' | 'cart' | null>(null);

  useEffect(() => {
    const wishlist: { id: string }[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]',
    );
    setIsWished(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  useEffect(() => {
    const cart: { id: string; quantity: number }[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    setIsInCart(cart.some(item => item.id === product.id));
  }, [product.id]);

  const onClickWishList = (productId: string) => {
    const wishlist: { id: string }[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]',
    );
    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
      wishlist.splice(index, 1);
      setIsWished(false);
    } else {
      wishlist.push({ id: productId });
      setIsWished(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setAlertType('wishlist');
    setOpen(true);
  };

  const onClickCart = (productId: string) => {
    const cart: { id: string; quantity: number }[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    const index = cart.findIndex(item => item.id === productId);
    if (index === -1) {
      cart.push({ id: productId, quantity: 1 });
      setIsInCart(true);
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAlertType('cart');
    setOpen(true);
  };

  function getAlertMessage() {
    if (alertType === 'wishlist') {
      return isWished
        ? '찜 리스트에 추가되었습니다.'
        : '찜 리스트에서 삭제되었습니다.';
    }
    if (alertType === 'cart') {
      return '장바구니에 추가되었습니다.';
    }
    return '';
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getAlertMessage()}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white">확인</AlertDialogCancel>
            {alertType === 'wishlist' && isWished && (
              <AlertDialogAction className="bg-black hover:bg-black/80">
                <Link href={`wishlist`}>바로가기</Link>
              </AlertDialogAction>
            )}
            {alertType === 'cart' && isInCart && (
              <AlertDialogAction className="bg-black hover:bg-black/80">
                <Link href={`cart`}>바로가기</Link>
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link href={`product/${product.id}`} className="block h-full w-full">
        <div className="flex flex-col gap-4">
          <div className="group bg-secondary relative aspect-square h-auto overflow-hidden rounded">
            <Image
              src={imageUrl || '/image/test.jpg'}
              alt={`${name} product image`}
              fill
              style={{ objectFit: 'cover' }}
              className="absolute inset-0 z-0"
              sizes="100vw"
              priority
            />
            <span className="bg-secondary-2 z-10 mt-3 ml-3 inline-block h-6 rounded-sm px-3 text-center text-white">
              -{discount}%
            </span>
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
              {showWishlistButton && (
                <RoundedIcon
                  aria-label="add to wishlist"
                  className={`h-6 w-6 bg-red-400 lg:h-8 lg:w-8 ${isWished && 'bg-red-400'} hover:bg-red-400`}
                  color={isWished ? 'red' : 'white'}
                  onClick={e => {
                    e.preventDefault();
                    onClickWishList(product.id);
                    setOpen(true);
                  }}
                >
                  <HeartIcon className="h-5 w-5 text-black" />
                </RoundedIcon>
              )}
              <RoundedIcon
                aria-label="preview product"
                className="h-6 w-6 lg:h-8 lg:w-8"
                color="white"
              >
                <EyeIcon className="h-5 w-5 text-black" />
              </RoundedIcon>
            </div>
            <div className="absolute right-0 bottom-0 left-0 z-10 transition duration-300 group-hover:opacity-100 md:opacity-0">
              <Button
                variant="black"
                size="md"
                className="h-8 w-full lg:h-10"
                onClick={e => {
                  e.preventDefault();
                  onClickCart(id);
                }}
                aria-label={`${name} add to cart`}
              >
                Add To Cart
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-base font-medium text-black lg:line-clamp-2 lg:text-sm">
              {name}
            </h3>
            <span
              className="text-secondary-2 pr-3 font-medium"
              aria-label="sales price"
            >
              ${price.toLocaleString()}
            </span>
            <span className="line-through opacity-50" aria-label="origin price">
              ${originPrice.toLocaleString()}
            </span>
            <div className="flex gap-1 py-2">
              <span className="sr-only">review star {reviewStar}점</span>
              {star.map((_, i) => (
                <Image
                  key={i}
                  src={
                    i < reviewStar ? '/image/star.svg' : '/image/star-gray.svg'
                  }
                  alt={i < reviewStar ? '노란색 별' : '회색 별'}
                  width={20}
                  height={20}
                  className=""
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
