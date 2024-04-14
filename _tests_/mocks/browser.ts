// 브라우저에서 Service Worker를 설정하는 역할
import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

console.log('browser.ts');
console.log(...handlers);
