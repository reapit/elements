---
'@reapit/elements': major
---

Removed: the `@reapit/elements` bare specifier entry point and all top-level barrel files (`src/index.ts`, `src/core/index.ts`, `src/utils/index.ts`, `src/lab/index.ts`, `src/deprecated/index.ts`). Use subpath imports such as `@reapit/elements/core/button` instead. Run the `rewrite-v5-imports` codemod to migrate automatically.

Also renamed `src/icons/index.ts` to `src/icons/all-icons.ts`. Update any direct imports of `@reapit/elements/icons/index` to `@reapit/elements/icons/all-icons`.
