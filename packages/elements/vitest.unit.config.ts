import { configDefaults, defineProject, mergeConfig } from "vitest/config";

import vitestConfig from "./vitest.config";

// Merging `vitestConfig` here (rather than `extends: true`) is what pulls the build's `plugins`
// (svgr, wyw-in-js) into this project; see the comment in `vitest.config.ts`.
export default mergeConfig(
  vitestConfig,
  defineProject({
    test: {
      name: "unit",
      clearMocks: true,
      environment: "happy-dom",
      // `include` below also matches `*.visual.test.tsx`, which belongs to the other project
      // and needs a real browser. Excluding it here rather than narrowing `include` avoids
      // encoding a "not visual" pattern into the glob every unit test has to satisfy.
      exclude: [...configDefaults.exclude, "**/*.visual.test.ts?(x)"],
      globals: true,
      include: ["src/**/*.test.ts?(x)", "codemods/**/*.test.ts"],
      setupFiles: ["vitest.setup.ts"],
    },
  }),
);
