---
'@reapit/elements': patch
---

Internal: Migrate release process to changesets. Versioning, changelog generation, and npm publishing are now automated via `changesets/action`. Contributors add a changeset file per PR; the release workflow handles the rest.
