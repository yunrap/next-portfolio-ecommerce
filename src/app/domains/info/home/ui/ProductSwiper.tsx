'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '@/app/shared/ui/ProductCard';
import { fetchProducts } from '@/app/mocks/api/productApi';
import { useEffect, useState } from 'react';
import { Product } from '@/app/shared/model/product.model';

export default function ProductSwiper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data.data);
      })
      .catch(error => {
        console.error('상품 로딩 실패:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return '로딩중';

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
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
