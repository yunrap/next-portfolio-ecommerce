import { Product } from '../model/product.model';

interface FetchProductsParams {
  page?: number;
  limit?: number;
  ids?: string[];
}

interface PaginatedProductResponse {
  data: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const fetchProducts = async (
  options: FetchProductsParams = { page: 1, limit: 10 },
): Promise<PaginatedProductResponse> => {
  const params = new URLSearchParams();

  if (options.ids && options.ids.length > 0) {
    params.set('ids', options.ids.join(','));
  }

  params.set('page', String(options.page ?? 1));
  params.set('limit', String(options.limit ?? 10));

  const res = await fetch(`/products?${params.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('상품 요청 실패');
  return res.json();
};
