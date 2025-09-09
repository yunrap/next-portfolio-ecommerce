# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 코드 작업을 할 때 가이드를 제공합니다.

## 개발 명령어

- **개발 서버**: `npm run dev` (빠른 빌드를 위해 Turbopack 사용)
- **빌드**: `npm run build`
- **프로덕션 시작**: `npm start`
- **린팅**: `npm run lint` (src/ 폴더의 .js, .ts, .tsx 파일 검사)
- **린팅 자동 수정**: `npm run lint:fix`
- **코드 포매팅**: `npm run format` (Prettier)
- **디자인 토큰 빌드**: `npm run build:tokens` (Style Dictionary)
- **스토리북**: `npm run storybook` (포트 6006에서 실행)
- **스토리북 빌드**: `npm run build-storybook`

## 프로젝트 아키텍처

**Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **TanStack Query**를 사용한 이커머스 프로젝트입니다.

### 디렉토리 구조

```
src/app/
├── (routes)/                    # 라우트 그룹
│   ├── (info)/                 # 정보 페이지 (소개, 연락처)
│   ├── (shop)/                 # 쇼핑 페이지 (상품, 장바구니, 위시리스트)
│   └── (user)/                 # 사용자 페이지 (인증, 마이페이지)
├── domains/                    # 도메인 주도 설계 구조
│   ├── info/                   # 정보 도메인
│   ├── shop/                   # 쇼핑 도메인 (장바구니, 상품, 위시리스트)
│   └── user/                   # 사용자 도메인 (인증)
├── shared/                     # 공유 컴포넌트 및 유틸리티
│   ├── context/               # React Context 프로바이더
│   ├── store/                 # Zustand 스토어
│   ├── ui/                    # 공유 UI 컴포넌트
│   └── utils/                 # 유틸리티 함수
├── mocks/                     # MSW 목 데이터 및 핸들러
└── tokens/                    # 디자인 토큰 (colors.json)
```

### 도메인 구조 패턴

각 도메인은 일관된 구조를 따릅니다:
- `api/` - API 함수 (클라이언트/서버)
- `model/` - TypeScript 타입 및 데이터 모델
- `ui/` - 도메인별 UI 컴포넌트
- `PageName.tsx` - 메인 페이지 컴포넌트

### 주요 기술 스택

- **상태 관리**: 서버 상태는 TanStack Query, 클라이언트 상태는 Zustand
- **스타일링**: 커스텀 디자인 토큰과 함께 Tailwind CSS
- **UI 컴포넌트**: ShadCN UI 컴포넌트 (커스터마이징)
- **폼 처리**: React Hook Form + Zod 검증
- **목킹**: 개발용 MSW (Mock Service Worker)
- **테스팅**: Storybook 통합 Vitest, 브라우저 테스트용 Playwright

### 경로 별칭

- `@/*`는 `./src/*`에 매핑됩니다

### 데이터 플로우

1. **서버사이드**: 데이터 페칭 및 캐싱을 위해 TanStack Query 사용
2. **클라이언트사이드**: UI 상태(사이드바, 장바구니)를 위해 Zustand 스토어 사용
3. **목 데이터**: 개발 환경에서 MSW가 API 목킹 처리
4. **폼**: React Hook Form + Zod 검증

### 컴포넌트 아키텍처

- **공유 컴포넌트**: `src/app/shared/ui/`
- **도메인별 컴포넌트**: 각각의 도메인 폴더 내
- **ShadCN 컴포넌트**: `src/app/shared/ui/shadcn/`
- **스토리북 스토리**: 컴포넌트 문서화용

### 이미지 설정

`next.config.ts`에서 설정된 원격 이미지 패턴:
- Picsum 플레이스홀더 이미지

### 테스트 설정

- **Vitest**: Storybook 통합 단위 테스트
- `vitest.config.ts`에서 Storybook 테스트용 워크스페이스 구성

## 스타일링 가이드

### REM 단위 사용 원칙

모든 스타일링에서 **rem** 단위를 사용합니다:

- **폰트 크기**: `text-base` (1rem), `text-sm` (0.875rem), `text-lg` (1.125rem) 등
- **여백/패딩**: `p-4` (1rem), `m-2` (0.5rem), `gap-3` (0.75rem) 등  
- **크기**: `w-16` (4rem), `h-12` (3rem) 등
- **절대값 사용 금지**: `text-[14px]`, `p-[10px]` 등은 사용하지 않음

### 반응형 디자인

- **모바일 퍼스트**: 기본값은 모바일용, 브레이크포인트로 확장
- **브레이크포인트**: `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)
- **최소 지원 너비**: 344px까지 깨지지 않도록 설계

### 폰트 설정

- **기본 폰트**: Poppins (전역 설정됨)
- **폰트 weight**: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- **개별 폰트 지정 금지**: `font-['Poppins']` 등 사용하지 않음