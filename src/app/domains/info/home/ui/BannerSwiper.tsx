'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function BannerSwiper() {
  const images = ['/image/banner.webp', '/image/banner.webp'];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      className="h-full w-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="h-full w-full">
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={`slide-${index}`}
              fill
              className="absolute object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
