export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.ts',
    '\\.(css)$': '<rootDir>/src/test/__mocks__/styleMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/test-setup.ts'],
};
