import type { Config } from "jest";

const config: Config = {
  modulePathIgnorePatterns: ["dist"],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleDirectories: ["src", "node_modules"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/lib/"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};

export default config;
