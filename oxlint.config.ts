import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript"],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  categories: {
    correctness: "warn",
  },
  rules: {
    "typescript/no-unused-vars": "error",
    "eslint/no-unused-vars": "off",
    "eslint/no-debugger": "off",
    "eslint/no-empty-pattern": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/rules-of-hooks": "off", // TODO: This should be ON
    "react/exhaustive-deps": "off", // TODO: This should be ON
  },
  ignorePatterns: [
    "node_modules/",
    "setup-tests.ts",
    "packages/*/build",
    "packages/*/dist",
    "packages/*/public/dist",
  ],
  settings: {
    react: {
      version: "18",
    },
  },
});
