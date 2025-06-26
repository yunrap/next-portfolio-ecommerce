export type ProductOptionValue = {
  name: string;
  hex?: string;
};

export type ProductOption = {
  name: 'Color' | 'Size' | string;
  values: ProductOptionValue[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  options: ProductOption[];
  price: number;
  originPrice: number;
  reviewStar: number;
  stock: number;
  category: string;
  discount: number;
  imageUrl: string;
  subImageUrls: string[];
};
