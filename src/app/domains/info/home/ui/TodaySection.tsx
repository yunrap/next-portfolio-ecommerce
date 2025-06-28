'use client';
import { RoundedIcon } from '@/app/shared/ui/RoundedIcon';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductSwiper from './ProductSwiper';
import { LinkButton } from '@/app/shared/ui/LinkButton';
import { useRef } from 'react';
import { SwiperRef } from 'swiper/react';

export default function TodaySection() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const handlePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  return (
    <>
      <section aria-labelledby="flash-sales-heading" className="my-15 w-full">
        <header className="flex items-center gap-4">
          <div
            className="bg-secondary-2 h-10 w-5 rounded-sm"
            aria-hidden="true"
            role="presentation"
          ></div>
          <p
            className="text-secondary-2 text-base font-bold"
            id="flash-sales-subtitle"
          >
            {` Today's`}
          </p>
        </header>
        <div className="mr-10 flex items-center justify-between">
          <h2
            id="flash-sales-heading"
            className="mb-8 pt-6 text-2xl font-bold lg:text-4xl"
          >
            Flash Sales
          </h2>
          {/* 화살표 */}
          <div className="flex space-x-2">
            <RoundedIcon
              aria-label="preview"
              size="md"
              color="gray"
              onClick={handlePrev}
            >
              <ArrowLeftIcon className="h-6 w-6"></ArrowLeftIcon>
            </RoundedIcon>
            <RoundedIcon
              aria-label="next"
              size="md"
              color="gray"
              onClick={handleNext}
            >
              <ArrowRightIcon className="h-6 w-6"></ArrowRightIcon>
            </RoundedIcon>
          </div>
        </div>
        <ProductSwiper swiperRef={swiperRef} />
        <div className="mt-15 flex justify-center">
          <LinkButton
            href="/product"
            size="md"
            variant="primary"
            className="text-white"
          >
            View All Products
          </LinkButton>
        </div>
      </section>
    </>
  );
}
