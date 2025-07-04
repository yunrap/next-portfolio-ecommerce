import axiosInstance from '@/app/shared/utils/axiosInstance';
import { Product } from '../model/product.model';

export const fetchDetailProducts = (detail: string): Promise<Product> => {
  return axiosInstance.get(`/products/${detail}`).then(function (response) {
    return response.data;
  });
};
