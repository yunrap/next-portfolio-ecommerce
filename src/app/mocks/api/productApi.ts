type FetchProductsOptions = {
  ids?: string[];
  page?: number;
  limit?: number;
};

// 상품리스트 조회
export const fetchProducts = async (
  options: FetchProductsOptions = { page: 1, limit: 10 },
) => {
  const params = new URLSearchParams();

  if (options.ids && options.ids.length > 0) {
    params.set('ids', options.ids.join(','));
  }

  params.set('page', String(options.page ?? 1));
  params.set('limit', String(options.limit ?? 10));

  const res = await fetch(`/products?${params.toString()}`);
  if (!res.ok) throw new Error('상품 요청 실패');
  return res.json();
};

// 상품상세 조회
export const fetchDetailProducts = async (detail: string) => {
  const res = await fetch(`/products/${detail}`);
  if (!res.ok) throw new Error('상품 상세 요청 실패');
  return res.json();
};
