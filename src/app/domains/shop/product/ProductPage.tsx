'use client';

import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useRef } from 'react';
import { fetchProducts } from './api/fetchProducts.client';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function ProductPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['productsAll'],
      queryFn: ({ pageParam = 1 }) => fetchProducts({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        const { page, limit, total } = lastPage;

        const totalPages = Math.ceil(total / limit);

        return page < totalPages ? page + 1 : undefined;
      },
    });

  const products: Product[] = data?.pages.flatMap(page => page.data) ?? [];

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="mx:4 lg:mx:32 mt-5 mb-8 lg:mt-20 lg:mb-30">
      <h1 className="py-4 text-xl">product list</h1>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div ref={loadMoreRef} className="h-10 bg-transparent" />
      </ul>
    </div>
  );
}
