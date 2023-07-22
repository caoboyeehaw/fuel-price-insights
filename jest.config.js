module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  testMatch: ["<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: 'jsdom',
};
