'use client';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '@/app/shared/ui/ProductCard';
import { RefObject, useEffect, useState } from 'react';
import { Product } from '@/app/shared/model/product.model';
import { fetchProducts } from '@/app/domains/shop/product/api/fetchProducts.client';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ProductSwiperProps {
  swiperRef: RefObject<SwiperRef | null>;
}

export default function ProductSwiper({ swiperRef }: ProductSwiperProps) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/app/mocks/browser').then(({ worker }) => {
        worker.start().then(() => {
          setMswReady(true);
        });
      });
    } else {
      setMswReady(true);
    }
  }, []);

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
      enabled: mswReady,
    });

  console.log(isLoading + 'durl?');
  const products: Product[] = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <>
      {!mswReady || isLoading ? (
        <div className="h-96 animate-pulse rounded-lg bg-gray-200 opacity-60 md:w-[100vw]" />
      ) : (
        <Swiper
          slidesPerView={1}
          ref={swiperRef}
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
          onSlideChange={swiper => {
            const isEnd = swiper.isEnd;
            if (isEnd && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          {products.map(product => {
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
