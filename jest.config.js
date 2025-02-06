// 테스트 실행 전에 실행되어야 하는 파일이나 모듈을 지정할 수 있는 옵션
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  //   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@stores/(.*)$': '<rootDir>/stores/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@core/(.*)$': '<rootDir>/core/$1',
  },
  testEnvironment: 'jest-fixed-jsdom',

  // msw/node를 찾을수 없다는 오류 해결을 위함
  // https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['./_tests_/setupTests.ts'],
};

module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
//   // './__tests__/setupTests.ts'],
//   // setupFiles: ['./__tests__/mocks/server.ts'], // 서버설정

//   moduleNameMapper: {
//     '^@pages/(.*)$': '<rootDir>/pages/$1',
//   },
// };
