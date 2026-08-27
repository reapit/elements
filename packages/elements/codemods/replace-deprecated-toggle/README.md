---
description: Replaces deprecated Toggle with Switch from core/switch
---

# Replace Deprecated Toggle Codemod

Automates migration from the deprecated `Toggle` component to the stable `Switch` component from `core/switch`.

The codemod rewrites imports, type references, and JSX usage. It extracts text from the first `ElToggleItem` child and converts it to a `label` prop on `Switch`. When no label text can be extracted, it inserts an `aria-label="TODO: add accessible label"` placeholder.

`ToggleRadio` is not migrated by this codemod. See `replace-deprecated-toggle-radio`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-toggle

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`Toggle` rendered a checkbox-style toggle using child `ElToggleItem` elements as its on/off labels. `Switch` provides the same behaviour using a single `label` prop and a native `<input type="checkbox" role="switch">` internally, with built-in accessible labelling.

The following deprecated symbols have been removed:

- `ToggleProps` — superseded by `Switch.Props`
- `ToggleWrapped` — internal type, no equivalent
- `ElToggleItem`, `ElToggleCheckbox`, `ElToggleLabel` — internal styled components
- `elToggleFullWidth`, `elHasGreyBg` — internal CSS class names
- `handleKeyboardToggleChange` — accessibility is handled internally by `Switch`

## Transformations

### Import rewrites

| Current import                 | Rewritten import               |
| ------------------------------ | ------------------------------ |
| `@reapit/elements`             | `@reapit/elements/core/switch` |
| `@company/ui` (facade package) | `@company/ui` (unchanged)      |

### Symbol rewrites

| Before                       | After          | Notes                                     |
| ---------------------------- | -------------- | ----------------------------------------- |
| `Toggle`                     | `Switch`       |                                           |
| `ToggleProps`                | `Switch.Props` | Import removed; type references rewritten |
| `ToggleWrapped`              | _(removed)_    | Internal type                             |
| `ElToggleItem`               | _(removed)_    | Internal styled component                 |
| `ElToggleCheckbox`           | _(removed)_    | Internal styled component                 |
| `ElToggleLabel`              | _(removed)_    | Internal styled component                 |
| `elToggleFullWidth`          | _(removed)_    | Internal CSS class name                   |
| `elHasGreyBg`                | _(removed)_    | Internal CSS class name                   |
| `handleKeyboardToggleChange` | _(removed)_    | Handled internally by `Switch`            |

### JSX rewrites — with text labels

When a `Toggle` element has `ElToggleItem` children containing text, the codemod converts to a self-closing `Switch` with the first item's text as the `label` prop.

**Before:**

```tsx
<Toggle id="x">
  <ElToggleItem>On</ElToggleItem>
  <ElToggleItem>Off</ElToggleItem>
</Toggle>
```

**After:**

```tsx
<Switch id="x" label="On" />
```

### JSX rewrites — switch style (empty children)

When `ElToggleItem` children are self-closing (no text content), the codemod cannot extract a label. An `aria-label` placeholder is inserted instead.

**Before:**

```tsx
<Toggle id="x">
  <ElToggleItem />
  <ElToggleItem />
</Toggle>
```

**After:**

```tsx
<Switch id="x" aria-label="TODO: add accessible label" />
```

### JSX rewrites — self-closing

Self-closing `Toggle` elements receive an `aria-label` placeholder.

**Before:**

```tsx
<Toggle id="x" />
```

**After:**

```tsx
<Switch id="x" aria-label="TODO: add accessible label" />
```

### JSX rewrites — dynamic label content

When the first `ElToggleItem` contains a JSX expression, the expression is preserved in a `label` prop.

**Before:**

```tsx
<Toggle id="x">
  <ElToggleItem>{labelText}</ElToggleItem>
  <ElToggleItem>Off</ElToggleItem>
</Toggle>
```

**After:**

```tsx
<Switch id="x" label={labelText} />
```

### Removed props

`hasGreyBg` and `isFullWidth` are removed from the output. `Switch` has no direct equivalents.

## Limitations

- **`ToggleRadio` is not migrated**: `ToggleRadio` is handled by the separate `replace-deprecated-toggle-radio` codemod.
- **Toggle shows two labels; Switch shows one**: the codemod extracts only the first `ElToggleItem`'s text. Review whether the extracted label accurately represents the toggle's purpose.
- **`hasGreyBg` has no equivalent**: `Switch` does not support a grey background variant. Remove any custom grey background styling or apply it via a CSS class.
- **`isFullWidth` has no equivalent**: pass `style={{ width: '100%' }}` or a CSS class if full-width behaviour is required.
- **Direct styled component usage requires manual migration**: `ElToggleItem`, `ElToggleCheckbox`, and `ElToggleLabel` used outside `Toggle` children are not automatically migrated.
- **Complex JSX inside `ElToggleItem` produces a fragment wrapper**: when `ElToggleItem` contains multiple children or nested elements, the `label` prop will be `label={<>...</>}`. Review these cases.
- **`handleKeyboardToggleChange` call sites are not removed**: the import is removed, but any call sites in the file remain and will produce a TypeScript error. Remove them manually.
- **Non-`ElToggleItem` children are silently dropped**: when a `Toggle` element contains children other than `ElToggleItem` elements (e.g., wrapping layout elements or conditional expressions), those children are discarded during conversion to a self-closing `<Switch />`. Review the output if your `Toggle` had non-standard children.
- **Re-exports are not rewritten**: `export { Toggle } from '…'` declarations are left unchanged and require manual migration.
