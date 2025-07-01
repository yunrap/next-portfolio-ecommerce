// mocks/productService.ts

import { Product } from '@/app/domains/shop/product/model/product.model';
import { mockProducts } from '../data/mockProducts';

export function filterProducts(query: URLSearchParams) {
  let filteredData: Product[] = mockProducts;

  const idsParam = query.get('ids');
  if (idsParam) {
    const ids = idsParam.split(',').map(id => Number(id));
    filteredData = filteredData.filter(p => ids.includes(Number(p.id)));
  }
  const category = query.get('category');
  if (category) {
    filteredData = filteredData.filter(p => p.category === category);
  }

  return filteredData;
}
