import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';

  // 여기서 모킹 데이터 생성
  const data = [
    { id: '1', name: `Page ${page} 상품 1` },
    { id: '2', name: `Page ${page} 상품 2` },
  ];

  return NextResponse.json(data);
}
