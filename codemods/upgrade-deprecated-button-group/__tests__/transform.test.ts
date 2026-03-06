import { expect, describe, test } from 'vitest'
import transform from '../transform'

describe('upgrade-deprecated-button-group', () => {
  describe('no-op', () => {
    test('returns source unchanged when no DeprecatedButtonGroup present', () => {
      const input = `
import { Button } from '@reapit/elements'

export const MyComponent = () => <Button>Click me</Button>
`
      expect(transform(input, 'test.tsx')).toBe(input)
    })

    test('does not transform DeprecatedButton (handled by separate codemod)', () => {
      const input = `
import { DeprecatedButton } from '@reapit/elements'

export const MyComponent = () => <DeprecatedButton>Click me</DeprecatedButton>
`
      expect(transform(input, 'test.tsx')).toBe(input)
    })
  })

  describe('import transformations', () => {
    test('rewrites DeprecatedButtonGroup import to ButtonGroup subpath', () => {
      const input = `import { DeprecatedButtonGroup } from '@reapit/elements'`
      const output = transform(input, 'test.tsx')
      expect(output).toContain(`import { ButtonGroup } from '@reapit/elements/core/button-group'`)
      expect(output).not.toContain('DeprecatedButtonGroup')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })

    test('preserves alias when DeprecatedButtonGroup is aliased', () => {
      const input = `import { DeprecatedButtonGroup as BtnGroup } from '@reapit/elements'`
      const output = transform(input, 'test.tsx')
      expect(output).toContain(`import { ButtonGroup as BtnGroup } from '@reapit/elements/core/button-group'`)
      expect(output).not.toContain('DeprecatedButtonGroup')
    })

    test('removes DeprecatedButtonGroupProps from barrel import', () => {
      const input = `import { DeprecatedButtonGroupProps } from '@reapit/elements'`
      const output = transform(input, 'test.tsx')
      expect(output).not.toContain('DeprecatedButtonGroupProps')
      expect(output).not.toContain(`from '@reapit/elements'`)
      expect(output).not.toContain(`from '@reapit/elements/core/button-group'`)
    })

    test('removes DeprecatedButtonGroupAlignment from barrel import', () => {
      const input = `import { DeprecatedButtonGroupAlignment } from '@reapit/elements'`
      const output = transform(input, 'test.tsx')
      expect(output).not.toContain('DeprecatedButtonGroupAlignment')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })

    test('removes all three deprecated imports from same barrel import in one pass', () => {
      const input = `import { DeprecatedButtonGroup, DeprecatedButtonGroupProps, DeprecatedButtonGroupAlignment } from '@reapit/elements'`
      const output = transform(input, 'test.tsx')
      expect(output).toContain(`import { ButtonGroup } from '@reapit/elements/core/button-group'`)
      expect(output).not.toContain('DeprecatedButtonGroupProps')
      expect(output).not.toContain('DeprecatedButtonGroupAlignment')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })

    test('preserves other barrel imports alongside the deprecated ones', () => {
      const input = `import { DeprecatedButtonGroup, Input, Select } from '@reapit/elements'`
      const output = transform(input, 'test.tsx')
      expect(output).toContain(`from '@reapit/elements'`)
      expect(output).toContain('Input')
      expect(output).toContain('Select')
      expect(output).toContain(`import { ButtonGroup } from '@reapit/elements/core/button-group'`)
      expect(output).not.toContain('DeprecatedButtonGroup')
    })

    test('merges into existing ButtonGroup import at subpath rather than duplicating', () => {
      const input = `
import { DeprecatedButtonGroup } from '@reapit/elements'
import { ButtonGroup } from '@reapit/elements/core/button-group'
`
      const output = transform(input, 'test.tsx')
      const matches = output.match(/from '@reapit\/elements\/core\/button-group'/g)
      expect(matches).toHaveLength(1)
      expect(output).not.toContain('DeprecatedButtonGroup')
    })

    test('facade package: rewrites to bare facade specifier, not subpath', () => {
      const input = `import { DeprecatedButtonGroup } from '@company/ui/elements'`
      const output = transform(input, 'test.tsx', { facadePackage: '@company/ui' })
      expect(output).toContain(`import { ButtonGroup } from '@company/ui'`)
      expect(output).not.toContain('DeprecatedButtonGroup')
    })
  })

  describe('type reference transformations', () => {
    test('rewrites DeprecatedButtonGroupProps in type annotation', () => {
      const input = `
import { DeprecatedButtonGroupProps } from '@reapit/elements'
const props: DeprecatedButtonGroupProps = {}
`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('ButtonGroup.Props')
      expect(output).not.toContain('DeprecatedButtonGroupProps')
    })

    test('rewrites DeprecatedButtonGroupProps in interface extends clause', () => {
      const input = `
import { DeprecatedButtonGroupProps } from '@reapit/elements'
interface MyProps extends DeprecatedButtonGroupProps {
  extra: string
}
`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('extends ButtonGroup.Props')
      expect(output).not.toContain('DeprecatedButtonGroupProps')
    })

    test('leaves DeprecatedButtonGroupAlignment type references unchanged', () => {
      const input = `
import { DeprecatedButtonGroupAlignment } from '@reapit/elements'
const align: DeprecatedButtonGroupAlignment = 'left'
`
      const output = transform(input, 'test.tsx')
      // Import is removed but the type reference in code is left (produces TS error)
      expect(output).toContain('DeprecatedButtonGroupAlignment')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })
  })

  describe('JSX tag rename', () => {
    test('renames self-closing element', () => {
      const input = `const el = <DeprecatedButtonGroup />`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('<ButtonGroup />')
      expect(output).not.toContain('DeprecatedButtonGroup')
    })

    test('renames opening and closing tags', () => {
      const input = `
const el = (
  <DeprecatedButtonGroup>
    <button>Save</button>
  </DeprecatedButtonGroup>
)
`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('<ButtonGroup>')
      expect(output).toContain('</ButtonGroup>')
      expect(output).not.toContain('DeprecatedButtonGroup')
    })

    test('preserves alias — does not rename aliased tag', () => {
      const input = `
import { DeprecatedButtonGroup as BtnGroup } from '@reapit/elements'
const el = <BtnGroup><button>Save</button></BtnGroup>
`
      const output = transform(input, 'test.tsx')
      // Tag name is the alias, not 'DeprecatedButtonGroup', so it is preserved
      expect(output).toContain('<BtnGroup>')
      expect(output).toContain('</BtnGroup>')
      // Import is rewritten
      expect(output).toContain('ButtonGroup as BtnGroup')
    })
  })

  describe('alignment prop → justifyContent', () => {
    test('alignment="left" → justifyContent="start"', () => {
      const input = `const el = <DeprecatedButtonGroup alignment="left" />`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('justifyContent="start"')
      expect(output).not.toContain('alignment')
    })

    test('alignment="right" → justifyContent="end"', () => {
      const input = `const el = <DeprecatedButtonGroup alignment="right" />`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('justifyContent="end"')
      expect(output).not.toContain('alignment')
    })

    test('alignment="center" → justifyContent="center"', () => {
      const input = `const el = <DeprecatedButtonGroup alignment="center" />`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('justifyContent="center"')
      expect(output).not.toContain('alignment')
    })

    test('dynamic alignment={myVar} → prop removed + TODO comment', () => {
      const input = `const el = <DeprecatedButtonGroup alignment={myVar} />`
      const output = transform(input, 'test.tsx')
      // The alignment prop itself is removed (the word "alignment" may still appear in a comment)
      expect(output).not.toContain('alignment={myVar}')
      expect(output).toContain('TODO')
    })
  })

  describe('child wrapping', () => {
    test('leaves a single static JSX child unchanged', () => {
      const input = `
const el = (
  <DeprecatedButtonGroup>
    <button>Save</button>
  </DeprecatedButtonGroup>
)
`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('<button>Save</button>')
      expect(output).not.toContain('ButtonGroup.Item')
    })

    test('leaves multiple static JSX children unchanged', () => {
      const input = `
const el = (
  <DeprecatedButtonGroup>
    <button>Save</button>
    <button>Cancel</button>
    <button>Reset</button>
  </DeprecatedButtonGroup>
)
`
      const output = transform(input, 'test.tsx')
      expect(output).not.toContain('ButtonGroup.Item')
      expect(output).toContain('<button>Save</button>')
      expect(output).toContain('<button>Cancel</button>')
      expect(output).toContain('<button>Reset</button>')
    })

    test('leaves dynamic JSX expression children unchanged', () => {
      const input = `
const el = (
  <DeprecatedButtonGroup>
    {buttons.map((b) => <button key={b.id}>{b.label}</button>)}
  </DeprecatedButtonGroup>
)
`
      const output = transform(input, 'test.tsx')
      expect(output).not.toContain('ButtonGroup.Item')
      expect(output).toContain('buttons.map')
    })

    test('leaves mixed static and dynamic children unchanged', () => {
      const input = `
const el = (
  <DeprecatedButtonGroup>
    <button>Save</button>
    {extra && <button>Extra</button>}
  </DeprecatedButtonGroup>
)
`
      const output = transform(input, 'test.tsx')
      expect(output).not.toContain('ButtonGroup.Item')
      expect(output).toContain('<button>Save</button>')
      expect(output).toContain('extra &&')
    })

    test('self-closing element has no children to transform', () => {
      const input = `const el = <DeprecatedButtonGroup />`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('<ButtonGroup />')
      expect(output).not.toContain('ButtonGroup.Item')
    })
  })

  describe('coexistence with DeprecatedButton', () => {
    test('leaves DeprecatedButton untouched — that is handled by the separate codemod', () => {
      const input = `
import { DeprecatedButton, DeprecatedButtonGroup } from '@reapit/elements'

const el = (
  <DeprecatedButtonGroup>
    <DeprecatedButton>Save</DeprecatedButton>
  </DeprecatedButtonGroup>
)
`
      const output = transform(input, 'test.tsx')
      // ButtonGroup is transformed
      expect(output).toContain('<ButtonGroup>')
      expect(output).toContain('</ButtonGroup>')
      expect(output).toContain(`import { ButtonGroup } from '@reapit/elements/core/button-group'`)
      // DeprecatedButton is left alone
      expect(output).toContain('DeprecatedButton')
      expect(output).toContain('<DeprecatedButton>Save</DeprecatedButton>')
    })
  })

  describe('type-only import — ButtonGroup added when only DeprecatedButtonGroupProps used', () => {
    test('adds type-only ButtonGroup import when file only uses DeprecatedButtonGroupProps', () => {
      const input = `
import { DeprecatedButtonGroupProps } from '@reapit/elements'
const props: DeprecatedButtonGroupProps = {}
`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('ButtonGroup.Props')
      // A type-only ButtonGroup import must be present so ButtonGroup.Props resolves
      expect(output).toContain(`from '@reapit/elements/core/button-group'`)
      expect(output).toContain('ButtonGroup')
    })
  })

  describe('context-aware comment syntax for dynamic alignment', () => {
    test('uses JS comment syntax when element is in a JS expression context (variable declaration)', () => {
      const input = `const el = <DeprecatedButtonGroup alignment={myVar} />`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('// TODO:')
      expect(output).not.toContain('{/* TODO:')
    })

    test('uses JSX comment syntax when element is a direct child of a JSX element', () => {
      const input = `
const el = (
  <div>
    <DeprecatedButtonGroup alignment={myVar} />
  </div>
)
`
      const output = transform(input, 'test.tsx')
      expect(output).toContain('{/* TODO:')
    })
  })
})
