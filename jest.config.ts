import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const config: InitialOptionsTsJest = {
  modulePathIgnorePatterns: ["dist"],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleDirectories: ["src", "node_modules"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/lib/"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default config;
