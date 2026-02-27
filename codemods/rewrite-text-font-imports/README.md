---
description: Migrates Text and font imports from core/text to utils/text and utils/font
---

# Text and Font Import Migration Codemod

Migrates imports of the `Text` component and `font` helper from `@reapit/elements/core/text` to their new locations in `@reapit/elements/utils/text` and `@reapit/elements/utils/font`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rewrite-text-font-imports

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core/text
# - etc.
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/ --facade-package @company/design-system
```

If you have multiple unrelated facade packages, run the codemod once for each package:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/ --facade-package @company/ui
yarn dlx @reapit/elements@beta codemod apply rewrite-text-font-imports src/ --facade-package @another/design-lib
```

**Example with facade package:**

```tsx
// Before (with facade package @habio/design-system)
import { Text, font } from '@habio/design-system/core/text'

// After running with --facade-package @habio/design-system
import { Text } from '@habio/design-system/utils/text'
import { font } from '@habio/design-system/utils/font'
```

## Background

In Reapit Elements, the `Text` component and `font` helper have been relocated from `core/text` to separate utility modules:

- **Text component** moved to `utils/text` - Better reflects its role as a utility component for inline text styling
- **Font helper** moved to `utils/font` - Provides a standalone utility for font CSS generation

This reorganisation improves the library's structure by:

1. Separating the component (`Text`) from the utility function (`font`)
2. Moving both to the `utils` namespace where they logically belong
3. Making import paths more explicit and discoverable

**Impact:**

- Subpath imports from `@reapit/elements/core/text` no longer work
- Barrel imports from `@reapit/elements` continue to work without changes

## Transformations

### Text-Only Imports

Imports containing only Text-related exports are routed to `utils/text`:

| Before                                                         | After                                                           |
| -------------------------------------------------------------- | --------------------------------------------------------------- |
| `import { Text } from '@reapit/elements/core/text'`            | `import { Text } from '@reapit/elements/utils/text'`            |
| `import type { TextColour } from '@reapit/elements/core/text'` | `import type { TextColour } from '@reapit/elements/utils/text'` |

### Font-Only Imports

Imports containing only font-related exports are routed to `utils/font`:

| Before                                                       | After                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| `import { font } from '@reapit/elements/core/text'`          | `import { font } from '@reapit/elements/utils/font'`          |
| `import type { FontSize } from '@reapit/elements/core/text'` | `import type { FontSize } from '@reapit/elements/utils/font'` |

### Mixed Imports (Split into Two Statements)

When a file imports both Text and font from the same module, the codemod splits them into separate import statements:

| Before                                                                          | After                                                                                                                              |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `import { Text, font } from '@reapit/elements/core/text'`                       | `import { Text } from '@reapit/elements/utils/text'`<br>`import { font } from '@reapit/elements/utils/font'`                       |
| `import { Text, font, FontSize, TextColour } from '@reapit/elements/core/text'` | `import { Text, TextColour } from '@reapit/elements/utils/text'`<br>`import { font, FontSize } from '@reapit/elements/utils/font'` |

### Multi-line Imports

Multi-line import statements are fully supported and automatically reformatted:

**Before:**

```tsx
import { Text, font, FontSize } from '@reapit/elements/core/text'
```

**After:**

```tsx
import { Text } from '@reapit/elements/utils/text'
import { font, FontSize } from '@reapit/elements/utils/font'
```

### Type Imports

Type imports are preserved, including inline `type` modifiers:

| Before                                                         | After                                                           |
| -------------------------------------------------------------- | --------------------------------------------------------------- |
| `import { type FontSize } from '@reapit/elements/core/text'`   | `import { type FontSize } from '@reapit/elements/utils/font'`   |
| `import type { TextColour } from '@reapit/elements/core/text'` | `import type { TextColour } from '@reapit/elements/utils/text'` |

### Aliased Imports

Custom aliases are preserved:

| Before                                                        | After                                                          |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| `import { Text as MyText } from '@reapit/elements/core/text'` | `import { Text as MyText } from '@reapit/elements/utils/text'` |
| `import { font as f } from '@reapit/elements/core/text'`      | `import { font as f } from '@reapit/elements/utils/font'`      |

### Barrel Imports (Unchanged)

Imports from the main barrel export are not affected:

| Before                                          | After                                                       |
| ----------------------------------------------- | ----------------------------------------------------------- |
| `import { Text, font } from '@reapit/elements'` | `import { Text, font } from '@reapit/elements'` (no change) |

## Export Classification

The codemod classifies imports based on their origin:

**Text-related exports** (routed to `utils/text`):

- `Text` - The Text component
- `TextColour` - Text colour type
- `textColours` - Array of text colour values
- `elText` - Styled component class name

**Font-related exports** (routed to `utils/font`):

- `font` - Font CSS helper function
- `FontSize` - Font size type
- `FontWeight` - Font weight type
- `FontStyle` - Font style type (combines size and weight)
- `fontSizes` - Array of font size values
- `fontWeights` - Array of font weight values

## What This Codemod Does NOT Do

**No JSX/usage changes**: This codemod only rewrites import statements. Your component usage and JSX remain unchanged.

**No file moving**: Source files are not relocated or restructured.

**No barrel export changes**: If you import from `@reapit/elements` (without subpaths), those imports are unchanged.

## Limitations

1. **Only processes subpath imports**: The codemod only transforms imports from `@reapit/elements/core/text`. Barrel imports from `@reapit/elements` are left unchanged (they continue to work).

2. **Unknown exports**: If an export is not in the TEXT_EXPORTS or FONT_EXPORTS lists, it will not be migrated. This ensures the codemod is conservative and only transforms known exports.

3. **Side-effect imports**: Side-effect imports are unchanged:

   ```typescript
   import '@reapit/elements/core/text' // Unchanged (though this pattern is unlikely)
   ```

4. **Default/namespace imports**: Default and namespace imports are unchanged:
   ```typescript
   import Text from '@reapit/elements/core/text' // Unchanged (not a valid pattern)
   import * as TextModule from '@reapit/elements/core/text' // Unchanged
   ```

## Example: Complete Before/After

**Before:**

```tsx
import { Text, font, FontSize, TextColour } from '@reapit/elements/core/text'
import { useState } from 'react'

interface Props {
  size: FontSize
  colour: TextColour
}

export const MyComponent: React.FC<Props> = ({ size, colour }) => {
  return (
    <div>
      <Text font={`text-${size}/bold`} colour={colour}>
        Styled Text
      </Text>
    </div>
  )
}
```

**After:**

```tsx
import { Text, TextColour } from '@reapit/elements/utils/text'
import { font, FontSize } from '@reapit/elements/utils/font'
import { useState } from 'react'

interface Props {
  size: FontSize
  colour: TextColour
}

export const MyComponent: React.FC<Props> = ({ size, colour }) => {
  return (
    <div>
      <Text font={`text-${size}/bold`} colour={colour}>
        Styled Text
      </Text>
    </div>
  )
}
```

Notice:

- The import statement was split into two
- Text and TextColour are imported from `utils/text`
- font and FontSize are imported from `utils/font`
- All usage remains identical
