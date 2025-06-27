export const mockProducts = Array.from({ length: 100 }).map((_, i) => {
  const seed = `product${i}`;
  return {
    id: i,
    name: `상품명 ${i}`,
    description: `이 상품은 매우 좋은 상품입니다! 상세 설명 ${i}`,
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
  };
});
