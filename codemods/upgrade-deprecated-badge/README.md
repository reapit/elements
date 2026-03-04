---
description: Upgrades DeprecatedBadge to the new Badge component for v5 API adoption
---

# Upgrade Deprecated Badge Codemod

Automates upgrading from `DeprecatedBadge` to the new `Badge` component introduced in Reapit Elements v5. This codemod transforms imports, type references, and JSX elements to use the new Badge API.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-badge

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so a base package name matches all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-badge src/ --facade-package @company/design-system
```

With a facade package, `Badge` is imported from the bare facade specifier rather than a subpath:

```tsx
// Before (with facade package @company/ui)
import { DeprecatedBadge } from '@company/ui/elements'

// After running with --facade-package @company/ui
import { Badge } from '@company/ui'
```

## Background

Reapit Elements v5 introduced a new `Badge` component with a redesigned API. The v4 badge component was preserved as `DeprecatedBadge` to allow gradual migration.

The key API differences are:

| Aspect           | DeprecatedBadge          | New Badge                                |
| ---------------- | ------------------------ | ---------------------------------------- |
| **Import path**  | `@reapit/elements`       | `@reapit/elements/core/badge`            |
| **Type pattern** | `DeprecatedBadgeProps`   | `Badge.Props` (namespace)                |
| **Colour prop**  | `intent` (optional)      | `colour` (required)                      |
| **Status role**  | Implicit `role="status"` | Not implicit — add manually where needed |

## Transformations

### Import Transformations

| Before                                                           | After                                                                                                |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `import { DeprecatedBadge } from '@reapit/elements'`             | `import { Badge } from '@reapit/elements/core/badge'`                                                |
| `import { DeprecatedBadge as MyBadge } from '@reapit/elements'`  | `import { Badge as MyBadge } from '@reapit/elements/core/badge'`                                     |
| `import { type DeprecatedBadge } from '@reapit/elements'`        | `import { type Badge } from '@reapit/elements/core/badge'`                                           |
| `import { DeprecatedBadge, Input } from '@reapit/elements'`      | `import { Input } from '@reapit/elements'`<br/>`import { Badge } from '@reapit/elements/core/badge'` |
| `import { DeprecatedBadgeProps } from '@reapit/elements'`        | _(removed — type rewritten to `Badge.Props`)_                                                        |
| `import { DeprecatedBadgeGroup } from '@reapit/elements'`        | _(removed — JSX rewritten to `<div>`)_                                                               |
| `import { ElDeprecatedBadge } from '@reapit/elements'`           | _(removed — manual migration required)_                                                              |
| `import { ElDeprecatedBadgeGroup } from '@reapit/elements'`      | _(removed — manual migration required)_                                                              |
| `import { ElDeprecatedBadgeGroupInner } from '@reapit/elements'` | _(removed — manual migration required)_                                                              |

### Type Transformations

| Before                                           | After                                   |
| ------------------------------------------------ | --------------------------------------- |
| `const props: DeprecatedBadgeProps = {...}`      | `const props: Badge.Props = {...}`      |
| `interface MyProps extends DeprecatedBadgeProps` | `interface MyProps extends Badge.Props` |
| `type MyType = Partial<DeprecatedBadgeProps>`    | `type MyType = Partial<Badge.Props>`    |

### JSX — DeprecatedBadge → Badge

The `intent` prop is renamed to `colour` and its value is mapped to the new colour vocabulary:

| Before                                    | After                                                                  |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `<DeprecatedBadge>`                       | `<Badge colour="neutral">`                                             |
| `<DeprecatedBadge intent="primary">`      | `<Badge colour="neutral">`                                             |
| `<DeprecatedBadge intent="neutral">`      | `<Badge colour="neutral">`                                             |
| `<DeprecatedBadge intent="success">`      | `<Badge colour="success">`                                             |
| `<DeprecatedBadge intent="pending">`      | `<Badge colour="pending">`                                             |
| `<DeprecatedBadge intent="warning">`      | `<Badge colour="warning">`                                             |
| `<DeprecatedBadge intent="danger">`       | `<Badge colour="danger">`                                              |
| `<DeprecatedBadge intent="default">`      | `<Badge colour="neutral">`                                             |
| `<DeprecatedBadge intent="secondary">`    | `<Badge colour="neutral">`                                             |
| `<DeprecatedBadge intent="critical">`     | `<Badge colour="danger">`                                              |
| `<DeprecatedBadge intent="low">`          | `<Badge colour="neutral">`                                             |
| `<DeprecatedBadge intent={dynamicValue}>` | `<Badge colour={dynamicValue}>` _(value not mapped — review manually)_ |

### JSX — DeprecatedBadgeGroup → div

`DeprecatedBadgeGroup` has no direct equivalent in the new API. The codemod replaces it with a `<div>` that approximates the original layout, and inserts a TODO comment to prompt manual review:

```tsx
// Before
;<DeprecatedBadgeGroup>
  <DeprecatedBadge intent="success">Active</DeprecatedBadge>
</DeprecatedBadgeGroup>

// After
{
  /* TODO: DeprecatedBadgeGroup has no core equivalent — review this layout */
}
;<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
  <Badge colour="success">Active</Badge>
</div>
```

## Limitations

- **Styled component imports** — `ElDeprecatedBadge`, `ElDeprecatedBadgeGroup`, and `ElDeprecatedBadgeGroupInner` imports are removed automatically, but usages in JSX or style composition require manual migration.

- **DeprecatedBadgeGroup layout** — The `<div>` replacement with inline styles approximates the deprecated layout. Review each instance to ensure it matches your design intent.

- **`role="status"` is not implicit on Badge** — The deprecated component rendered `role="status"` unconditionally. The new `Badge` does not. Add it manually where screen-reader announcements are required.

- **Dynamic `intent` expressions** — When `intent` is a variable or expression, the codemod renames the prop to `colour` but cannot map the value. Review each instance and update the value manually.

- **Deprecated intent values** — `secondary`, `critical`, and `low` are mapped automatically (`neutral`, `danger`, `neutral` respectively), but the mapping may not match the intended semantic in every context. Verify each case.

## Next Steps After Running This Codemod

1. **Run tests** — Verify your application still works correctly.
2. **Review TODO comments** — Each `DeprecatedBadgeGroup` conversion is marked with a TODO; adjust layout as needed.
3. **Add `role="status"` where required** — Search for newly created `<Badge>` elements used for live region announcements.
4. **Review dynamic `colour` props** — Search for `colour={` and confirm the runtime values are valid colour tokens.
5. **Migrate styled components** — If you used `ElDeprecatedBadge` or related exports directly, replace them with `ElBadge` from `@reapit/elements/core/badge`.
6. **Commit changes** — Commit the migration as a single atomic change.
