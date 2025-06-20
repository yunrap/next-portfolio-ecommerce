'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '@/app/shared/ui/ProductCard';
import { mockProductList } from '@/app/shared/utils/mock';

export default function ProductSwiper() {
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
      {mockProductList.map(product => {
        return (
          <SwiperSlide>
            <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
