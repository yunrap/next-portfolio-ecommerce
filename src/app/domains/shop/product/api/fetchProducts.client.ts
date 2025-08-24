import axiosInstance from '@/app/shared/utils/axiosInstance';
import { Product } from '../model/product.model';

interface FetchProductsParams {
  category?: string;
  page?: number;
  limit?: number;
  ids?: string[];
}

interface PaginatedProductResponse {
  products: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const fetchProducts = async (
  options?: FetchProductsParams,
): Promise<PaginatedProductResponse> => {
  const { page = 1, limit = 10, ids, category } = options ?? {};
  const params: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };
  if (ids && ids.length > 0) {
    params.ids = ids.join(',');
  }

  if (category) {
    params.category = category;
  }

  const res = await axiosInstance.get('/product', { params });
  return res.data;
};
