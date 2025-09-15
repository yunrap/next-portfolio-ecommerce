'use client';
import { Label } from '@/app/shared/ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/app/shared/ui/shadcn/radio-group';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Product,
  ProductOption,
  ProductOptionValue,
} from '../model/product.model';
import CountInput from '../ui/CountInput';
import { Button } from '@/app/shared/ui/Button';
import ImageSwiper from '../ui/ImageSwiper';
import { useParams } from 'next/navigation';
import { fetchDetailProducts } from '../api/fetchProductById';

export default function ProductDtPage() {
  const star = new Array(5).fill(0);
  const [mainIdx, setMainIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const productId = params?.id as string;

  function getOptionByName(
    options: ProductOption[] = [],
    targetName: string,
  ): ProductOption {
    return (
      options.find(
        option => option.name.toLowerCase() === targetName.toLowerCase(),
      ) ?? {
        name: targetName,
        values: [],
      }
    );
  }

  const handleChange = (color: string) => {
    console.log(color);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!productId) return;

    fetchDetailProducts(productId)
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('상품 로딩 실패:', error);
        setProduct(null);
      });
  }, [productId]);

  if (!product) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-gray-300"></div>
      </div>
    );
  }

  const colorOption = getOptionByName(product.options, 'color') || {
    name: 'Color',
    values: [],
  };
  const sizeOption = getOptionByName(product.options, 'size') || {
    name: 'Size',
    values: [],
  };

  return (
    <div className="mx:4 lg:mx:32 mt-5 mb-8 flex flex-col justify-center lg:mt-20 lg:mb-30">
      <article className="flex flex-col justify-center gap-10 lg:flex-row">
        {/* 모바일 상품이미지 갤러리 */}
        <div className="flex h-100 w-full items-center justify-center md:hidden">
          <ImageSwiper subImageUrls={product.subImageUrls} />
        </div>
        {/* 상품이미지 갤러리 */}
        <section
          aria-labelledby="product-gallery"
          className="felx hidden justify-center md:flex"
        >
          <nav aria-label="제품 썸네일" className="mr-6 flex h-full flex-col">
            <ul className="flex h-[600px] w-[138px] flex-col justify-center space-y-4">
              {product.subImageUrls.map((img, idx) => (
                <li
                  key={idx}
                  className="relative h-full w-full"
                  onMouseEnter={() => setMainIdx(idx)}
                >
                  <button
                    onClick={() => setMainIdx(idx)}
                    className={`border ${mainIdx === idx ? 'border-red-500' : 'border-transparent'} rounded`}
                    aria-label={`${img} 보기`}
                    tabIndex={0}
                  >
                    <Image
                      src={
                        process.env.NODE_ENV === 'development'
                          ? '/image/test.jpg'
                          : img || '/image/test.jpg'
                      }
                      alt={img + '상품사진 '}
                      fill={true}
                      className="absolute rounded"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* 메인 이미지 */}
          <figure className="relative flex h-[600px] w-[500px] items-center justify-center rounded bg-gray-50">
            <Image
              src={
                process.env.NODE_ENV === 'development'
                  ? '/image/test.jpg'
                  : product.subImageUrls[mainIdx] || '/image/test.jpg'
              }
              alt={product.imageUrl}
              fill={true}
              className="absolute object-cover"
              priority
            />
            <figcaption className="sr-only">{product.name}</figcaption>
          </figure>
        </section>
        {/* 상품상세 */}
        <div className="mt-4 flex flex-col">
          <section aria-labelledby="product-description">
            <header className="space-y-3">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="flex">
                <span className="sr-only">
                  review star {product.reviewStar}점
                </span>
                {star.map((_, i) => (
                  <Image
                    key={i}
                    src={
                      i < product.reviewStar
                        ? '/image/star.svg'
                        : '/image/star-gray.svg'
                    }
                    alt={i < product.reviewStar ? '노란색 별' : '회색 별'}
                    width={20}
                    height={20}
                    className=""
                  />
                ))}
              </div>
              <span className="text-2xl">
                ${product.price.toLocaleString()}
              </span>
            </header>
            <h2 id="product-description" className="sr-only">
              제품 설명
            </h2>
            <p className="mt-6">{product.description}</p>
          </section>
          <hr className="my-6"></hr>
          <section aria-labelledby="product-select-buy" className="space-y-6">
            <div className="flex gap-4">
              <label>Colours:</label>
              <RadioGroup
                defaultValue={colorOption.values[0]?.name}
                className="flex"
                onValueChange={handleChange}
              >
                {colorOption.values.map(
                  (color: ProductOptionValue, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={color.name}
                        id={`color-${idx}`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <Label htmlFor={`color-${idx}`} className="sr-only">
                        select {color.name} color
                      </Label>
                    </div>
                  ),
                )}
              </RadioGroup>
            </div>
            {/* size */}
            <div className="flex gap-4">
              <label>Size:</label>
              <RadioGroup
                defaultValue={sizeOption.values[0]?.name}
                className="flex"
                onValueChange={handleChange}
              >
                {sizeOption.values.map(
                  (size: ProductOptionValue, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={size.name}
                        id={`color-${idx}`}
                        className="rounded-md border px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 data-[state=checked]:bg-black data-[state=checked]:text-white"
                      >
                        {size.name}
                      </RadioGroupItem>

                      <Label htmlFor={`color-${idx}`} className="sr-only">
                        select {size.name} size
                      </Label>
                    </div>
                  ),
                )}
              </RadioGroup>
            </div>
            {/* 가격변동 */}
            <div className="flex items-center gap-2">
              <CountInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={99}
              />
              <Button size="md" variant="primary">
                Buy NOW
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
