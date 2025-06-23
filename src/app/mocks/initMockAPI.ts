import { worker } from './browser';

export const initMockAPI = async () => {
  if (typeof window !== 'undefined') {
    await worker.start({ onUnhandledRequest: 'warn' });
  }
};
