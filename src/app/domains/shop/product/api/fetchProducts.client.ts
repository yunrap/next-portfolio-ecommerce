import axiosInstance from '@/app/shared/utils/axiosInstance';
import { Product } from '../model/product.model';

interface FetchProductsOptions {
  page?: number;
  limit?: number;
  ids?: string[];
}

export const fetchProducts = async (
  options?: FetchProductsOptions,
): Promise<Product[]> => {
  const { page = 1, limit = 10, ids } = options ?? {};
  const params: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };
  if (ids && ids.length > 0) {
    params.ids = ids.join(',');
  }

  const res = await axiosInstance.get('/products', { params });
  return res.data.data;
};
