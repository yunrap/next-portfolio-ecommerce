// 상품상세 조회
export const fetchDetailProducts = async (detail: string) => {
  const res = await fetch(`/products/${detail}`);
  if (!res.ok) throw new Error('상품 상세 요청 실패');
  return res.json();
};
