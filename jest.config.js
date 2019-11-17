module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  forceExit: true,
  testMatch: ['**/test/flattenizer.ts'],
  coveragePathIgnorePatterns: [
    'node_modules'
  ],
};
