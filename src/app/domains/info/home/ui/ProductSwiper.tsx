'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/app/mocks/api/productApi';
import { Product } from '@/app/shared/model/product.model';

export default function ProductSwiper() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleClickCart = () => {
    // const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    // const index = cart.findIndex(item => item.id === productId);
    // if (index > -1) {
    //   cart[index].quantity += 1;
    // } else {
    //   cart.push({
    //     id: productId,
    //     quantity: 1,
    //   });
    // }
    // localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleClickWishList = (productId: string) => {
    const wishlist: { id: string }[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]',
    );
    // 만약 wishlist에 담긴게 없다면
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

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/app/mocks/browser').then(({ worker }) => {
        worker.start().then(() => {
          fetchProducts()
            .then(data => {
              setProducts(data.data);
            })
            .catch(error => {
              console.error('상품 로딩 실패:', error);
            })
            .finally(() => {});
        });
      });
    }
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      style={{ width: '100vw' }}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1304: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
        1800: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      }}
      modules={[Navigation, Pagination, Autoplay]}
      className="h-full w-full"
    >
      {products.map(product => {
        return (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              onClickCart={handleClickCart}
              onClickWishList={handleClickWishList}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
