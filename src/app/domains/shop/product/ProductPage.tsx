'use client';

import { Product } from '@/app/shared/model/product.model';
import ProductCard from '@/app/shared/ui/ProductCard';
import { useEffect, useRef, useState } from 'react';
import { fetchProducts } from './api/fetchProducts.client';
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

export default function ProductPage() {
  const t = useTranslations('ProductPage');
  const tBanner = useTranslations('BannerSection');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? undefined;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);

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

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxFiles = 4;
    const remainingSlots = maxFiles - subImages.length;
    const newFiles = files.slice(0, remainingSlots);
    
    if (newFiles.length === 0) return;
    
    const updatedFiles = [...subImages, ...newFiles];
    setSubImages(updatedFiles);
    
    // 새로 추가된 파일들의 미리보기만 생성
    const newPreviews: string[] = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === newFiles.length) {
          setSubImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // input 초기화
    event.target.value = '';
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
  };

  const removeSubImage = (index: number) => {
    const newSubImages = subImages.filter((_, i) => i !== index);
    const newPreviews = subImagePreviews.filter((_, i) => i !== index);
    setSubImages(newSubImages);
    setSubImagePreviews(newPreviews);
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
            className="flex items-center justify-center gap-2.5 rounded border border-black/50 border-solid px-12 py-4 font-medium text-black transition-colors hover:bg-gray-50"
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

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input 
                label="상품명"
                placeholder="상품명을 입력하세요"
                required
                error="상품명을 입력해주세요"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">카테고리 *</label>
                <select className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-[50px] w-full rounded-md border bg-neutral-100 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                  <option value="">카테고리를 선택하세요</option>
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="text-[#db4444] text-base leading-6">
                  카테고리를 선택해주세요
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">상품 설명 *</label>
              <textarea 
                className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border bg-neutral-100 px-3 py-2 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                placeholder="상품 설명을 입력하세요"
              />
              <div className="text-[#db4444] text-base leading-6">
                상품 설명을 입력해주세요
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input 
                label="판매가격"
                placeholder="판매가격을 입력하세요"
                type="number"
                required
                error="판매가격을 입력해주세요"
              />
              <Input 
                label="정가"
                placeholder="정가를 입력하세요"
                type="number"
                required
                error="정가를 입력해주세요"
              />
              <Input 
                label="재고수량"
                placeholder="재고수량을 입력하세요"
                type="number"
                min="0"
                required
                error="재고수량을 입력해주세요"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">대표 이미지 *</label>
                {mainImagePreview ? (
                  <div className="relative">
                    <img 
                      src={mainImagePreview} 
                      alt="대표 이미지 미리보기" 
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors bg-neutral-100 h-[128px] flex items-center justify-center">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      id="main-image"
                      onChange={handleMainImageChange}
                    />
                    <label htmlFor="main-image" className="cursor-pointer">
                      <p className="text-gray-500">대표 이미지를 업로드하세요</p>
                      <p className="text-sm text-gray-400 mt-1">클릭하여 선택</p>
                    </label>
                  </div>
                )}
                {!mainImage && (
                  <div className="text-[#db4444] text-base leading-6">
                    대표이미지를 등록해주세요
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">서브 이미지</label>
                {subImagePreviews.length > 0 ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {subImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={preview} 
                            alt={`서브 이미지 ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => removeSubImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    {subImages.length < 4 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors bg-neutral-100 h-[96px] flex items-center justify-center">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          multiple
                          id="sub-images-add"
                          onChange={handleSubImagesChange}
                        />
                        <label htmlFor="sub-images-add" className="cursor-pointer">
                          <p className="text-gray-500">추가 이미지 업로드</p>
                          <p className="text-sm text-gray-400 mt-1">남은 개수: {4 - subImages.length}개</p>
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors bg-neutral-100 h-[96px] flex items-center justify-center">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      multiple
                      id="sub-images"
                      onChange={handleSubImagesChange}
                    />
                    <label htmlFor="sub-images" className="cursor-pointer">
                      <p className="text-gray-500">서브 이미지를 업로드하세요</p>
                      <p className="text-sm text-gray-400 mt-1">최대 4개까지 선택 가능</p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="black" 
              onClick={() => setIsDialogOpen(false)}
            >
              취소
            </Button>
            <Button variant="red">
              상품 등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
