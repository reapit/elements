---
name: upgrading-storybook
description: Bump the `storybook` package version across this repo and regenerate the manual patch applied to it. Use this whenever `storybook` or `@storybook/*` versions change (a manual bump, or a Dependabot/Renovate PR that only partially updated ranges) and `yarn install --immutable` fails, or when a Storybook upgrade needs the JSDoc-extraction patch reapplied.
---

# Upgrading Storybook

`storybook` ships as a prebuilt bundle, so we can't patch its TypeScript source directly —
we patch the compiled `dist/_node-chunks/*.js` output instead. That patch fixes JSDoc
extraction (`enrichCsfStory` in Storybook's CSF — Component Story Format — tooling) for
stories defined via `meta.extend(...)`, which Storybook's upstream check doesn't recognise as
a CSF factory call.
Every `storybook` release changes the chunk's hash-named filename, so the patch must be
regenerated — copying it forward verbatim does not work.

## Symptoms this skill fixes

- `yarn install --immutable` fails with "The lockfile would have been modified by this
  install, which is explicitly forbidden" after a Storybook version bump that leaves
  `resolutions`/the patch map out of sync with the new version (most Dependabot bumps are
  silently absorbed by `resolutions` and won't trigger this — it's the version-mismatch case
  that does).
- Storybook version pins are inconsistent across `package.json` files (e.g. some
  `@storybook/*` packages bumped, but the `storybook`/`@storybook/codemod` caret ranges or the
  `resolutions` patch map left behind).
- Storybook docs mysteriously stop extracting JSDoc comments for stories that use
  `meta.extend(...)` after an upgrade.

## Where things live

- `.yarn/patches/storybook-npm-<version>-<hash>.patch` — one patch file per patched version.
  Old files are never deleted; each still-referenced resolution is a live anchor, not dead
  weight, so leave prior versions' files in place.
- Root `package.json` → `resolutions` — maps both the exact version (`storybook@npm:X.Y.Z`)
  and the caret range in use (`storybook@npm:^X.Y.Z`) to `patch:storybook@npm%3AX.Y.Z#~/.yarn/patches/storybook-npm-X.Y.Z-<hash>.patch`.
  Both keys are needed: the exact key covers anything resolving to that literal version, the
  caret key covers whichever workspace still depends on `^X.Y.Z`.
- `packages/elements/package.json` → `devDependencies` — `storybook`, `@storybook/codemod`,
  and any other caret-ranged Storybook packages. The remaining `@storybook/*` entries there
  are exact-pinned and should always match the same version as each other.

## Steps

1. **Align every Storybook-related version pin to the target version.** Check both
   `package.json` (root) and `packages/elements/package.json` for:
   - Exact-pinned `@storybook/*` packages — bump to the target version.
   - Caret-ranged packages (`storybook`, `@storybook/codemod`) — bump the range's lower bound
     to `^<target-version>` so it matches its siblings.

   If this was triggered by a bot PR, diff what it actually changed
   (`git show <sha> -- package.json packages/elements/package.json`) against what it _should_
   have changed — bots frequently leave caret ranges and the `resolutions` patch map alone
   because they don't parse `resolutions`.

2. **Refresh the lockfile once, unpatched, so Yarn has something to patch.**

   ```bash
   yarn install
   ```

   This will resolve `storybook` to the new version without a patch — expected at this point.

3. **Start the patch workflow.**

   ```bash
   yarn patch storybook
   ```

   This extracts the new version into a temp directory and prints its path plus the
   `yarn patch-commit -s <path>` command to run once done.

4. **Find the chunk file and reapply the fix.** The chunk filename changes every release, so
   locate it by content, not by name:

   ```bash
   grep -rl 'isCsfFactory = t5.isCallExpression(storyExport)' <temp-dir>/dist/_node-chunks/
   ```

   The fix widens the CSF-factory check so it also matches `meta.extend(...)` calls, not just
   `meta.<story>` calls. In the matched file, change:

   ```js
   isCsfFactory =
     t5.isCallExpression(storyExport) &&
     t5.isMemberExpression(storyExport.callee) &&
     t5.isIdentifier(storyExport.callee.object) &&
     storyExport.callee.object.name === "meta";
   ```

   to:

   ```js
   isCsfFactory =
     t5.isCallExpression(storyExport) &&
     t5.isMemberExpression(storyExport.callee) &&
     ((t5.isIdentifier(storyExport.callee.object) && storyExport.callee.object.name === "meta") ||
       (t5.isIdentifier(storyExport.callee.property) &&
         storyExport.callee.property.name === "extend"));
   ```

   Diff against the previous version's patch file in `.yarn/patches/` to confirm this is still
   the only change needed — if Storybook restructured this code more heavily, adapt the patch
   accordingly rather than forcing the old diff to apply.

5. **Commit the patch.**

   ```bash
   yarn patch-commit -s <temp-dir>
   ```

   This writes a new `.yarn/patches/storybook-npm-<version>-<hash>.patch` and — importantly —
   rewrites whichever `package.json` declared the dependency to point directly at the patch
   descriptor, and appends a redundant `resolutions` entry to the root `package.json`. **Undo
   both of those**, keeping the pattern consistent with every prior Storybook bump in this
   repo:
   - Revert the `devDependencies` entry back to a plain `^<version>` range.
   - Remove the appended/duplicate `resolutions` entry, and instead add clean
     `storybook@npm:<version>` and `storybook@npm:^<version>` entries (alphabetically sorted
     among the existing `storybook@npm:...` lines) pointing at the new patch file, following
     the exact format of the existing entries for older versions.

6. **Refresh the lockfile against the finished resolutions map, then verify immutability.**

   ```bash
   yarn install
   yarn install --immutable
   ```

   The second command must succeed with no lockfile diff — that's what CI runs.

7. **Verify the patch actually took effect.**

   ```bash
   yarn why storybook
   ```

   Every consumer (`@storybook/cli`, `@storybook/codemod`, `create-storybook`, the workspace
   itself) should resolve to the same patched descriptor. Then prove the patch works, not just
   that it installs:

   ```bash
   yarn workspace @reapit/elements run check:types
   yarn workspace @reapit/elements run build:docs
   ```

   A real Storybook docs build is the only way to confirm the patched JSDoc extraction still
   works — type-checking alone won't catch a broken patch.

8. **Add a changeset.** This is an internal tooling change with no consumer-facing effect on
   `@reapit/elements`, so add an empty changeset (see the `writing-changesets` skill) rather
   than a versioned one — the pre-push hook requires one either way. Name the file
   descriptively (e.g. `fix-storybook-lockfile-patch.md`), not the CLI's random slug.
