// /src/mocks/MSWProvider.tsx
'use client';

import useMSWReady from './useMSWReady';

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ready = useMSWReady();

  if (process.env.NODE_ENV === 'development' && !ready) {
    return <p>MSW 로딩 중...</p>;
  }

  return <>{children}</>;
}
