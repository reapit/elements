# Changesets

This folder contains changesets - small markdown files that describe changes made to the package. Changesets are used to automatically version and publish the package, and generate the changelog.

## How to Add a Changeset

When you make changes to the codebase, you should add a changeset to describe your changes:

```bash
yarn changeset
```

This will prompt you to answer a few questions:

1. **What type of change is this?**
   - `patch` - Bug fixes, documentation updates, minor tweaks (5.0.0-beta.76 → 5.0.0-beta.77)
   - `minor` - New features, enhancements (5.0.0-beta.76 → 5.0.0-beta.77)
   - `major` - Breaking changes (5.0.0-beta.76 → 5.0.0-beta.77) _Note: In prerelease mode, all bumps increment the prerelease number_

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

You can skip a changeset for:

- ❌ Documentation-only changes (outside of component stories)
- ❌ Test-only changes
- ❌ CI / build configuration changes with no user-facing impact
- ❌ Internal refactors with no user-facing impact

## CI Enforcement

All PRs are required to introduce a changeset file via their own commits. This is enforced by checking whether any `.changeset/*.md` file appears in the diff between the PR branch and `main`:

```sh
git diff --name-only origin/main...HEAD | grep -q '^\.changeset/.*\.md$'
```

Unlike `changeset status --since=origin/main`, this check is not satisfied by changeset files introduced by other PRs — the current PR must add one itself.

If your PR has no user-facing impact, create an empty changeset to make that intent explicit:

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
