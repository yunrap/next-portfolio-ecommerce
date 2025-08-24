'use client';

import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useRef } from 'react';
import { fetchProducts } from './api/fetchProducts.client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function ProductPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['productsAll', category],
      queryFn: ({ pageParam = 1 }) =>
        fetchProducts({ page: pageParam, category }),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        const { page, limit, total } = lastPage;
        const totalPages = Math.ceil(total / limit);
        return page < totalPages ? page + 1 : undefined;
      },
    });

  const products: Product[] = data?.pages.flatMap(page => page.products) ?? [];

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
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      <nav className="mb-8 text-xl">product list</nav>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div ref={loadMoreRef} className="h-10 bg-transparent" />
      </ul>
    </div>
  );
}
