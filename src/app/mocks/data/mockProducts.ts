export const categoryFolderMap: Record<string, string> = {
  'Woman’s Fashion': 'womens-fashion',
  'Men’s Fashion': 'mens-fashion',
  Electronics: 'electronics',
  'Home & Lifestyle': 'home-and-lifestyle',
  Medicine: 'medicine',
  'Sports & Outdoor': 'sports-and-outdoor',
  'Baby’s & Toys': 'babys-and-toys',
  'Groceries & Pets': 'groceries-and-pets',
  'Health & Beauty': 'health-and-beauty',
};

const categories = Object.keys(categoryFolderMap);
const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const mockProducts = Array.from({ length: 100 }).map((_, i) => {
  const category = getRandom(categories);
  const folder = categoryFolderMap[category];
  const imageIndex = (i % 3) + 1;
  const imageBase = `${CLOUDFRONT_URL}/${folder}/image${imageIndex}.jpg`;

  return {
    id: String(i),
    name: `${category} 상품 ${i + 1}`,
    category,
    description: `${category} 카테고리의 멋진 상품입니다.`,
    price: 5000 + Math.floor(Math.random() * 100000),
    originPrice: 7000 + Math.floor(Math.random() * 120000),
    reviewStar: Math.floor(Math.random() * 5) + 1,
    stock: Math.floor(Math.random() * 100),
    discount: Math.floor(Math.random() * 40),
    imageUrl: imageBase,
    subImageUrls: [
      `${CLOUDFRONT_URL}/${folder}/image${imageIndex}-sub1.jpg`,
      `${CLOUDFRONT_URL}/${folder}/image${imageIndex}-sub2.jpg`,
      `${CLOUDFRONT_URL}/${folder}/image${imageIndex}-sub3.jpg`,
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
