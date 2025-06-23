'use client';

import { useEffect } from 'react';

export default function MSWInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('./browser')
        .then(({ worker }) => {
          return worker.start({
            onUnhandledRequest: 'warn',
          });
        })
        .then(() => {
          console.log('[MSW] Service worker started.');
        })
        .catch(err => {
          console.error('[MSW] Failed to start service worker:', err);
        });
    }
  }, []);

  return null;
}
