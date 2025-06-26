// src/mocks/data/mockProducts.ts

export const mockProducts = Array.from({ length: 100 }).map((_, i) => {
  const seed = `product${i + 1}`;
  return {
    id: i + 1,
    name: `상품명 ${i + 1}`,
    description: `이 상품은 매우 좋은 상품입니다! 상세 설명 ${i + 1}`,
    color: ['#bbbb', '#rrr'],
    price: 10000 + i * 500,
    originPrice: 10000 + i * 800,
    reviewStar: 3,
    stock: 100 - i,
    category: '전자제품',
    discount: 20,
    imageUrl: `https://picsum.photos/seed/${seed}/300/300`,
    subImageUrls: [
      `https://picsum.photos/seed/${seed}/300/300`,
      `https://picsum.photos/seed/${seed}-sub1/300/300`,
      `https://picsum.photos/seed/${seed}-sub2/300/300`,
      `https://picsum.photos/seed/${seed}-sub3/300/300`,
    ],
  };
});
