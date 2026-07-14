---
description: Migrates FocusedLayout.Content to isFullBleed with a nested MainContainer
---

# FocusedLayout.Content Full Bleed Codemod

Automates migrating `FocusedLayout.Content` off its deprecated default padding and maximum width by
adding the `isFullBleed` prop and nesting a `MainContainer` inside it.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info focused-layout-content-full-bleed

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply focused-layout-content-full-bleed src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply focused-layout-content-full-bleed src/ --dry-run
```

## Background

`FocusedLayout.Content` used to apply responsive padding and a 1200px maximum width
unconditionally. This default is deprecated: passing `isFullBleed` removes both, on the
expectation that a nested `MainContainer` supplies its own padding and width constraint instead.

`MainContainer`'s `wide` size has a 1200px maximum width, matching the deprecated default exactly,
so this codemod nests a `MainContainer size="wide"` inside every migrated `FocusedLayout.Content`
to keep the rendered layout unchanged.

## Transformations

| Before                                                                              | After                                                                                                                                  |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `<FocusedLayout.Content><Form /></FocusedLayout.Content>`                           | `<FocusedLayout.Content isFullBleed><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>`                       |
| `<FocusedLayoutContent><Form /></FocusedLayoutContent>` (direct import)             | Same transformation, using the element's local alias                                                                                   |
| `<FocusedLayout.Content isFullBleed>...</FocusedLayout.Content>`                    | _(unchanged — already migrated)_                                                                                                       |
| `<FocusedLayout.Content isFullBleed={false}>...</FocusedLayout.Content>`            | _(unchanged — explicit opt-out, review manually)_                                                                                      |
| `<FocusedLayout.Content><MainContainer>...</MainContainer></FocusedLayout.Content>` | `isFullBleed` added; the existing `MainContainer` is not duplicated                                                                    |
| `<FocusedLayout.Content />` (self-closing, no children)                             | _(unchanged — nothing to wrap)_                                                                                                        |
| `<FocusedLayout.Content {...contentProps}><Form /></FocusedLayout.Content>`         | `isFullBleed` added and children wrapped as normal, plus a `// TODO` comment above the statement flagging the spread for manual review |

If `MainContainer` is not already imported, an import from `@reapit/elements/core/main-container`
is added. If it is already imported (including under a local alias), the existing local name is
reused instead of adding a duplicate import. An existing type-only import
(`import type { MainContainer }` or `import { type MainContainer }`) is promoted to a value import
rather than treated as already satisfying the need for one.

## Limitations

- **Namespace aliasing** — If `FocusedLayout` itself is imported under an alias (e.g.
  `import { FocusedLayout as FL } from ...`), usages like `<FL.Content>` are not matched. Only the
  literal `FocusedLayout.Content` tag and direct `FocusedLayoutContent` imports (including their
  local aliases) are transformed.
- **`isFullBleed={false}`** — Left untouched since it is an explicit choice to keep the deprecated
  behaviour. Review these manually once the deprecated behaviour is removed.
- **Self-closing elements** — `<FocusedLayout.Content />` has no children, so there is nothing to
  wrap in a `MainContainer`. These are left untouched.
- **Spread attributes** — A spread (e.g. `{...contentProps}`) is opaque to static analysis, so the
  codemod cannot tell whether it already sets `isFullBleed`. The `isFullBleed` prop this codemod adds
  is placed before any spread in the opening tag, so if the spread also sets `isFullBleed`, the
  spread wins at runtime. The element is still transformed, but a `// TODO` comment is added above
  the statement — review these manually.
- **Formatting** — Run your project's formatter (e.g. Prettier) after applying this codemod; the
  inserted `MainContainer` tags are not re-indented.
- **Facade packages are not supported** — This codemod only matches imports from `@reapit/elements`
  directly.

## Next Steps After Running This Codemod

1. **Run your formatter** — Tidy up indentation around the newly nested `MainContainer`.
2. **Run tests** — Verify your application still renders correctly.
3. **Review `isFullBleed={false}` usages** — These were left untouched and may need manual attention.
4. **Review `// TODO` comments** — Each element with a spread attribute is flagged; confirm the
   spread does not set `isFullBleed` back to a different value.
5. **Commit changes** — Commit the migration as a single atomic change.
