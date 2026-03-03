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

   _Note: In prerelease mode, all bump types increment the prerelease number regardless of type (e.g. `5.0.0-beta.76 → 5.0.0-beta.77`). The bump type is recorded and applied when exiting prerelease mode._

2. **Write a summary of your changes**
   - Be concise but descriptive
   - Focus on the "what" and "why" for users
   - Examples:
     - ✅ "Added `Combobox.Card` component for card-based display of selected options"
     - ✅ "Fixed `Drawer` sizing on small viewports"
     - ❌ "Updated code" (too vague)
     - ❌ "Changed line 42 in button.tsx" (too technical)

The changeset will be saved as a markdown file in `.changeset/` and should be committed with your changes.

## When to Add a Changeset

Add a changeset for:

- ✅ New components or features
- ✅ Bug fixes
- ✅ Breaking changes
- ✅ Enhancements to existing components
- ✅ Deprecations
- ✅ New or updated codemods

For PRs with no user-facing change, use an empty changeset to make the intent explicit (see [CI Enforcement](#ci-enforcement)):

- ❌ Documentation-only changes (outside of component stories, which don't affect the published package)
- ❌ Test-only changes
- ❌ Internal refactors with no user-facing impact

PRs that only touch dot-directory paths (e.g. `.github/`, `.husky/`) pass CI automatically without a changeset — see [CI Enforcement](#ci-enforcement) for why.

## CI Enforcement

All PRs are checked for a changeset via `yarn changeset status --since=origin/main`. Files under dot-prefixed directories (`.github/`, `.husky/`, `.changeset/`, etc.) are not considered by the check, so a PR that only touches those paths will pass without a changeset.

Any change outside a dot-prefixed directory is treated as a package change, and the check will fail unless a changeset is present. If your PR has no user-facing impact but does touch non-dot paths (e.g. `src/`, `scripts/`), create an empty changeset to make the intent explicit:

```bash
yarn changeset --empty
```

## Release Process

Changesets are automatically consumed during the release process:

1. When you merge changes to `main`, CI creates or updates a `chore: version packages` PR
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

For more information, see the [Changesets documentation](https://github.com/changesets/changesets).
