---
description: Migrate deprecated Avatar "small" and "medium" sizes to "sm" and "md"
---

# Replace deprecated Avatar sizes

Migrates the deprecated `"small"` and `"medium"` `size` values on `Avatar`, `AvatarButton`, and `AvatarAnchor` to their replacements, `"sm"` and `"md"`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-avatar-sizes

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-avatar-sizes src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-avatar-sizes src/ --dry-run
```

## Background

Avatar's `size` prop previously accepted `"small"` and `"medium"`. These have been deprecated in favour of `"sm"` and `"md"`, aligning with the rest of the sizing scale (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`). The deprecated values still work during the transition period but will be removed in a future major release.

## Transformations

| Before                   | After                |
| ------------------------ | -------------------- |
| `<Avatar size="small">`  | `<Avatar size="sm">` |
| `<Avatar size="medium">` | `<Avatar size="md">` |

The same mapping is applied to `AvatarButton` and `AvatarAnchor`.

## Limitations

**Dynamic `size` values** cannot be transformed automatically. If `size` is set to a variable or expression (e.g. `size={someSize}`), the codemod leaves it unchanged. Migrate these manually:

```tsx
// Before
<Avatar size={isCompact ? 'small' : 'medium'}>

// After
<Avatar size={isCompact ? 'sm' : 'md'}>
```
