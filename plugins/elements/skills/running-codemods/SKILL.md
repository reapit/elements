---
name: running-codemods
description: Run automated codemods to migrate your code when upgrading @reapit/elements. Use when hitting breaking changes, deprecation warnings, or TypeScript errors after an upgrade.
---

# Running Codemods

Use this skill after upgrading `@reapit/elements` to automate migration to a new API.

Reach for it when the changelog references a migration path, or you're hitting breaking changes, deprecation warnings, or TypeScript errors after an upgrade. Skip it for new features or bug fixes, since there's nothing to migrate.

## Workflow

```bash
# 1. Find the codemod you need
yarn dlx @reapit/elements@beta codemod list

# 2. Read its README in the codemods/<name>/ directory of the elements repo;
#    check the "Limitations" section for what it can't automate
yarn dlx @reapit/elements@beta codemod info <name>

# 3. Preview changes before touching any files
yarn dlx @reapit/elements@beta codemod apply <name> <directory> --dry-run

# 4. Apply for real, scoped to where you actually use the component (not the whole repo)
yarn dlx @reapit/elements@beta codemod apply <name> <directory>

# 5. Search for TODO comments the codemod left for manual follow-up, then verify
git diff
yarn typecheck && yarn test && yarn build

# 6. Commit
git add .
git commit -m "chore: Run <name> migration"
```

If your project re-exports Elements through an internal package, add `--facade-package <your-package>` to the `apply` command so the codemod rewrites imports from your package instead of `@reapit/elements` directly.

## Common mistakes

- **Skipping `--dry-run`.** The AST transforms can still miss edge cases; see the diff before it's written to disk.
- **Applying to the whole repo** (e.g. `.`) instead of scoping to the directory that uses the component.
- **Assuming full automation.** Every codemod has limitations: read the README, then grep for TODOs it left behind.
- **Not re-running `typecheck`/`test`/`build`** before committing.
- **Forgetting `--facade-package`** when Elements is re-exported through an internal wrapper, so the codemod finds nothing to transform.

Running several codemods in one upgrade? Apply and commit them one at a time (dry-run → apply → verify → commit) so the history stays bisectable.

## Reference

- `yarn dlx @reapit/elements@beta codemod --help`
- `yarn dlx @reapit/elements@beta codemod apply <name> --help`
