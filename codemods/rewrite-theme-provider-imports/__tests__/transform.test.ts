import transform from '../transform'

// ===== Basic Named Imports =====

test('transforms ThemeProvider import', () => {
  const input = `import { ThemeProvider } from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { ThemeProvider } from '@reapit/elements/utils/theme-provider'`)
  expect(output).not.toContain('/core/theme-provider')
})

test('transforms multiple named imports', () => {
  const input = `import { ThemeProvider, useTheme } from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { ThemeProvider, useTheme } from '@reapit/elements/utils/theme-provider'`)
  expect(output).not.toContain('/core/theme-provider')
})

// ===== Type Imports =====

test('transforms type-only import declaration', () => {
  const input = `import type { ThemeProviderProps } from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import type { ThemeProviderProps } from '@reapit/elements/utils/theme-provider'`)
  expect(output).not.toContain('/core/theme-provider')
})

test('transforms inline type import', () => {
  const input = `import { type ThemeProviderProps } from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { type ThemeProviderProps } from '@reapit/elements/utils/theme-provider'`)
  expect(output).not.toContain('/core/theme-provider')
})

test('transforms mixed value and type imports', () => {
  const input = `import { ThemeProvider, type ThemeProviderProps } from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(
    `import { ThemeProvider, type ThemeProviderProps } from '@reapit/elements/utils/theme-provider'`,
  )
  expect(output).not.toContain('/core/theme-provider')
})

// ===== Aliased Imports =====

test('preserves import alias', () => {
  const input = `import { ThemeProvider as Provider } from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { ThemeProvider as Provider } from '@reapit/elements/utils/theme-provider'`)
  expect(output).not.toContain('/core/theme-provider')
})

// ===== Barrel Imports (No Change) =====

test('does not change barrel import from @reapit/elements', () => {
  const input = `import { ThemeProvider } from '@reapit/elements'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

test('does not change unrelated subpath import', () => {
  const input = `import { Button } from '@reapit/elements/core/button'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

// ===== Unchanged When No Match =====

test('returns unchanged source when no core/theme-provider imports', () => {
  const input = `import { Button } from '@reapit/elements/core/button'
export const MyButton = () => <Button>Click</Button>`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

test('handles empty file', () => {
  const input = ``
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

// ===== Facade Package Support =====

test('transforms facade package imports', () => {
  const input = `import { ThemeProvider } from '@company/ui-components/core/theme-provider'`
  const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
  expect(output).toContain(`import { ThemeProvider } from '@company/ui-components/utils/theme-provider'`)
  expect(output).not.toContain('/core/theme-provider')
})

test('does not transform facade package without option', () => {
  const input = `import { ThemeProvider } from '@company/ui/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

// ===== Multi-line Imports =====

test('handles multi-line import', () => {
  const input = `import {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
} from '@reapit/elements/core/theme-provider'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`from '@reapit/elements/utils/theme-provider'`)
  expect(output).toContain('ThemeProvider,')
  expect(output).toContain('useTheme,')
  expect(output).toContain('type ThemeProviderProps')
  expect(output).not.toContain('/core/theme-provider')
})

// ===== Real-World Scenarios =====

test('handles complete app root file', () => {
  const input = `import { ThemeProvider } from '@reapit/elements/core/theme-provider'
import { App } from './app'

export const Root = () => (
  <ThemeProvider theme="reapit">
    <App />
  </ThemeProvider>
)`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { ThemeProvider } from '@reapit/elements/utils/theme-provider'`)
  expect(output).toContain('<ThemeProvider theme="reapit">')
})

test('preserves unrelated imports alongside theme-provider import', () => {
  const input = `import { Button } from '@reapit/elements/core/button'
import { ThemeProvider } from '@reapit/elements/core/theme-provider'
import { useState } from 'react'`
  const output = transform(input, 'test.tsx')
  expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
  expect(output).toContain(`import { ThemeProvider } from '@reapit/elements/utils/theme-provider'`)
  expect(output).toContain(`import { useState } from 'react'`)
})
