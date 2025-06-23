// /src/mocks/useMSWReady.ts
'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __MSW_WORKER_STARTED__?: boolean;
  }
}

export default function useMSWReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.__MSW_WORKER_STARTED__) {
      setReady(true);
      return;
    }

    import('./browser')
      .then(({ worker }) => worker.start({ onUnhandledRequest: 'warn' }))
      .then(() => {
        console.log('[MSW] worker started');
        window.__MSW_WORKER_STARTED__ = true;
        setReady(true);
      })
      .catch(err => {
        console.error('[MSW] failed to start worker', err);
      });
  }, []);

  return ready;
}
