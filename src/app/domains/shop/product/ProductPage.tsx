'use client';

import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useRef, useState } from 'react';
import { fetchProducts } from './api/fetchProducts.client';
import { createProduct } from './api/postProduct.client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/shared/ui/shadcn/dialog';
import { Button } from '@/app/shared/ui/shadcn/button';
import { Input } from '@/app/shared/ui/shadcn/Input';
import { getCategoriesWithTranslation } from '@/app/mocks/data/categories';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ImageUpload from './ui/ImageUpload';

const productFormSchema = z.object({
  name: z.string().min(1, '상품명을 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  description: z.string().min(1, '상품 설명을 입력해주세요'),
  price: z
    .string()
    .min(1, '판매가격을 입력해주세요')
    .pipe(z.coerce.number().min(0, '판매가격은 0 이상이어야 합니다')),
  originPrice: z
    .string()
    .min(1, '정가를 입력해주세요')
    .pipe(z.coerce.number().min(0, '정가는 0 이상이어야 합니다')),
  stock: z
    .string()
    .min(1, '재고수량을 입력해주세요')
    .pipe(z.coerce.number().min(0, '재고수량은 0 이상이어야 합니다')),
  mainImage: z.any().refine((file) => file instanceof File, {
    message: '대표이미지를 등록해주세요',
  }),
  subImages: z
    .array(z.instanceof(File))
    .max(4, '서브 이미지는 최대 4개까지 가능합니다')
    .optional(),
});

export default function ProductPage() {
  const t = useTranslations('ProductPage');
  const tBanner = useTranslations('BannerSection');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? undefined;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(productFormSchema),
  });

  const categories = getCategoriesWithTranslation(tBanner);

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


  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      // API DTO에 맞게 필드 추가
      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('originPrice', data.originPrice.toString());
      formData.append('stock', data.stock.toString());
      formData.append('discountRate', '10'); // 10% 할인율
      formData.append('reviewStar', '0'); // 초기값

      // 메인 이미지 추가
      if (data.mainImage) {
        formData.append('mainImage', data.mainImage);
      }

      // 서브 이미지들 추가
      if (data.subImages && data.subImages.length > 0) {
        data.subImages.forEach((file: File) => {
          formData.append('subImages', file);
        });
      }

      const result = await createProduct(formData);
      console.log('Product created:', result);

      // 성공 시 폼 리셋
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating product:', error);
      alert(error instanceof Error ? error.message : '상품 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-center justify-between">
          <nav className="text-xl">{t('productList')}</nav>
          <button
            className="flex items-center justify-center gap-2.5 rounded border border-solid border-black/50 px-12 py-4 font-medium text-black transition-colors hover:bg-gray-50"
            onClick={() => setIsDialogOpen(true)}
          >
            상품 등록하기
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div ref={loadMoreRef} className="h-10 bg-transparent" />
        </ul>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="large" showCloseButton={true}>
          <DialogHeader>
            <DialogTitle>상품 등록</DialogTitle>
            <DialogDescription>
              새로운 상품을 등록하세요. 모든 필수 정보를 입력해주세요.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="상품명"
                  placeholder="상품명을 입력하세요"
                  required
                  error={errors.name?.message}
                  {...register('name')}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">카테고리 *</label>
                  <select
                    className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-[50px] w-full rounded-md border bg-neutral-100 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...register('category')}
                  >
                    <option value="">카테고리를 선택하세요</option>
                    {categories.map(category => (
                      <option key={category.key} value={category.key}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="text-base leading-6 text-[#db4444]">
                      {errors.category.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">상품 설명 *</label>
                <textarea
                  className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full resize-none rounded-md border bg-neutral-100 px-3 py-2 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="상품 설명을 입력하세요"
                  {...register('description')}
                />
                {errors.description && (
                  <div className="text-base leading-6 text-[#db4444]">
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                  label="판매가격"
                  placeholder="판매가격을 입력하세요"
                  type="number"
                  required
                  error={errors.price?.message}
                  {...register('price')}
                />
                <Input
                  label="정가"
                  placeholder="정가를 입력하세요"
                  type="number"
                  required
                  error={errors.originPrice?.message}
                  {...register('originPrice')}
                />
                <Input
                  label="재고수량"
                  placeholder="재고수량을 입력하세요"
                  type="number"
                  min="0"
                  required
                  error={errors.stock?.message}
                  {...register('stock')}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name="mainImage"
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <ImageUpload
                      label="대표 이미지"
                      required
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="subImages"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <ImageUpload
                      label="서브 이미지"
                      multiple
                      maxFiles={4}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="black"
                onClick={() => setIsDialogOpen(false)}
              >
                취소
              </Button>
              <Button type="submit" variant="red">
                상품 등록
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
