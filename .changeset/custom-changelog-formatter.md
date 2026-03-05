---
'@reapit/elements': patch
---

Internal: Add custom Keep a Changelog-inspired formatter for changesets. Each entry is tagged with a category derived from a prefix in the summary (e.g. `Fixed:`, `Added:`) or inferred from the semver bump type. Entries include GitHub PR, commit, and author links.
