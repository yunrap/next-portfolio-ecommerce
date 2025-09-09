# next-intl 다국어 지원 구현

## 📅 작업 일자
2024년 작업 완료

## 🎯 목적
TopHeader 컴포넌트에 한국어/영어 번역 기능을 구현하여 사용자가 언어를 선택할 수 있도록 함

## 🛠 기술 스택
- **next-intl**: Next.js 15 App Router 지원 국제화 라이브러리
- **쿠키 기반 로케일 관리**: 사용자 언어 선택 저장

## 📁 구현된 파일 구조

```
├── messages/                    # 번역 메시지 파일
│   ├── ko.json                 # 한국어 번역
│   └── en.json                 # 영어 번역
├── src/
│   ├── i18n/
│   │   └── request.ts          # i18n 설정 및 쿠키 관리
│   └── app/
│       ├── layout.tsx          # NextIntlClientProvider 통합
│       └── shared/ui/
│           ├── TopHeader.tsx   # 번역 기능 적용
│           └── LanguageSelector.tsx  # 언어 선택 컴포넌트
├── next.config.ts              # next-intl 플러그인 설정
└── package.json                # next-intl 의존성 추가
```

## 🔧 주요 구현 사항

### 1. 패키지 설치
```bash
npm install next-intl
```

### 2. next.config.ts 설정
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### 3. 번역 메시지 파일

**messages/ko.json**
```json
{
  "TopHeader": {
    "promotionMessage": "여름 수영복 특가 할인 및 무료 특급 배송 - 50% 할인!",
    "shopNow": "지금 쇼핑"
  }
}
```

**messages/en.json**
```json
{
  "TopHeader": {
    "promotionMessage": "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
    "shopNow": "ShopNow"
  }
}
```

### 4. i18n 설정 (src/i18n/request.ts)
- 쿠키 기반 로케일 관리
- 기본 언어: 한국어 (ko)
- 지원 언어: 한국어, 영어

### 5. 레이아웃 통합 (src/app/layout.tsx)
- NextIntlClientProvider로 앱 전체 래핑
- 서버에서 로케일과 메시지 제공

### 6. TopHeader 컴포넌트 번역 적용
- `useTranslations('TopHeader')` 훅 사용
- 정적 텍스트를 번역 키로 변경

### 7. LanguageSelector 컴포넌트
- 현재 로케일을 `useLocale()` 훅으로 감지
- 쿠키에 선택한 언어 저장 (1년간)
- 언어 변경 시 페이지 새로고침으로 즉시 적용

## ⚡ 작동 방식

1. **초기 로딩**: 쿠키에서 저장된 언어 또는 기본 한국어로 시작
2. **언어 선택**: LanguageSelector에서 한국어/영어 선택
3. **쿠키 저장**: 선택한 언어를 `locale` 쿠키에 1년간 저장
4. **페이지 새로고침**: `window.location.reload()`로 새 언어 적용
5. **번역 표시**: TopHeader의 모든 텍스트가 선택한 언어로 표시

## 🎨 UI/UX 특징

- **서버 컴포넌트**: TopHeader는 서버에서 번역되어 빠른 렌더링
- **클라이언트 컴포넌트**: LanguageSelector만 클라이언트에서 상호작용
- **반응형 디자인**: 모든 화면 크기에서 안정적인 언어 선택기
- **시각적 피드백**: 현재 선택된 언어 강조 표시

## 🔍 파일별 세부 변경사항

### TopHeader.tsx
```typescript
// Before: 정적 텍스트
<p>여름 수영복 특가 할인 및 무료 특급 배송 - 50% 할인!</p>
<span>지금 쇼핑</span>

// After: 번역 적용
const t = useTranslations('TopHeader');
<p>{t('promotionMessage')}</p>
<span>{t('shopNow')}</span>
```

### LanguageSelector.tsx
```typescript
// 쿠키 기반 언어 변경
const handleLanguageChange = (language) => {
  document.cookie = `locale=${language.code}; path=/; max-age=31536000`;
  window.location.reload();
};
```

## 🚀 확장 가능성

1. **더 많은 언어 추가**: messages 폴더에 새 JSON 파일 추가
2. **다른 컴포넌트 번역**: 동일한 패턴으로 전체 앱 다국어화
3. **URL 기반 라우팅**: next-intl의 라우팅 기능 활용 가능
4. **RTL 언어 지원**: 아랍어 등 우측-좌측 언어 지원 가능

## 📝 개발자 노트

- **Hydration 이슈 없음**: 서버-클라이언트 상태 일치
- **성능 최적화**: 서버 컴포넌트로 번들 크기 최소화
- **타입 안전성**: TypeScript와 완전 호환
- **SEO 친화적**: 서버사이드 렌더링 지원

## 🐛 알려진 제한사항

- 언어 변경 시 페이지 새로고침 필요 (UX 개선 여지)
- 현재 TopHeader만 번역 적용 (추후 확장 필요)

## 🔗 참고 문서

- [next-intl 공식 문서](https://next-intl.dev/docs/getting-started/app-router)
- [Next.js 15 App Router](https://nextjs.org/docs)