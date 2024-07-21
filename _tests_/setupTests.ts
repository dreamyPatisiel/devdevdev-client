import '@testing-library/jest-dom';

import { server } from './mocks/server';

// msw를 이용한 서버를 일단 띄워서 listen 해준다.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 하나하나 끝날 때마다 => 초기화 해준다.
afterEach(() => {
  server.resetHandlers();
});

// Jest 테스트가 전부 끝날 때 => close 해준다.
afterAll(() => {
  server.close();
});
