import { http, HttpResponse } from 'msw';
import { mockProducts } from '../data/mockProducts';
import { filterProducts } from '../service/productService';

export const productHandlers = [
  // 상품리스트 조회
  http.get('/products', ({ request }) => {
    const url = new URL(request.url, 'http://localhost');

    const query = url.searchParams;

    const page = Number(query.get('page') ?? '1');
    const limit = Number(query.get('limit') ?? '10');

    const filteredData = filterProducts(query);

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
