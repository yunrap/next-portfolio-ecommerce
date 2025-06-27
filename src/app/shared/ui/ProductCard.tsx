import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { RoundedIcon } from './RoundedIcon';
import Image from 'next/image';
import { Button } from './Button';
import Link from 'next/link';
import { Product } from '../model/product.model';

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

  // 장바구니
  const onClickCart = (productId: string) => {
    const cart: { id: string; quantity: number }[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: productId,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // 위시리스트
  const onClickWishList = (productId: string) => {
    const wishlist: { id: string }[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]',
    );

    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
      alert('위시리스트에 이미 존재합니다.');
      return;
    } else {
      alert('위시리스트에 담겼습니다.');
      wishlist.push({
        id: productId,
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <Link href={`product/${product.id}`} className="block h-full w-full">
      <div className="flex flex-col gap-4">
        <div className="bg-secondary aspect group relative rounded p-3">
          <span className="bg-secondary-2 h-6 rounded-sm px-3 py-1 text-white">
            -{discount}%
          </span>
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {showWishlistButton && (
              <RoundedIcon
                aria-label="add to wishlist"
                className="h-6 w-6 hover:bg-red-400 lg:h-8 lg:w-8"
                color="white"
                onClick={e => {
                  e.preventDefault();
                  onClickWishList(product.id);
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
          <div>
            <Image
              src={imageUrl || '/image/prd1.png'}
              alt={`${name} product image`}
              width={200}
              height={200}
              className="mx-auto py-9"
            />
          </div>
          <div className="absolute right-0 bottom-0 left-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <Button
              variant="black"
              size="md"
              className="h-10 w-full"
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
            ${price}
          </span>
          <span className="line-through opacity-50" aria-label="origin price">
            ${originPrice}
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
  );
}
