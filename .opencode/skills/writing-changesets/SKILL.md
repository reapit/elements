---
name: writing-changesets
description: Write changesets for @reapit/elements using @changesets/cli. Use this skill whenever you finish a feature, bug fix, breaking change, deprecation, or codemod — or whenever a PR review asks for a changeset. Covers choosing the right semver bump, picking the correct changelog prefix, writing clear user-facing summaries, naming the file, and deciding when to use an empty changeset instead.
---

# Writing Changesets

This project uses [`@changesets/cli`](https://github.com/changesets/changesets) to version and publish `@reapit/elements`. Each changeset is a small Markdown file in `.changeset/` that records what changed and at what semver level.

## When to add a changeset

Add a changeset for any change that affects the published package:

- New components or features
- Bug fixes
- Breaking changes (removals, API renames, behaviour changes)
- Deprecations
- New or updated codemods

**Do not** add a changeset for:

- Documentation-only changes (outside component stories)
- Test-only changes
- Internal refactors with no user-facing impact

For PRs that touch non-dot paths but have no user-facing impact, create an **empty changeset** to signal intent:

```bash
yarn changeset --empty
```

PRs that only touch dot-prefixed directories (`.github/`, `.husky/`, `.changeset/`) pass CI without a changeset.

## File naming

Name the file after the change in kebab-case; the CLI generates a random `adjective-animal-verb` slug by default — override it.

Good names:

- `add-image-utility-component.md`
- `remove-deprecated-badge.md`
- `fix-drawer-sizing-small-viewports.md`
- `inputs-support-aria-invalid.md`

Avoid:

- `frank-eyes-learn.md` (random, uninformative)
- `update.md` (too vague)

Create the file manually rather than relying on the CLI's auto-naming:

```bash
# Create the file directly
touch .changeset/your-descriptive-name.md
```

Or run the CLI and rename the generated file before committing.

## File format

```md
---
'@reapit/elements': <bump-type>
---

<summary>
```

The only package in this repo is `@reapit/elements`. Do not add other package entries unless the repo gains a new independently versioned package.

## Choosing the bump type

| Bump type | When to use                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `patch`   | Bug fixes, security patches, internal fixes with no API change                       |
| `minor`   | New features, new props, new exports, deprecations                                   |
| `major`   | Breaking changes: removals, renames, behaviour changes that require consumer updates |

**Pre-release mode:** The repo is currently in beta (`pre.json` → `"mode": "pre"`). In pre-release mode, all bump types increment the prerelease counter (e.g. `5.0.0-beta.76 → 5.0.0-beta.77`). The bump type is still recorded and applied when exiting pre-release mode — choose it correctly regardless.

To check whether the repo is in pre-release mode:

```bash
cat .changeset/pre.json
```

## Writing the summary

The summary is the user-facing description of the change. It appears in `CHANGELOG.md` after the version is published.

### Prefix convention

Start the summary with one of these prefixes. The formatter strips the prefix and renders the category as a bold inline label — for example, `**[Fixed]**` — in the changelog entry.

| Prefix        | Changelog section | Typical bump                 |
| ------------- | ----------------- | ---------------------------- |
| `Added:`      | **Added**         | `minor`                      |
| `Fixed:`      | **Fixed**         | `patch`                      |
| `Changed:`    | **Changed**       | `major`, `minor`, or `patch` |
| `Deprecated:` | **Deprecated**    | `minor`                      |
| `Removed:`    | **Removed**       | `major`                      |
| `Security:`   | **Security**      | `patch`                      |
| `Internal:`   | **Internal**      | `patch`                      |

If you omit a prefix, the formatter infers the category from the bump type (`major` → Removed, `minor` → Added, `patch` → Fixed). Use a prefix when the inferred category would mislead readers.

### Summary rules

Write for the consumer, not the implementer.

- **Be specific.** Name the components, props, or exports affected.
- **Use backticks** for component names, prop names, hook names, and import paths.
- **Omit needless words.** One or two sentences is usually enough.
- **Use British English** — see the `writing-clear-prose` skill.
- **Use active voice.** "Added `X` component" not "An `X` component has been added".

Bad:

> Updated code

> Changed line 42 in button.tsx

Good:

> `Fixed: Correct Drawer sizing on small viewports`

> `Added: Image utility component. Supports fallback UI. On load failure, Image announces fallback text for meaningful images and keeps decorative images non-announcing.`

### Migration instructions

For breaking changes, include migration guidance in the summary. Reference codemods where available.

````md
---
'@reapit/elements': major
---

Removed: `DeprecatedBadge`, `DeprecatedBadgeGroup`, and related exports from `src/deprecated/badge`.

Run the `upgrade-deprecated-badge` codemod to migrate:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/
```
````

For `Changed:` entries that break existing usage, describe the old behaviour and the new behaviour so consumers know what to update.

## Complete examples

**Patch — bug fix, no prefix needed:**

```md
---
'@reapit/elements': patch
---

Fix icon spacing in deprecated `Snack` and `TableCell` components after `DeprecatedIcon` removal
```

**Minor — new feature with prefix:**

```md
---
'@reapit/elements': minor
---

Added: `Image` utility component. Supports fallback UI. On load failure, `Image` announces fallback text for meaningful images and keeps decorative images non-announcing.
```

**Minor — new prop:**

```md
---
'@reapit/elements': minor
---

Added: `whiteSpace` prop to `LineClamp`, supporting `normal`, `pre-line`, and `pre-wrap` values to control whitespace handling for static copy and user-authored API text.
```

**Major — breaking API change:**

```md
---
'@reapit/elements': major
---

Changed: `useDrawerContext` now returns `DrawerContext.Value | null` instead of throwing when called outside a `Drawer`.
```

**Major — removal with codemod:**

````md
---
'@reapit/elements': major
---

Changed: Move `Combobox` from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`.

The component is also available from the `@reapit/elements/utils` barrel. Run the `rewrite-combobox-imports` codemod to migrate automatically:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/
```
````

**Minor — deprecation:**

```md
---
'@reapit/elements': minor
---

Deprecated: `SplitButton` from `@reapit/elements/core/split-button`. Use `ButtonGroup` instead. Run the `upgrade-deprecated-split-button` codemod to migrate.
```

## Quick checklist

Before committing a changeset:

- [ ] File is in `.changeset/` with a descriptive kebab-case name
- [ ] Frontmatter has `'@reapit/elements': <patch|minor|major>`
- [ ] Bump type matches the impact (breaking → `major`, new feature → `minor`, fix → `patch`)
- [ ] Summary starts with the correct prefix, or omits it intentionally
- [ ] Component and prop names are in backticks
- [ ] Migration guidance is included for breaking changes
- [ ] British English spelling throughout
- [ ] No needless words
