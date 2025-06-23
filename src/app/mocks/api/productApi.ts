export const fetchProducts = async (page = 1, limit = 10) => {
  const res = await fetch(`/products?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('상품 요청 실패');
  return res.json();
};
