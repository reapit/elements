---
description: Upgrades DeprecatedSplitButton to the new SplitButton component
---

# Upgrade Deprecated Split Button Codemod

Automates renaming deprecated split-button identifiers to their core equivalents. This codemod transforms imports, type references, and JSX elements but does not restructure JSX: that requires manual follow-up.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-deprecated-split-button

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-split-button src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-split-button src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-split-button src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-split-button src/ --facade-package @company/ui
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/ui
# - @company/ui/elements
# - @company/ui/deprecated/split-button
# - etc.
yarn dlx @reapit/elements@beta codemod apply upgrade-deprecated-split-button src/ --facade-package @company/ui
```

**Facade imports are handled differently from `@reapit/elements` imports.** Identifiers are renamed in-place and the module specifier is left unchanged:

```tsx
// Before (with facade package @company/ui)
import { DeprecatedSplitButton, DeprecatedActionButton } from "@company/ui/elements";

// After running with --facade-package @company/ui
import { SplitButton, SplitButtonAction } from "@company/ui/elements";
```

For `@reapit/elements` imports, specifiers are moved to the subpath import:

```tsx
// Before
import { DeprecatedSplitButton, Input } from "@reapit/elements";

// After
import { Input } from "@reapit/elements";
import { SplitButton } from "@reapit/elements/core/split-button";
```

## Background

Reapit Elements v5 introduced a redesigned `SplitButton` component with a declarative API. The deprecated split-button used an imperative children-based pattern with `DeprecatedSplitButton`, `DeprecatedActionButton`, and `DeprecatedMenuButton`. The new API uses `SplitButton` with `action` and `menu` props.

**Target audience**: Projects using `DeprecatedSplitButton`, `DeprecatedActionButton`, or `DeprecatedMenuButton` that are ready to migrate to the new SplitButton API.

**Migration strategy**: This codemod automates renaming identifiers in imports, type references, and JSX elements. It adds TODO comments to guide the manual JSX restructuring that the codemod cannot safely automate.

## Transformations

### Import Transformations

| Before                                                                   | After                                                                            |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `import { DeprecatedSplitButton } from '@reapit/elements'`               | `import { SplitButton } from '@reapit/elements/core/split-button'`               |
| `import { DeprecatedActionButton } from '@reapit/elements'`              | `import { SplitButtonAction } from '@reapit/elements/core/split-button'`         |
| `import { DeprecatedMenuButton } from '@reapit/elements'`                | `import { SplitButtonMenuButton } from '@reapit/elements/core/split-button'`     |
| `import { DeprecatedSplitButton as MySplitBtn } from '@reapit/elements'` | `import { SplitButton as MySplitBtn } from '@reapit/elements/core/split-button'` |
| `import { type DeprecatedSplitButton } from '@reapit/elements'`          | `import { type SplitButton } from '@reapit/elements/core/split-button'`          |
| `import { DeprecatedSplitButtonProps } from '@reapit/elements'`          | _(removed: type references become `SplitButton.Props`)_                          |

### Type Transformations

| Before                                                 | After                                         |
| ------------------------------------------------------ | --------------------------------------------- |
| `const props: DeprecatedSplitButtonProps = {...}`      | `const props: SplitButton.Props = {...}`      |
| `interface MyProps extends DeprecatedSplitButtonProps` | `interface MyProps extends SplitButton.Props` |
| `type MyType = Partial<DeprecatedSplitButtonProps>`    | `type MyType = Partial<SplitButton.Props>`    |

### JSX Element Transformations

| Before                           | After                     |
| -------------------------------- | ------------------------- |
| `<DeprecatedSplitButton>`        | `<SplitButton>`           |
| `<DeprecatedSplitButton.Action>` | `<SplitButton.Action>`    |
| `<DeprecatedSplitButton.Menu>`   | `<SplitButton.Menu>`      |
| `<DeprecatedActionButton>`       | `<SplitButtonAction>`     |
| `<DeprecatedMenuButton>`         | `<SplitButtonMenuButton>` |

### TODO Comments

The codemod adds a TODO comment above each `<SplitButton>` usage to guide manual restructuring:

```tsx
// TODO(upgrade-deprecated-split-button): Restructure to use the new SplitButton API.
// Children must be moved into `action` and `menu` props.
// `variant` and `size` (both required) must be set on <SplitButton> rather than sub-components.
// `variant="busy"` on sub-components maps to `busy="action"` or `busy="menu-item"` on the parent.
// <SplitButton.Menu> now requires `aria-label` and children (menu items).
<SplitButton>...</SplitButton>
```

## Limitations

This codemod renames identifiers but does **not** restructure JSX. The following require manual changes after running the codemod:

1. **JSX structural change**: The deprecated component used children-based composition. The new `SplitButton` requires `action` and `menu` props:

   ```tsx
   // Codemod output (needs manual restructuring)
   <SplitButton>
     <SplitButton.Action variant="primary">Save</SplitButton.Action>
     <SplitButton.Menu />
   </SplitButton>

   // Manual restructuring needed
   <SplitButton
     variant="primary"
     size="medium"
     action={<SplitButton.Action>Save</SplitButton.Action>}
     menu={
       <SplitButton.Menu aria-label="More actions">
         <Menu.Item>Option 1</Menu.Item>
       </SplitButton.Menu>
     }
   />
   ```

2. **Variant hoisting**: `variant` must be moved from sub-components to the parent `SplitButton`.

3. **Size prop**: `size` is required on the new `SplitButton` but was not present on the deprecated component. You must add it manually.

4. **Busy state mapping**: `variant="busy"` on sub-components maps to `busy="action"` or `busy="menu-item"` on the parent `SplitButton`.

5. **`aria-label` on `SplitButton.Menu`**: Required in the new component but not present on the deprecated `DeprecatedMenuButton`.

6. **Styled components**: References to `ElDeprecatedSplitButton`, `ElDeprecatedSplitButtonActionButton`, and `ElDeprecatedSplitButtonMenuButton` are not transformed. These must be updated manually.

7. **Dynamic props and spread operators**: Props set via spread or computed at runtime are not transformed.

8. **Test mocks**: Jest/Vitest mocks are not automatically updated.

## Key API Differences

| Aspect             | Deprecated                                                 | New                                                         |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------------------------- |
| **Import path**    | `@reapit/elements`                                         | `@reapit/elements/core/split-button`                        |
| **Main component** | `DeprecatedSplitButton` (children-based)                   | `SplitButton` (`action` + `menu` props)                     |
| **Action button**  | `DeprecatedActionButton` or `DeprecatedSplitButton.Action` | `SplitButton.Action` (via `action` prop)                    |
| **Menu button**    | `DeprecatedMenuButton` or `DeprecatedSplitButton.Menu`     | `SplitButton.Menu` (via `menu` prop, requires `aria-label`) |
| **Type pattern**   | `DeprecatedSplitButtonProps`                               | `SplitButton.Props` (namespace)                             |
| **Variant**        | Set on sub-components                                      | Set on parent `SplitButton`                                 |
| **Size**           | Not required                                               | Required (`"small"`, `"medium"`, `"large"`)                 |
| **Busy state**     | `variant="busy"` on sub-components                         | `busy="action"` or `busy="menu-item"` on parent             |

## Migration Checklist

- [ ] Run the codemod on your source directory
- [ ] Follow the TODO comments to restructure each `<SplitButton>` usage
- [ ] Add `variant` and `size` props to each `<SplitButton>`
- [ ] Move children into `action` and `menu` props
- [ ] Add `aria-label` to each `<SplitButton.Menu>`
- [ ] Map `variant="busy"` to `busy="action"` or `busy="menu-item"`
- [ ] Update styled component references manually
- [ ] Update test mocks if needed
- [ ] Run your test suite
- [ ] Test in your application
- [ ] Commit changes
