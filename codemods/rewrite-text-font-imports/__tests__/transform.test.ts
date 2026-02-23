import { test, expect } from 'vitest'
import transform from '../transform'

// ===== Text-Only Imports =====

test('transforms Text-only import', () => {
  const input = `import { Text } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { Text } from '@reapit/elements/utils/text'\n`)
})

test('transforms TextColour type import', () => {
  const input = `import type { TextColour } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import type { TextColour } from '@reapit/elements/utils/text'\n`)
})

test('transforms inline type TextColour import', () => {
  const input = `import { type TextColour } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { type TextColour } from '@reapit/elements/utils/text'\n`)
})

test('transforms multiple Text-related imports', () => {
  const input = `import { Text, TextColour, textColours } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { Text, TextColour, textColours } from '@reapit/elements/utils/text'\n`)
})

// ===== Font-Only Imports =====

test('transforms font-only import', () => {
  const input = `import { font } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { font } from '@reapit/elements/utils/font'\n`)
})

test('transforms FontSize type import', () => {
  const input = `import type { FontSize } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import type { FontSize } from '@reapit/elements/utils/font'\n`)
})

test('transforms multiple font-related imports', () => {
  const input = `import { font, FontSize, FontWeight, fontSizes } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { font, FontSize, FontWeight, fontSizes } from '@reapit/elements/utils/font'\n`)
})

test('transforms FontStyle type import', () => {
  const input = `import type { FontStyle } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import type { FontStyle } from '@reapit/elements/utils/font'\n`)
})

// ===== Mixed Imports (Split into Two) =====

test('splits mixed Text and font import', () => {
  const input = `import { Text, font } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { font } from '@reapit/elements/utils/font'`)
})

test('splits complex mixed import with types', () => {
  const input = `import { Text, font, FontSize, TextColour, type FontStyle } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text, TextColour } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { font, FontSize, type FontStyle } from '@reapit/elements/utils/font'`)
})

test('splits mixed import with all font types', () => {
  const input = `import { Text, font, FontSize, FontWeight, FontStyle } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { font, FontSize, FontWeight, FontStyle } from '@reapit/elements/utils/font'`)
})

// ===== Aliased Imports =====

test('preserves Text alias', () => {
  const input = `import { Text as MyText } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { Text as MyText } from '@reapit/elements/utils/text'\n`)
})

test('preserves font alias', () => {
  const input = `import { font as f } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { font as f } from '@reapit/elements/utils/font'\n`)
})

test('preserves aliases in mixed imports', () => {
  const input = `import { Text as T, font as f } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text as T } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { font as f } from '@reapit/elements/utils/font'`)
})

// ===== Barrel Imports (No Change) =====

test('does not change barrel import from @reapit/elements', () => {
  const input = `import { Text, font } from '@reapit/elements'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

test('does not change unrelated imports', () => {
  const input = `import { Button } from '@reapit/elements'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

// ===== Facade Package Support =====

test('transforms facade package imports', () => {
  const input = `import { Text, font } from '@company/ui-components/core/text'`
  const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
  expect(output).toContain(`import { Text } from '@company/ui-components/utils/text'`)
  expect(output).toContain(`import { font } from '@company/ui-components/utils/font'`)
})

test('handles facade package with prefix matching', () => {
  const input = `import { Text } from '@company/design-system/core/text'`
  const output = transform(input, 'test.tsx', { facadePackage: '@company/design-system' })
  expect(output).toBe(`import { Text } from '@company/design-system/utils/text'\n`)
})

test('does not transform facade package without option', () => {
  const input = `import { Text } from '@company/ui/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

// ===== Real-World Scenarios =====

test('handles complete component file', () => {
  const input = `import { Text, font, FontSize, TextColour } from '@reapit/elements/core/text'
import { useState } from 'react'

interface Props {
  size: FontSize
  colour: TextColour
}

export const MyComponent: React.FC<Props> = ({ size, colour }) => {
  return <Text font={\`text-\${size}/bold\`} colour={colour}>Styled Text</Text>
}`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text, TextColour } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { font, FontSize } from '@reapit/elements/utils/font'`)
  expect(output).toContain(`import { useState } from 'react'`)
  expect(output).toContain('export const MyComponent')
})

test('handles style file with font helper', () => {
  const input = `import { css } from '@linaria/core'
import { font } from '@reapit/elements/core/text'

export const myStyle = css\`
  \${font('sm', 'regular')}
  color: red;
\``
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { font } from '@reapit/elements/utils/font'`)
  expect(output).toContain(`import { css } from '@linaria/core'`)
})

// ===== Edge Cases =====

test('returns unchanged source when no core/text imports', () => {
  const input = `import { Button } from '@reapit/elements'
export const MyButton = () => <Button>Click</Button>`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

test('handles empty file', () => {
  const input = ``
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

test('handles file with comments', () => {
  const input = `// Import Text component
import { Text } from '@reapit/elements/core/text'

/* Use Text for inline styling */
export const Example = () => <Text>Hello</Text>`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text } from '@reapit/elements/utils/text'`)
  expect(output).toContain('// Import Text component')
  expect(output).toContain('/* Use Text for inline styling */')
})

test('handles multiple import statements', () => {
  const input = `import { Button } from '@reapit/elements'
import { Text } from '@reapit/elements/core/text'
import { useState } from 'react'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Button } from '@reapit/elements'`)
  expect(output).toContain(`import { Text } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { useState } from 'react'`)
})

test('preserves elText styled component class', () => {
  const input = `import { elText } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { elText } from '@reapit/elements/utils/text'\n`)
})

test('handles fontSizes and fontWeights constants', () => {
  const input = `import { fontSizes, fontWeights } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { fontSizes, fontWeights } from '@reapit/elements/utils/font'\n`)
})

// ===== Type-Only Import Declarations =====

test('handles type-only import declaration', () => {
  const input = `import type { FontSize, FontWeight } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import type { FontSize, FontWeight } from '@reapit/elements/utils/font'\n`)
})

test('handles mixed type-only and regular imports', () => {
  const input = `import { Text } from '@reapit/elements/core/text'
import type { TextColour } from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import type { TextColour } from '@reapit/elements/utils/text'`)
})

// ===== Multi-line Import Statements =====

test('handles multi-line import with mixed Text and font', () => {
  const input = `import {
  Text,
  font,
  FontSize,
} from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Text } from '@reapit/elements/utils/text'`)
  expect(output).toContain(`import { font, FontSize } from '@reapit/elements/utils/font'`)
})

test('handles multi-line import with only Text exports', () => {
  const input = `import {
  Text,
  TextColour,
  textColours,
} from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { Text, TextColour, textColours } from '@reapit/elements/utils/text'\n`)
})

test('handles multi-line import with only font exports', () => {
  const input = `import {
  font,
  FontSize,
  FontWeight,
  fontSizes,
} from '@reapit/elements/core/text'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`import { font, FontSize, FontWeight, fontSizes } from '@reapit/elements/utils/font'\n`)
})
