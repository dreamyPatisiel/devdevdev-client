// Node.js 환경에서 Service Worker를 설정
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
