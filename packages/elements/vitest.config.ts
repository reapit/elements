import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

// Vitest doesn't merge `vite.config.ts` and `vitest.config.ts` automatically: a standalone
// `vitest.config.ts` would otherwise ignore the Vite config entirely, so `mergeConfig` folds
// this file's `test` block onto it.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // Coverage is a runner-wide concern rather than a per-project one, so it stays here and
      // reports on the `unit` project alone. The `visual` project contributes nothing: it only
      // screenshots components the unit project already exercises.
      coverage: {
        exclude: [
          "src/styles",
          "src/storybook",
          "src/tests",
          "src/tokens",
          "src/types",
          // Note: We don't want to report coverage for:
          // - story utilities
          "**/__story__/**",
          // - barrel files
          "**/index.ts",
          // - our figma code connect files
          "**/*.figma.*",
          // - our tests themselves
          "**/*.test.*",
          // - our stories
          "**/*.stories.*",
          // - any type declaration files
          "**/*.d.ts",
          // - any types.ts files
          "**/types.ts",
        ],
        include: ["src/**/*.ts", "src/**/*.tsx"],
        provider: "v8",
        reporter: ["json-summary", "text", "lcov"],
        reportsDirectory: "coverage/report",
        thresholds: {
          branches: 71,
          functions: 84,
          lines: 87,
          statements: 87,
        },
      },
      // Each project file merges `viteConfig` itself (rather than relying on `extends: true`)
      // because a project resolved from its own file only inherits `test` options that way, not
      // `plugins`. Without svgr/wyw-in-js, components render unstyled, which for the visual
      // project would mean baselines of nothing but unstyled markup.
      projects: ["./vitest.unit.config.ts", "./vitest.visual.config.ts"],
    },
  }),
);
