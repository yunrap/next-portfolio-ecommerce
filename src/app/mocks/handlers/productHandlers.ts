import { http, HttpResponse } from 'msw';
import { mockProducts } from '../data/mockProducts';

export const productHandlers = [
  http.get('/products', ({ request }) => {
    const url = new URL(request.url, 'http://localhost');
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = mockProducts.slice(start, end);

    return HttpResponse.json({
      data: paginatedData,
      total: mockProducts.length,
      page,
      limit,
    });
  }),
];
