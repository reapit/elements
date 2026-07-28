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

**One changeset per logical change.** If a PR introduces multiple unrelated user-facing changes, create one file per change. A single file must cover exactly one change and carry exactly one prefix.

Bad — one file covering an addition and two unrelated API changes:

```md
---
"@reapit/elements": major
---

Added: `Foo` component.

Changed: `Bar` prop renamed from `x` to `y`.

Changed: `Baz` now accepts `string[]` instead of `string`.
```

Good — three separate files, each scoped to its own change:

`add-foo-component.md`

```md
---
"@reapit/elements": minor
---

Added: `Foo` component.
```

`change-bar-prop-rename.md`

```md
---
"@reapit/elements": major
---

Changed: `Bar` prop renamed from `x` to `y`.
```

`change-baz-accepts-array.md`

```md
---
"@reapit/elements": major
---

Changed: `Baz` now accepts `string[]` instead of `string`.
```

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

When a PR has multiple changesets, give each file a name that makes the scope of that specific change clear in isolation. Avoid catch-all names that bundle several changes.

Good names:

- `add-image-utility-component.md`
- `remove-deprecated-badge.md`
- `fix-drawer-sizing-small-viewports.md`
- `inputs-support-aria-invalid.md`

Avoid:

- `frank-eyes-learn.md` (random, uninformative)
- `update.md` (too vague)
- `update-foo-bar-baz.md` (bundles multiple changes)

Create the file manually rather than relying on the CLI's auto-naming:

```bash
# Create the file directly
touch .changeset/your-descriptive-name.md
```

Or run the CLI and rename the generated file before committing.

## File format

```md
---
"@reapit/elements": <bump-type>
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

**Pre-release mode:** When the repo is in pre-release mode (check `pre.json` for the current tag), all bump types increment the prerelease counter (e.g. `x.y.z-<tag>.0 → x.y.z-<tag>.1`). The bump type is still recorded and applied when exiting pre-release mode — choose it correctly regardless.

To switch between pre-release tags (e.g. beta → rc), follow the process in `.changeset/README.md` under "Switching pre-release tags". Do not simply run `pre exit` then `pre enter <new-tag>` without also manually updating `package.json` — Changesets does not reset the pre-release counter when the tag changes.

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

### What to leave out

These categories of detail feel relevant when you are close to the implementation, but they belong in a PR description or commit message — not the changelog.

**Root-cause explanations.** Describe what the consumer experiences, not why it happened internally.

Bad:

> Fixed: `ChipSelectControl` text overflow now works correctly. The `FormControl` fieldset's implicit `min-width: min-content` was preventing chips from shrinking, so long text could not truncate or wrap as expected.

Good:

> Fixed: `ChipSelectControl` text overflow and truncation now work correctly.

**Exhaustive internal symbol lists.** For removals, name the exports a consumer would actually import. Omit internal constants, styled-element names, and context objects unless they were part of the documented public API.

Bad:

> Removed `useMediaQuery`, `MediaType`, `MediaStateContext`, `MediaStateProvider`, `MOBILE_BREAKPOINT`, `TABLET_BREAKPOINT`, `DESKTOP_BREAKPOINT`, `WIDESCREEN_BREAKPOINT`, and `SUPER_WIDESCREEN_BREAKPOINT` from `src/deprecated/use-media-query`.

Good:

> Removed: the deprecated `useMediaQuery` hook and related exports. Use the `upgrade-deprecated-use-media-query` codemod to migrate usages automatically.

**CSS and build implementation details.** Never mention `display: grid`, CSS custom property structure, Rolldown parallelism, file glob patterns, bundle size, or other build or style internals. If a token is renamed in a way that requires consumer action, say what to update — not how the internals are restructured.

Bad:

> `ButtonGroup` now uses `display: grid` internally. `autoFlow` maps to `grid-auto-flow`; `justifyContent` maps to `justify-content`.

Good:

> Added: `autoFlow` and `justifyContent` props to `ButtonGroup`.

**Manual migration paths that expose implementation mechanics.** If a codemod exists, reference only the codemod. If no codemod exists and manual migration is unavoidable, describe what to change — not how the underlying mechanism works.

Bad:

> To migrate, replace usages with an inline `useEffect` that implements equivalent `AbortController`/`mousedown` logic.

Good:

> Run the `inline-use-click-outside` codemod to migrate automatically.

### Migration instructions

For breaking changes, include migration guidance in the summary. If a codemod exists, mention it by name.

```md
---
"@reapit/elements": major
---

Removed: `DeprecatedBadge`, `DeprecatedBadgeGroup`, and related exports from `src/deprecated/badge`. Run the `upgrade-deprecated-badge` codemod to migrate.
```

For `Changed:` entries that break existing usage, describe the old behaviour and the new behaviour so consumers know what to update.

## Complete examples

**Patch — bug fix, no prefix needed:**

```md
---
"@reapit/elements": patch
---

Fix icon spacing in deprecated `Snack` and `TableCell` components after `DeprecatedIcon` removal
```

**Minor — new feature with prefix:**

```md
---
"@reapit/elements": minor
---

Added: `Image` utility component. Supports fallback UI. On load failure, `Image` announces fallback text for meaningful images and keeps decorative images non-announcing.
```

**Minor — new prop:**

```md
---
"@reapit/elements": minor
---

Added: `whiteSpace` prop to `LineClamp`, supporting `normal`, `pre-line`, and `pre-wrap` values to control whitespace handling for static copy and user-authored API text.
```

**Major — breaking API change:**

```md
---
"@reapit/elements": major
---

Changed: `useDrawerContext` now returns `DrawerContext.Value | null` instead of throwing when called outside a `Drawer`.
```

**Major — removal with codemod:**

```md
---
"@reapit/elements": major
---

Changed: Move `Combobox` from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`. The component is also available from the `@reapit/elements/utils` barrel. Run the `rewrite-combobox-imports` codemod to migrate automatically.
```

**Minor — deprecation:**

```md
---
"@reapit/elements": minor
---

Deprecated: `SplitButton` from `@reapit/elements/core/split-button`. Use `ButtonGroup` instead. Run the `upgrade-deprecated-split-button` codemod to migrate.
```

## Quick checklist

Before committing a changeset:

- [ ] File is in `.changeset/` with a descriptive kebab-case name
- [ ] This file covers exactly one user-facing change (split into multiple files if not)
- [ ] Frontmatter has `'@reapit/elements': <patch|minor|major>`
- [ ] Bump type matches the impact (breaking → `major`, new feature → `minor`, fix → `patch`)
- [ ] Prefix is one of `Added:`, `Fixed:`, `Changed:`, `Deprecated:`, `Removed:`, `Security:`, or `Internal:` — not `Feat:`, `Fix:`, `Add`, or other variants
- [ ] If the prefix is omitted, the inferred category is correct (`major` → Removed, `minor` → Added, `patch` → Fixed)
- [ ] Component and prop names are in backticks
- [ ] For breaking changes with a codemod, the codemod is mentioned by name
- [ ] British English spelling throughout
- [ ] No needless words
