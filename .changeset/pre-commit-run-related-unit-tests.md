---
'@reapit/elements': patch
---

Internal: Run related unit tests for staged files in the pre-commit hook via `vitest related`. Tests run in parallel with the lint and format tasks, keeping the hook as fast as possible.
