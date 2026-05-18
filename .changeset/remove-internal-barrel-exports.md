---
'@reapit/elements': major
---

Removed: internal exports from the public API surface. Top-level barrel files in `src/core`, `src/utils`, and `src/lab` now use explicit named exports instead of `export *`, removing leaked internal hooks, utilities, and sub-components that were never intended to be public.
