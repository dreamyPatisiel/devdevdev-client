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
  },
  testEnvironment: 'jest-environment-jsdom',
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
