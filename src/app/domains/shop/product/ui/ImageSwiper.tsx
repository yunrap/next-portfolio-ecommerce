'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function ImageSwiper({
  subImageUrls,
}: {
  subImageUrls: string[];
}) {
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
      {subImageUrls.map((subImageUrl: string, index: number) => (
        <SwiperSlide key={index}>
          <div className="relative h-full w-full">
            <Image
              src={subImageUrl}
              alt={`slide-${index}`}
              fill
              className="absolute object-cover"
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
