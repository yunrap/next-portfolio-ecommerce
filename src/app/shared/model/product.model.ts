export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originPrice: number;
  reviewStar: number;
  stock: number;
  category: string;
  discount: number;
  imageUrl: string;
  subImageUrls: string[];
}
