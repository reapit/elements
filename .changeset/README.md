# Changesets

This folder contains changesets - small markdown files that describe changes made to the package. Changesets are used to automatically version and publish the package, and generate the changelog.

## How to Add a Changeset

When you make changes to the codebase, you should add a changeset to describe your changes:

```bash
yarn changeset
```

This will prompt you to answer a few questions:

1. **What type of change is this?**
   - `patch` - Bug fixes, documentation updates, minor tweaks (e.g. `1.2.3 → 1.2.4`)
   - `minor` - New features, enhancements (e.g. `1.2.3 → 1.3.0`)
   - `major` - Breaking changes (e.g. `1.2.3 → 2.0.0`)

   _Note: In prerelease mode, all bump types increment the prerelease number regardless of type (e.g. `x.y.z-<tag>.0 → x.y.z-<tag>.1`). The bump type is recorded and applied when exiting prerelease mode._

2. **Write a summary of your changes**
   - Be concise but descriptive
   - Focus on the "what" and "why" for users
   - Start with a recognised prefix to control the changelog category (see [Changelog categories](#changelog-categories))
   - Examples:
     - ✅ `Added: Combobox.Card component for card-based display of selected options`
     - ✅ `Fixed: Correct Drawer sizing on small viewports`
     - ✅ `Removed: CJS build output — consumers must migrate to ESM imports`
     - ❌ "Updated code" (too vague)
     - ❌ "Changed line 42 in button.tsx" (too technical)

The changeset will be saved as a markdown file in `.changeset/` and should be committed with your changes.

## Changelog categories

The changelog format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) naming conventions. Each entry carries a bold inline category label (e.g. **[Fixed]**, **[Added]**) derived from your changeset summary.

### Using a prefix (recommended)

Start your summary with one of these prefixes to set the category explicitly. The prefix is stripped from the published changelog entry.

| Prefix        | Category       |
| ------------- | -------------- |
| `Added:`      | **Added**      |
| `Fixed:`      | **Fixed**      |
| `Changed:`    | **Changed**    |
| `Deprecated:` | **Deprecated** |
| `Removed:`    | **Removed**    |
| `Security:`   | **Security**   |
| `Internal:`   | **Internal**   |

The prefix should also guide your choice of bump type:

- `Added:` → `minor` (new functionality)
- `Deprecated:` → `minor` (signals upcoming removal; consumers need to act)
- `Changed:` → `major`, `minor`, or `patch` depending on impact (breaking behaviour change, non-breaking behaviour change, or cosmetic tweak)
- `Fixed:` / `Security:` / `Internal:` → `patch`
- `Removed:` → `major` (breaking change)

### Fallback (no prefix)

If your summary has no recognised prefix, the category is inferred from the semver bump type:

| Bump type | Default category |
| --------- | ---------------- |
| `major`   | **Removed**      |
| `minor`   | **Added**        |
| `patch`   | **Fixed**        |

The fallback is correct for the majority of changes. Use an explicit prefix when the inferred category would mislead readers (for example, a `patch` bump that documents a `change:` rather than a bug fix).

## When to Add a Changeset

Add a changeset for:

- ✅ New components or features
- ✅ Bug fixes
- ✅ Breaking changes
- ✅ Enhancements to existing components
- ✅ Deprecations
- ✅ New or updated codemods

For PRs with no user-facing change, use an empty changeset to make the intent explicit (see [Enforcement](#enforcement)):

- ❌ Documentation-only changes (outside of component stories, which don't affect the published package)
- ❌ Test-only changes
- ❌ Internal refactors with no user-facing impact

PRs that only touch dot-directory paths (e.g. `.github/`, `.husky/`) pass the gate automatically without a changeset — see [Enforcement](#enforcement) for why.

## Enforcement

The gate is the `.husky/pre-push` hook, which runs `yarn changeset status --since=<trunk>` before every push on a non-trunk branch. The trunk branch is read from `baseBranch` in `.changeset/config.json` (so the same hook works on `main`, `lts`, and any future maintenance branch).

`changeset status` exits non-zero when the package has changed since `<trunk>` but no changeset accounts for those changes. Files under dot-prefixed directories (`.github/`, `.husky/`, `.changeset/`, etc.) are invisible to Changesets, so a PR that only touches those paths passes without a changeset.

If your PR has no user-facing impact but does touch non-dot paths (e.g. `src/`, `scripts/`), create an empty changeset to make the intent explicit:

```bash
yarn changeset --empty
```

## Release Process

Changesets are automatically consumed during the release process:

1. When you merge changes to the trunk branch, CI creates or updates a `chore: version packages` PR
2. This PR aggregates all changesets, updates the version in `package.json`, generates `CHANGELOG.md`, and deletes the consumed changeset files
3. When the `chore: version packages` PR is merged, the package is automatically published to npm and Storybook is deployed to the production environment

### Pre-release modes

When in pre-release mode (see `pre.json`), all version bumps increment the prerelease number regardless of bump type (patch/minor/major). The bump type is recorded and applied when exiting pre-release mode.

To check the current mode:

```bash
cat .changeset/pre.json
```

To switch between modes:

```bash
# Enter a pre-release mode (e.g. beta, rc):
yarn changeset pre enter <tag>
# → versions become x.y.z-<tag>.0, x.y.z-<tag>.1, ...

# Exit pre-release mode (move to stable):
yarn changeset pre exit
# → next version follows normal semver based on accumulated bump types
```

#### Switching pre-release tags (e.g. beta → rc)

Changesets does not reset the pre-release counter when switching tags. Running `pre exit` then `pre enter <new-tag>` while `package.json` is at `5.0.0-beta.95` would produce `5.0.0-rc.96` instead of `5.0.0-rc.1`.

To switch correctly:

1. Exit the current pre-release mode:

   ```bash
   yarn changeset pre exit
   ```

2. Re-enter with the new tag:

   ```bash
   yarn changeset pre enter <new-tag>
   ```

3. Manually set the `package.json` version to `x.y.z-<new-tag>.0` (e.g. `5.0.0-rc.0`). Do not run `yarn changeset version` — let CI handle that.

4. Commit and push. When CI runs `changeset version`, it will produce `x.y.z-<new-tag>.1`.

   > The first published version will be `x.y.z-<new-tag>.1`, not `.0`, since Changesets increments the counter from the current `package.json` version.

For more information, see the [Changesets documentation](https://github.com/changesets/changesets).
