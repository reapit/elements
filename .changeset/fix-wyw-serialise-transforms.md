---
'@reapit/elements': patch
---

Internal: Serialise `@wyw-in-js/vite` transform calls to fix intermittent `AbortError` build failures under Vite 8.

Vite 8 uses Rolldown, which invokes plugin `transform` hooks with higher parallelism than Rollup. The `@wyw-in-js/vite` plugin shares mutable state across concurrent transforms, causing a race condition where one transform supersedes another's in-flight entrypoint and triggers an unhandled `AbortError`. The sibling `@wyw-in-js/rollup` package already serialises transforms by default (PR #203), but the Vite plugin does not. This change applies the same promise-chain mutex approach via a thin wrapper in `build/with-serialised-transform.ts`.
