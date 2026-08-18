---
description: Upgrades DeprecatedTag and DeprecatedTagGroup to the new Tag and TagGroup components for v5 API adoption
---

# Upgrade Deprecated Tag Codemod

Automates upgrading from `DeprecatedTag` and `DeprecatedTagGroup` to the new `Tag` and `TagGroup` components introduced in Reapit Elements v5. This codemod transforms imports, type references, and JSX elements to use the new API.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-tag

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-tag src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-tag src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-tag src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-tag src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so a base package name matches all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-tag src/ --facade-package @company/design-system
```

With a facade package, `Tag` and `TagGroup` stay at the same specifier rather than moving to a subpath:

```tsx
// Before (with facade package @company/ui)
import { DeprecatedTag, DeprecatedTagGroup } from "@company/ui/elements";

// After running with --facade-package @company/ui
import { Tag, TagGroup } from "@company/ui/elements";
```

## Background

Reapit Elements v5 introduced new `Tag` and `TagGroup` components with redesigned APIs. The v4 components were preserved as `DeprecatedTag` and `DeprecatedTagGroup` to allow gradual migration.

The key API differences are:

| Aspect           | DeprecatedTag / DeprecatedTagGroup | New Tag / TagGroup                                             |
| ---------------- | ---------------------------------- | -------------------------------------------------------------- |
| **Import path**  | `@reapit/elements`                 | `@reapit/elements/core/tag`, `@reapit/elements/core/tag-group` |
| **Type pattern** | `DeprecatedTagProps`               | `Tag.Props` (namespace)                                        |
| **Colour prop**  | `intent` (optional)                | Removed — no colour/intent equivalent                          |
| **Group child**  | `<DeprecatedTag>` inside group     | `<TagGroup.Item>` (compound component)                         |

## Transformations

### Import Transformations

| Before                                                         | After                                                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `import { DeprecatedTag } from '@reapit/elements'`             | `import { Tag } from '@reapit/elements/core/tag'`                                                |
| `import { DeprecatedTag as MyTag } from '@reapit/elements'`    | `import { Tag as MyTag } from '@reapit/elements/core/tag'`                                       |
| `import { type DeprecatedTag } from '@reapit/elements'`        | `import { type Tag } from '@reapit/elements/core/tag'`                                           |
| `import { DeprecatedTag, Input } from '@reapit/elements'`      | `import { Input } from '@reapit/elements'`<br/>`import { Tag } from '@reapit/elements/core/tag'` |
| `import { DeprecatedTagGroup } from '@reapit/elements'`        | `import { TagGroup } from '@reapit/elements/core/tag-group'`                                     |
| `import { DeprecatedTagProps } from '@reapit/elements'`        | _(removed — type rewritten to `Tag.Props`)_                                                      |
| `import { ElDeprecatedTag } from '@reapit/elements'`           | _(removed — manual migration required)_                                                          |
| `import { ElDeprecatedTagGroup } from '@reapit/elements'`      | _(removed — manual migration required)_                                                          |
| `import { ElDeprecatedTagGroupInner } from '@reapit/elements'` | _(removed — manual migration required)_                                                          |

### Import Splitting

The codemod produces separate imports based on usage:

- **Standalone tags only** — imports `Tag` from `@reapit/elements/core/tag`
- **Grouped tags only** — imports `TagGroup` from `@reapit/elements/core/tag-group` (no `Tag` import needed; `TagGroup.Item` is a compound component)
- **Both** — imports `Tag` from `core/tag` and `TagGroup` from `core/tag-group`

### Type Transformations

| Before                                         | After                                 |
| ---------------------------------------------- | ------------------------------------- |
| `const props: DeprecatedTagProps = {...}`      | `const props: Tag.Props = {...}`      |
| `interface MyProps extends DeprecatedTagProps` | `interface MyProps extends Tag.Props` |
| `type MyType = Partial<DeprecatedTagProps>`    | `type MyType = Partial<Tag.Props>`    |

### JSX — Standalone DeprecatedTag → Tag

Standalone `DeprecatedTag` elements (those not inside a `DeprecatedTagGroup`) become `Tag`. The `intent` prop is removed because the new component has no colour/intent equivalent. A TODO comment marks each conversion for manual review:

```tsx
// Before
<DeprecatedTag intent="primary">Active</DeprecatedTag>;

// After
{
  /* TODO: Standalone DeprecatedTag migrated to Tag — verify this is correct */
}
{
  /* TODO: intent prop removed — the new Tag and TagGroup.Item have no colour/intent equivalent */
}
<Tag>Active</Tag>;
```

When no `intent` prop is present, only the standalone migration TODO appears.

### JSX — DeprecatedTag inside DeprecatedTagGroup → TagGroup.Item

Tags inside a group become `TagGroup.Item`, the idiomatic compound-component API. No standalone TODO is inserted; an intent TODO appears only when `intent` was explicitly set:

```tsx
// Before
<DeprecatedTagGroup>
  <DeprecatedTag intent="success">Label</DeprecatedTag>
  <DeprecatedTag>Other</DeprecatedTag>
</DeprecatedTagGroup>

// After
<TagGroup>
  {/* TODO: intent prop removed — the new Tag and TagGroup.Item have no colour/intent equivalent */}
  <TagGroup.Item>Label</TagGroup.Item>
  <TagGroup.Item>Other</TagGroup.Item>
</TagGroup>
```

### JSX — DeprecatedTagGroup → TagGroup

`DeprecatedTagGroup` elements are renamed to `TagGroup`:

```tsx
// Before
<DeprecatedTagGroup>...</DeprecatedTagGroup>

// After
<TagGroup>...</TagGroup>
```

## Limitations

- **Styled component imports** — `ElDeprecatedTag`, `ElDeprecatedTagGroup`, and `ElDeprecatedTagGroupInner` imports are removed automatically, but usages in JSX or style composition require manual migration.

- **No colour/intent mapping** — Unlike the badge codemod, the `intent` prop is removed entirely because the new `Tag` component has no equivalent. Review each TODO comment to determine whether visual differentiation is still needed.

- **Aliased imports** — The codemod preserves import aliases (e.g. `DeprecatedTag as T`). JSX elements using the alias keep their local name; only the import binding changes.

## Next Steps After Running This Codemod

1. **Run tests** — Verify your application still works correctly.
2. **Review TODO comments** — Each standalone migration and intent removal is marked with a TODO; confirm the conversion is appropriate.
3. **Migrate styled components** — If you used `ElDeprecatedTag` or related exports directly, replace them with the corresponding styled exports from the new components.
4. **Commit changes** — Commit the migration as a single atomic change.
