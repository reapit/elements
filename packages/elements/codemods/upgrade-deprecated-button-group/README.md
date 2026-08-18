---
description: Upgrades DeprecatedButtonGroup to the new ButtonGroup component for v5 API adoption
---

# Upgrade Deprecated Button Group Codemod

Automates upgrading from `DeprecatedButtonGroup` to the new `ButtonGroup` component introduced in Reapit Elements v5. This codemod transforms imports, type references, JSX elements, and the `alignment` prop to use the new ButtonGroup API.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-button-group

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button-group src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button-group src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button-group src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button-group src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button-group src/ --facade-package @company/design-system
```

With a facade package, `ButtonGroup` is imported from the bare facade specifier:

```tsx
// Before (with facade package @company/ui)
import { DeprecatedButtonGroup } from "@company/ui/elements";

// After running with --facade-package @company/ui
import { ButtonGroup } from "@company/ui";
```

## Background

Reapit Elements v5 introduced a new `ButtonGroup` component with a redesigned API. The v4 button group component was preserved as `DeprecatedButtonGroup` to allow gradual migration.

The key API differences are:

| Aspect           | DeprecatedButtonGroup           | New ButtonGroup                                                                          |
| ---------------- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| **Import path**  | `@reapit/elements`              | `@reapit/elements/core/button-group`                                                     |
| **Type pattern** | `DeprecatedButtonGroupProps`    | `ButtonGroup.Props` (namespace)                                                          |
| **Alignment**    | `alignment="left/right/center"` | `justifyContent="start/end/center"`                                                      |
| **Children**     | Any `ReactNode` (flat)          | Each button rendered as a `<ButtonGroup.Item>` (children left unchanged by this codemod) |
| **Size**         | Not supported                   | `size="small/medium/large"` (optional, via context)                                      |

## Transformations

### Import Transformations

| Before                                                                 | After                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `import { DeprecatedButtonGroup } from '@reapit/elements'`             | `import { ButtonGroup } from '@reapit/elements/core/button-group'`             |
| `import { DeprecatedButtonGroup as BtnGroup } from '@reapit/elements'` | `import { ButtonGroup as BtnGroup } from '@reapit/elements/core/button-group'` |
| `import { DeprecatedButtonGroupProps } from '@reapit/elements'`        | _(removed — type rewritten to `ButtonGroup.Props`)_                            |
| `import { DeprecatedButtonGroupAlignment } from '@reapit/elements'`    | _(removed — no equivalent, produces a TypeScript error)_                       |

### Type Transformations

| Before                                                 | After                                         |
| ------------------------------------------------------ | --------------------------------------------- |
| `const props: DeprecatedButtonGroupProps = {}`         | `const props: ButtonGroup.Props = {}`         |
| `interface MyProps extends DeprecatedButtonGroupProps` | `interface MyProps extends ButtonGroup.Props` |
| `type MyType = Partial<DeprecatedButtonGroupProps>`    | `type MyType = Partial<ButtonGroup.Props>`    |

### JSX — Element Rename

| Before                      | After             |
| --------------------------- | ----------------- |
| `<DeprecatedButtonGroup>`   | `<ButtonGroup>`   |
| `</DeprecatedButtonGroup>`  | `</ButtonGroup>`  |
| `<DeprecatedButtonGroup />` | `<ButtonGroup />` |

### JSX — `alignment` → `justifyContent`

| Before                                             | After                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| `<DeprecatedButtonGroup alignment="left">`         | `<ButtonGroup justifyContent="start">`                                    |
| `<DeprecatedButtonGroup alignment="right">`        | `<ButtonGroup justifyContent="end">`                                      |
| `<DeprecatedButtonGroup alignment="center">`       | `<ButtonGroup justifyContent="center">`                                   |
| `<DeprecatedButtonGroup alignment={dynamicValue}>` | `<ButtonGroup>` _(prop removed, TODO comment inserted — see Limitations)_ |

## Limitations

### `DeprecatedButtonGroupAlignment` type

`DeprecatedButtonGroupAlignment` has no equivalent in the new API. The import is removed automatically, but any usages of the type in your code will produce a TypeScript error that must be resolved manually.

### Dynamic `alignment` prop

When the `alignment` prop uses a dynamic value (a variable or expression), the codemod cannot determine the correct `justifyContent` value. The prop is removed and a TODO comment is inserted before the element:

```tsx
// Before
<DeprecatedButtonGroup alignment={myAlignment}>...</DeprecatedButtonGroup>;

// After
{
  /* TODO: DeprecatedButtonGroup had a dynamic alignment prop that cannot be migrated automatically */
}
<ButtonGroup>...</ButtonGroup>;
```

### Children passed as props or render props

When button children originate outside the component (via props, render props, or `React.Children`), the codemod has no visibility into them. Each case must be handled manually.

## Running Alongside `upgrade-deprecated-button`

If your codebase uses both `DeprecatedButton` and `DeprecatedButtonGroup`, run both codemods independently:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button src/
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-button-group src/
```

The two codemods are independent and safe to run in either order.

## Next Steps After Running This Codemod

1. **Fix TypeScript errors** — Any remaining `DeprecatedButtonGroupAlignment` usages will produce errors. Remove or replace them manually.
2. **Review TODO comments** — Search for `TODO` in your codebase and address any dynamic `alignment` props that could not be migrated automatically.
3. **Run tests** — Verify your application still works correctly after the migration.
