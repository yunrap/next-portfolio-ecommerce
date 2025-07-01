# 🛒 Next Portfolio Ecommerce

Next.js 기반의 이커머스 프로젝트입니다.  
상품 목록, 장바구니, 필터 기능 등 쇼핑몰의 핵심 기능을 구현하며, 반응형 UI와 클라우드 이미지 최적화에 중점을 두었습니다.

---

## 🛠️ 기술 스택

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Query (TanStack Query)**
- **AWS S3 + CloudFront**
- **MSW (Mock Service Worker)**
- **ShadCN UI**
- **Storybook**

---

## ✨ 주요 기능

- **상품 목록**: TanStack Query를 활용해 서버에서 상품 데이터를 효율적으로 페칭하고 캐싱하며, 무한 스크롤 기능을 구현
- **장바구니**: localStorage 저장, 수량 조절, 총액 계산
- **카테고리 필터링**: URL query를 활용한 실시간 필터
- **반응형 UI**: 모바일/데스크탑 대응, Tailwind 활용
- **에러 및 로딩 처리**: Skeleton + ErrorBoundary 구현

---

## 🔧 기술적 설계 및 고민

- `ShadCN UI` 컴포넌트를 프로젝트 상황에 맞게 커스터마이징
- `MSW`를 활용해 로컬 테스트 환경을 구축, SSR 환경에서는 제한이 있어 브라우저 기반 CSR에서만 구현
- `접근성` 고려
- 이미지 최적화와 성능 개선 → `CloudFront + S3`를 활용한 이미지 캐싱 전략

---

## 📌 향후 개선 계획

- 사용자 로그인 기능 연동
- 백엔드 연결 및 실제 결제 흐름 구현
- 상품 검색 기능 추가
- 컴포넌트 단위 테스트 작성 및 테스트 커버리지 확대
- 다크모드/다국어지원
