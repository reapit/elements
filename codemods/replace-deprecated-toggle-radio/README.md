---
description: Replaces deprecated ToggleRadio with ChipSelect from core/chip-select
---

# Replace Deprecated ToggleRadio Codemod

Automates migration from the deprecated `ToggleRadio` component to the stable `ChipSelect` component from `core/chip-select`.

The codemod rewrites imports, type references, and JSX usage. When `options` is an inline array literal, it expands the data-driven prop into declarative `<ChipSelect.Option>` children. When `options` is dynamic (a variable, function call, or spread), it inserts a TODO comment and renames the tag, leaving the options expansion for manual resolution.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-toggle-radio

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle-radio src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle-radio src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle-radio src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle-radio src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`ToggleRadio` rendered a list of radio-button-style toggle items from an `options` prop array. `ChipSelect` provides the same selection behaviour using a compound component API: a `<ChipSelect>` container wrapping declarative `<ChipSelect.Option>` children. The new component uses checkboxes internally and supports single-select (default) and multi-select (`multiple`) modes, accessible keyboard navigation, and a richer set of layout options.

The following deprecated symbols have been removed:

- `ToggleRadioProps` — superseded by `ChipSelect.Props`
- `ToggleRadioOption` — the `options` array structure has no equivalent; options are now JSX children
- `ToggleRadioWrapped` — internal type, no equivalent
- `ElToggleRadioWrap`, `ElToggleRadioItem`, `ElToggleRadioLabel`, `ElToggleRadio` — internal styled components
- `handleKeyboardToggleChange` — accessibility is handled internally by `ChipSelect`

## Transformations

### Import rewrites

| Current import                 | Rewritten import                    |
| ------------------------------ | ----------------------------------- |
| `@reapit/elements`             | `@reapit/elements/core/chip-select` |
| `@company/ui` (facade package) | `@company/ui` (unchanged)           |

### Symbol rewrites

| Before                       | After              | Notes                                     |
| ---------------------------- | ------------------ | ----------------------------------------- |
| `ToggleRadio`                | `ChipSelect`       |                                           |
| `ToggleRadioProps`           | `ChipSelect.Props` | Import removed; type references rewritten |
| `ToggleRadioOption`          | _(removed)_        | No equivalent; TODO comment inserted      |
| `ToggleRadioWrapped`         | _(removed)_        |                                           |
| `ElToggleRadioWrap`          | _(removed)_        | Internal styled component                 |
| `ElToggleRadioItem`          | _(removed)_        | Internal styled component                 |
| `ElToggleRadioLabel`         | _(removed)_        | Internal styled component                 |
| `ElToggleRadio`              | _(removed)_        | Internal styled component                 |
| `handleKeyboardToggleChange` | _(removed)_        | Handled internally by `ChipSelect`        |

### JSX rewrites — inline `options` array

When `options` is an inline array literal with statically resolvable `value` and `text` strings, the codemod expands the prop into `<ChipSelect.Option>` children:

**Before:**

```tsx
<ToggleRadio
  name="my-radio"
  options={[
    { id: "opt1", value: "a", text: "Option A", isChecked: true },
    { id: "opt2", value: "b", text: "Option B", isChecked: false },
    { id: "opt3", value: "c", text: "Option C", isChecked: false },
  ]}
/>
```

**After:**

```tsx
<ChipSelect name="my-radio">
  <ChipSelect.Option value="a" defaultChecked>
    Option A
  </ChipSelect.Option>
  <ChipSelect.Option value="b">Option B</ChipSelect.Option>
  <ChipSelect.Option value="c">Option C</ChipSelect.Option>
</ChipSelect>
```

#### Prop mapping

| `ToggleRadioOption` field | `ChipSelect.Option` prop | Notes                               |
| ------------------------- | ------------------------ | ----------------------------------- |
| `value`                   | `value`                  |                                     |
| `text`                    | children                 | Rendered as the option label text   |
| `isChecked: true`         | `defaultChecked`         | Uncontrolled initial selection      |
| `isChecked: false`        | _(omitted)_              | Default; no prop needed             |
| `id`                      | _(dropped)_              | `ChipSelect` manages IDs internally |

#### `disabled` propagation

A `disabled` prop on the `ToggleRadio` element is moved to each generated `<ChipSelect.Option>`:

**Before:**

```tsx
<ToggleRadio name="r" disabled options={[...]} />
```

**After:**

```tsx
<ChipSelect name="r">
  <ChipSelect.Option value="a" disabled>
    Option A
  </ChipSelect.Option>
  <ChipSelect.Option value="b" disabled>
    Option B
  </ChipSelect.Option>
</ChipSelect>
```

### JSX rewrites — dynamic `options`

When `options` is a variable, function call, spread, or any non-literal expression, the codemod renames the tag to `ChipSelect` and inserts a TODO comment. Manual conversion of the options array into `<ChipSelect.Option>` children is required.

**Before:**

```tsx
<ToggleRadio name="my-radio" options={myOptions} />
```

**After:**

```tsx
// TODO (DS-78): ToggleRadio `options` is dynamic — manually convert to <ChipSelect.Option> children. See: https://github.com/reapit/elements
<ChipSelect name="my-radio">
  {/* TODO (DS-78): convert dynamic `options` prop to <ChipSelect.Option> children */}
</ChipSelect>
```

### Removed props

`hasGreyBg` and `isFullWidth` are removed from the output. `ChipSelect` has no direct equivalents. When either prop is present, a TODO comment is inserted.

## Limitations

- **Dynamic `options` arrays require manual conversion** — any `options` value that is not an inline array literal with static `value` and `text` strings cannot be expanded automatically. Convert these to `<ChipSelect.Option>` children by hand.
- **`ToggleRadioOption` type annotations require manual update** — if you annotate variables with `ToggleRadioOption`, you must update those types manually. The codemod removes the import and inserts a TODO comment at each remaining reference.
- **`hasGreyBg` has no equivalent** — `ChipSelect` does not support a grey background variant. Review usage and apply custom styling if needed.
- **`isFullWidth` has no equivalent** — `ChipSelect` uses flex layout. Pass `style={{ width: '100%' }}` or a CSS class if full-width behaviour is needed.
- **Uncontrolled `isChecked` becomes `defaultChecked`** — the generated code uses `defaultChecked`. If you need controlled selection, use `ChipSelect.determineNextControlledState` and manage state in your component.
- **Partially-static options objects** — options objects where `value` or `text` cannot be statically determined (e.g., computed properties, shorthand property names) fall back to the dynamic options path and require manual conversion.
- **Re-exports are not rewritten** — `export { ToggleRadio } from '…'` declarations are left unchanged and require manual migration.
