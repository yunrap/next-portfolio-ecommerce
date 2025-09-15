import axiosInstance from '@/app/shared/utils/axiosInstance';

export interface CreateProductResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    category: string;
    description: string;
    salePrice: number;
    originalPrice: number;
    stock: number;
    discountRate: number;
    createdAt: string;
  };
}

export const createProduct = async (
  formData: FormData,
): Promise<CreateProductResponse> => {
  const res = await axiosInstance.post('/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};