import { Product } from '@/app/domains/shop/product/model/product.model';

export const product: Product = {
  id: 1,
  name: '상품명 1',
  description: '이 상품은 매우 좋은 상품입니다! 상세 설명 1',
  options: [
    {
      name: 'Color',
      values: [
        { name: 'blue', hex: '#A0BCE0' },
        { name: 'pink', hex: '#E07575' },
      ],
    },
    {
      name: 'Size',
      values: [{ name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' }],
    },
  ],
  price: 10000,
  originPrice: 10000,
  reviewStar: 3,
  stock: 100,
  category: '전자제품',
  discount: 20,
  imageUrl: 'https://picsum.photos/seed/product1-sub1/300/300',
  subImageUrls: [
    'https://picsum.photos/seed/product1-sub1/300/300',
    'https://picsum.photos/seed/product1-sub2/300/300',
    'https://picsum.photos/seed/product1-sub3/300/300',
    'https://picsum.photos/seed/product1-sub4/300/300',
  ],
};
