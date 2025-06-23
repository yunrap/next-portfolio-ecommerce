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

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data.data);
      })
      .catch(error => {
        console.error('상품 로딩 실패:', error);
      })
      .finally(() => {});
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
            <ProductCard product={product} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
