// src/mocks/data/mockProducts.ts
export const mockProducts = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: `상품명 ${i + 1}`,
  description: `이 상품은 매우 좋은 상품입니다! 상세 설명 ${i + 1}`,
  price: 10000 + i * 500,
  originPrice: 10000 + i * 800,
  reviewStar: 3,
  stock: 100 - i,
  category: '전자제품',
  discount: 20,
  imageUrl: `https://picsum.photos/seed/product${i + 1}/300/300`,
}));
