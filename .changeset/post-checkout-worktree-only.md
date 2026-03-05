---
'@reapit/elements': patch
---

Internal: restrict the `post-checkout` hook to run only in linked worktrees so that `yarn install` runs automatically when a new linked worktree is created or when checking out a branch within a linked worktree, but is skipped in the main working tree.
