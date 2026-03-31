---
'@reapit/elements': patch
---

Fixed: Add `./dist/types/*.d.ts` to the `imports` field in `package.json` so TypeScript can resolve top-level type declarations (e.g. `dist/types/index.d.ts`) when using the `#src/*` import alias.
