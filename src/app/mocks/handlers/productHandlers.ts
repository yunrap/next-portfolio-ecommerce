import { http, HttpResponse } from 'msw';
import { mockProducts } from '../data/mockProducts';

export const productHandlers = [
  // 상품리스트 조회
  http.get('/products', ({ request }) => {
    const url = new URL(request.url, 'http://localhost');
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const idsParam = url.searchParams.get('ids');
    let filteredData = mockProducts;

    if (idsParam) {
      const ids = idsParam.split(',').map(id => Number(id));
      filteredData = filteredData.filter(product => ids.includes(product.id));
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filteredData.slice(start, end);

    return HttpResponse.json({
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
    });
  }),

  // 상품상세 조회
  http.get('/products/:productId', ({ params }) => {
    const productId = Number(params.productId);

    const product = mockProducts[productId];

    if (product) {
      return HttpResponse.json(product, { status: 200 });
    } else {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }
  }),
];
