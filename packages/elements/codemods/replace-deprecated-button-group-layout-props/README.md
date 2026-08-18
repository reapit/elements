---
description: Migrate deprecated ButtonGroup autoFlow and justifyContent props to orientation and align
---

# Replace deprecated ButtonGroup layout props

Migrates the deprecated `autoFlow` and `justifyContent` props on `ButtonGroup` to the new `orientation` and `align` props introduced in the ButtonGroup layout redesign.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-button-group-layout-props

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-button-group-layout-props src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-button-group-layout-props src/ --dry-run
```

## Background

`ButtonGroup` was originally built on CSS Grid, using `autoFlow` (maps to `grid-auto-flow`) and `justifyContent` (maps to `justify-content`) to control layout. The component has been redesigned to use Flexbox with a cleaner API:

- `orientation` replaces `autoFlow` with semantic values (`'horizontal'` / `'vertical'`)
- `align` replaces `justifyContent` with the same set of values (`'start'` / `'end'` / `'center'` / `'stretch'`)

Both deprecated props still work during the transition period but will be removed in a future major release.

## Transformations

| Before                                   | After                                    |
| ---------------------------------------- | ---------------------------------------- |
| `<ButtonGroup autoFlow="column">`        | `<ButtonGroup orientation="horizontal">` |
| `<ButtonGroup autoFlow="row">`           | `<ButtonGroup orientation="vertical">`   |
| `<ButtonGroup justifyContent="start">`   | `<ButtonGroup align="start">`            |
| `<ButtonGroup justifyContent="end">`     | `<ButtonGroup align="end">`              |
| `<ButtonGroup justifyContent="center">`  | `<ButtonGroup align="center">`           |
| `<ButtonGroup justifyContent="stretch">` | `<ButtonGroup align="stretch">`          |

## Limitations

**Dynamic `autoFlow` values** cannot be transformed automatically. If `autoFlow` is set to a variable or expression (e.g. `autoFlow={direction}`), the codemod leaves it unchanged. Migrate these manually:

```tsx
// Before
<ButtonGroup autoFlow={isVertical ? 'row' : 'column'}>

// After
<ButtonGroup orientation={isVertical ? 'vertical' : 'horizontal'}>
```
