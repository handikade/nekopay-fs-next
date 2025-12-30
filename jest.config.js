// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "node", // Changed from 'jest-environment-jsdom'
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(mongoose|mongodb|bson)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

module.exports = createJestConfig(customJestConfig);
