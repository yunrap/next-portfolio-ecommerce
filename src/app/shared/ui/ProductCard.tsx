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
    alert('Added to the cart.');
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // 위시리스트
  const onClickWishList = (productId: string) => {
    const wishlist: { id: string }[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]',
    );

    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
      alert('Already exists in the wishlist.');
      return;
    } else {
      alert('Added to the wishlist.');
      wishlist.push({
        id: productId,
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
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
  );
}
