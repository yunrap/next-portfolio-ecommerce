'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function BannerSwiper() {
  const images = ['/image/banner1.png', '/image/banner2.png'];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      scrollbar={{
        hide: false,
      }}
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      className="h-full w-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="h-full w-full">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={src || '/image/test.jpg'}
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
