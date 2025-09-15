'use client';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '@/app/domains/shop/product/ui/ProductCard';
import { fetchProducts } from '@/app/domains/shop/product/api/fetchProducts.client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RefObject } from 'react';
import { Product } from '@/app/domains/shop/product/model/product.model';

interface ProductSwiperProps {
  swiperRef: RefObject<SwiperRef | null>;
}

export default function ProductSwiper({ swiperRef }: ProductSwiperProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['products'],
      queryFn: ({ pageParam = 1 }) => fetchProducts({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        const { page, limit, total } = lastPage;

        const totalPages = Math.ceil(total / limit);

        return page < totalPages ? page + 1 : undefined;
      },
    });

  console.log(isLoading + 'durl?');
  const products: Product[] = data?.pages.flatMap(page => page.products) ?? [];

  return (
    <>
      {isLoading ? (
        <div className="h-96 animate-pulse rounded-lg bg-gray-100 opacity-60" />
      ) : (
        <Swiper
          slidesPerView={2}
          ref={swiperRef}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 3,
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
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1800: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="h-full w-full"
          onSlideChange={swiper => {
            const isEnd = swiper.isEnd;
            if (isEnd && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          {products.map(product => {
            if (!product || !product.id) return null;
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}
