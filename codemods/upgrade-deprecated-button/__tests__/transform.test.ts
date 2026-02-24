import transform from '../transform'

// Helper to normalize output for comparison (removes leading/trailing whitespace and semicolons)
function normalize(str: string): string {
  return str.trim().replace(/;$/, '')
}

describe('import transformations', () => {
  test('transforms DeprecatedButton import', () => {
    const input = `import { DeprecatedButton } from '@reapit/elements'`
    const output = transform(input)
    expect(normalize(output)).toBe(`import { Button } from '@reapit/elements/core/button'`)
  })

  test('transforms DeprecatedButton with alias', () => {
    const input = `import { DeprecatedButton as MyButton } from '@reapit/elements'`
    const output = transform(input)
    expect(normalize(output)).toBe(`import { Button as MyButton } from '@reapit/elements/core/button'`)
  })

  test('transforms type-only DeprecatedButton import', () => {
    const input = `import { type DeprecatedButton } from '@reapit/elements'`
    const output = transform(input)
    expect(normalize(output)).toBe(`import { type Button } from '@reapit/elements/core/button'`)
  })

  test('removes DeprecatedButtonProps import', () => {
    const input = `import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(normalize(output)).toBe(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('removes type DeprecatedButtonProps import', () => {
    const input = `import { DeprecatedButton, type DeprecatedButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(normalize(output)).toBe(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('preserves other imports from @reapit/elements', () => {
    const input = `import { DeprecatedButton, Input, Form } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain(`import { Input, Form } from '@reapit/elements'`)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
  })

  test('handles multiple DeprecatedButton imports', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'
import { DeprecatedButton as AnotherButton } from '@reapit/elements'
`
    const output = transform(input)
    expect(output).toContain(`Button, Button as AnotherButton`)
  })

  test('returns unchanged when no DeprecatedButton', () => {
    const input = `import { Input, Form } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(input)
  })
})

describe('type reference transformations', () => {
  test('transforms DeprecatedButtonProps type reference', () => {
    const input = `
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'

const props: DeprecatedButtonProps = { variant: 'primary' }
`
    const output = transform(input)
    expect(output).toContain("const props: Button.Props = { variant: 'primary' }")
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('transforms DeprecatedButtonProps in interface extension', () => {
    const input = `
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'

interface MyProps extends DeprecatedButtonProps {
  customProp: string
}
`
    const output = transform(input)
    expect(output).toContain('interface MyProps extends Button.Props {')
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('transforms DeprecatedButtonProps in generics', () => {
    const input = `
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'

type PropsWithId = WithId<DeprecatedButtonProps>
`
    const output = transform(input)
    expect(output).toContain('type PropsWithId = WithId<Button.Props>')
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('transforms DeprecatedButtonProps in function parameters', () => {
    const input = `
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'

function renderButton(props: DeprecatedButtonProps) {
  return <DeprecatedButton {...props} />
}
`
    const output = transform(input)
    expect(output).toContain('function renderButton(props: Button.Props) {')
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('transforms DeprecatedButtonProps in return types', () => {
    const input = `
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'

function getProps(): DeprecatedButtonProps {
  return { variant: 'primary' }
}
`
    const output = transform(input)
    expect(output).toContain('function getProps(): Button.Props {')
    expect(output).not.toContain('DeprecatedButtonProps')
  })

  test('transforms multiple DeprecatedButtonProps references', () => {
    const input = `
import { DeprecatedButton, DeprecatedButtonProps } from '@reapit/elements'

const props1: DeprecatedButtonProps = { variant: 'primary' }
const props2: DeprecatedButtonProps = { variant: 'secondary' }
interface MyProps extends DeprecatedButtonProps {}
`
    const output = transform(input)
    expect(output).toContain("const props1: Button.Props = { variant: 'primary' }")
    expect(output).toContain("const props2: Button.Props = { variant: 'secondary' }")
    expect(output).toContain('interface MyProps extends Button.Props {}')
    expect(output).not.toContain('DeprecatedButtonProps')
  })
})

describe('DeprecatedIcon handling', () => {
  test('adds DeprecatedIcon import when used in JSX', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton iconLeft={<DeprecatedIcon icon="home" />}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain(`import { DeprecatedIcon } from '@reapit/elements'`)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
  })

  test('does not add DeprecatedIcon import when not used', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).not.toContain('DeprecatedIcon')
  })

  test('does not duplicate DeprecatedIcon import if already present', () => {
    const input = `
import { DeprecatedButton, DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton iconLeft={<DeprecatedIcon icon="home" />}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    // Count occurrences of DeprecatedIcon import
    const importMatches = output.match(/import.*DeprecatedIcon.*from/g)
    expect(importMatches).toHaveLength(1)
  })
})

describe('facade package support', () => {
  test('transforms with facade package', () => {
    const input = `import { DeprecatedButton } from '@company/ui'`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(normalize(output)).toBe(`import { Button } from '@company/ui/core/button'`)
  })

  test('adds DeprecatedIcon import with facade package', () => {
    const input = `
import { DeprecatedButton } from '@company/ui'

function MyComponent() {
  return <DeprecatedButton iconLeft={<DeprecatedIcon icon="home" />}>Click</DeprecatedButton>
}
`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { DeprecatedIcon } from '@company/ui'`)
    expect(output).toContain(`import { Button } from '@company/ui/core/button'`)
  })

  test('handles facade package with subpath', () => {
    const input = `import { DeprecatedButton } from '@company/ui/elements'`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(normalize(output)).toBe(`import { Button } from '@company/ui/core/button'`)
  })
})

describe('edge cases', () => {
  test('handles empty file', () => {
    const input = ``
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('handles file with only comments', () => {
    const input = `// This is a comment\n/* Another comment */`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('preserves file formatting', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

// Some comment
function MyComponent() {
  return <DeprecatedButton>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('// Some comment')
    expect(output).toContain('function MyComponent()')
  })

  test('handles mixed imports correctly', () => {
    const input = `
import React from 'react'
import { DeprecatedButton } from '@reapit/elements'
import { SomeOtherComponent } from './other'

const props: DeprecatedButtonProps = { variant: 'primary' }
`
    const output = transform(input)
    expect(output).toContain(`import React from 'react'`)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { SomeOtherComponent } from './other'`)
    expect(output).toContain("const props: Button.Props = { variant: 'primary' }")
  })
})

describe('JSX element transformations', () => {
  test('transforms DeprecatedButton element to Button', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton>Click me</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('<Button>Click me</Button>')
    expect(output).not.toContain('DeprecatedButton')
  })

  test('transforms self-closing DeprecatedButton', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant="primary" />
}
`
    const output = transform(input)
    expect(output).toContain('<Button')
    expect(output).not.toContain('DeprecatedButton')
  })

  test('transforms isDisabled to disabled for button elements', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton isDisabled>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('disabled')
    expect(output).not.toContain('isDisabled')
  })

  test('transforms isDisabled to aria-disabled for anchor elements', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton href="/home" isDisabled>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('aria-disabled')
    expect(output).not.toContain('isDisabled')
  })

  test('removes isDisabled={false}', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton isDisabled={false}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).not.toContain('isDisabled')
    expect(output).not.toContain('disabled')
  })

  test('transforms variant="destructive" to isDestructive={true}', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant="destructive">Delete</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isDestructive={true}')
    expect(output).not.toContain('variant="destructive"')
  })

  test('transforms variant="busy" to isBusy={true}', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant="busy">Loading</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isBusy={true}')
    expect(output).not.toContain('variant="busy"')
  })

  test('transforms variant={"destructive"} (JSX expression with double quotes) to isDestructive={true}', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant={"destructive"}>Delete</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isDestructive={true}')
    expect(output).not.toContain('variant=')
  })

  test("transforms variant={'busy'} (JSX expression with single quotes) to isBusy={true}", () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant={'busy'}>Loading</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isBusy={true}')
    expect(output).not.toContain('variant=')
  })

  test('preserves non-destructive/non-busy variants', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return (
    <>
      <DeprecatedButton variant="primary">Primary</DeprecatedButton>
      <DeprecatedButton variant="secondary">Secondary</DeprecatedButton>
      <DeprecatedButton variant="tertiary">Tertiary</DeprecatedButton>
    </>
  )
}
`
    const output = transform(input)
    expect(output).toContain('variant="primary"')
    expect(output).toContain('variant="secondary"')
    expect(output).toContain('variant="tertiary"')
  })

  test('handles multiple prop transformations', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant="destructive" isDisabled size="large">Delete</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isDestructive={true}')
    expect(output).toContain('disabled')
    expect(output).toContain('size="large"')
    expect(output).not.toContain('variant="destructive"')
    expect(output).not.toContain('isDisabled')
  })

  test('preserves other props', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return (
    <DeprecatedButton
      size="small"
      className="custom-class"
      onClick={handleClick}
      iconLeft={<Icon />}
    >
      Click
    </DeprecatedButton>
  )
}
`
    const output = transform(input)
    expect(output).toContain('size="small"')
    expect(output).toContain('className="custom-class"')
    expect(output).toContain('onClick={handleClick}')
    expect(output).toContain('iconLeft={<Icon />}')
  })

  test('handles nested DeprecatedButton elements', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return (
    <div>
      <DeprecatedButton variant="primary">Outer</DeprecatedButton>
      <div>
        <DeprecatedButton variant="destructive">Nested</DeprecatedButton>
      </div>
    </div>
  )
}
`
    const output = transform(input)
    expect(output).toContain('<Button variant="primary">Outer</Button>')
    expect(output).toContain('isDestructive={true}')
    expect(output).not.toContain('DeprecatedButton')
  })

  test('transforms aliased JSX elements', () => {
    const input = `
import { DeprecatedButton as MyBtn } from '@reapit/elements'

function MyComponent() {
  return <MyBtn variant="destructive">Delete</MyBtn>
}
`
    const output = transform(input)
    expect(output).toContain('import { Button as MyBtn }')
    expect(output).toContain('<MyBtn')
    expect(output).toContain('</MyBtn>')
    expect(output).toContain('isDestructive={true}')
    expect(output).not.toContain('<Button')
    expect(output).not.toContain('</Button>')
    expect(output).not.toContain('variant="destructive"')
  })

  test('transforms aliased JSX with isDisabled prop', () => {
    const input = `
import { DeprecatedButton as CustomButton } from '@reapit/elements'

function MyComponent() {
  return <CustomButton isDisabled href="/home">Link</CustomButton>
}
`
    const output = transform(input)
    expect(output).toContain('import { Button as CustomButton }')
    expect(output).toContain('<CustomButton')
    expect(output).toContain('aria-disabled')
    expect(output).not.toContain('<Button')
    expect(output).not.toContain('isDisabled')
  })

  test('transforms aliased self-closing JSX elements', () => {
    const input = `
import { DeprecatedButton as Btn } from '@reapit/elements'

function MyComponent() {
  return <Btn variant="busy" />
}
`
    const output = transform(input)
    expect(output).toContain('import { Button as Btn }')
    expect(output).toContain('<Btn')
    expect(output).toContain('isBusy={true}')
    expect(output).not.toContain('<Button')
    expect(output).not.toContain('variant="busy"')
  })

  test('transforms intent="primary" to variant="primary"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent="primary">Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('variant="primary"')
    expect(output).not.toContain('intent=')
  })

  test('transforms intent="default" to variant="secondary"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent="default">Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('variant="secondary"')
    expect(output).not.toContain('intent=')
    expect(output).not.toContain('"default"')
  })

  test('transforms intent="danger" to variant="primary" and adds isDestructive', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent="danger">Delete</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('variant="primary"')
    expect(output).toContain('isDestructive={true}')
    expect(output).not.toContain('intent=')
    expect(output).not.toContain('"danger"')
  })

  test('transforms intent={\"primary\"} JSX expression', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent={"primary"}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('variant=')
    expect(output).toContain('primary')
    expect(output).not.toContain('intent=')
  })

  test('transforms loading={true} to isBusy={true}', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton loading={true}>Loading</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isBusy={true}')
    expect(output).not.toContain('loading=')
  })

  test('removes loading={false}', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton loading={false}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).not.toContain('loading')
    expect(output).not.toContain('isBusy')
  })

  test('transforms loading with variable expression', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton loading={isLoading}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('isBusy={isLoading}')
    expect(output).not.toContain('loading=')
  })

  test('transforms size={1} to size="small"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton size={1}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('size="small"')
    expect(output).not.toContain('size={1}')
  })

  test('transforms size={2} to size="medium"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton size={2}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('size="medium"')
    expect(output).not.toContain('size={2}')
  })

  test('transforms size={3} to size="large"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton size={3}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('size="large"')
    expect(output).not.toContain('size={3}')
  })

  test('transforms size={4} to size="large"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton size={4}>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('size="large"')
    expect(output).not.toContain('size={4}')
  })

  test('preserves size with string value', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton size="small">Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('size="small"')
  })

  test('handles multiple new prop transformations together', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent="danger" loading={true} size={3}>Delete</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('variant="primary"')
    expect(output).toContain('isDestructive={true}')
    expect(output).toContain('isBusy={true}')
    expect(output).toContain('size="large"')
    expect(output).not.toContain('intent=')
    expect(output).not.toContain('loading=')
    expect(output).not.toContain('size={3}')
  })
})

describe('edge cases and duplicate props', () => {
  test('transforms intent without value to variant="secondary"', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent>Click</DeprecatedButton>
}
`
    const output = transform(input)
    expect(output).toContain('variant="secondary"')
    expect(output).not.toContain('intent')
  })

  test('removes intent when variant already exists', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant="primary" intent="danger">Click</DeprecatedButton>
}
`
    const output = transform(input)
    // Should remove intent to avoid duplicate variant attributes
    expect(output).toContain('variant="primary"')
    expect(output).not.toContain('intent')
    // Count variant occurrences - should only have one
    const variantMatches = output.match(/variant=/g)
    expect(variantMatches?.length).toBe(1)
  })

  test('does not add duplicate isDestructive when already present (intent="danger")', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent="danger" isDestructive>Click</DeprecatedButton>
}
`
    const output = transform(input)
    // Count occurrences of isDestructive - should only appear once
    const matches = output.match(/isDestructive/g)
    expect(matches?.length).toBe(1)
    expect(output).toContain('variant="primary"')
  })

  test('handles intent="danger" with variant="destructive" (both add isDestructive)', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton intent="danger" variant="destructive">Delete</DeprecatedButton>
}
`
    const output = transform(input)
    // Should remove intent when variant exists
    expect(output).not.toContain('intent')
    expect(output).not.toContain('variant=')
    // Should only have one isDestructive
    const matches = output.match(/isDestructive/g)
    expect(matches?.length).toBe(1)
  })

  test('handles variant="destructive" before intent="danger" (order dependency test)', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton variant="destructive" intent="danger">Delete</DeprecatedButton>
}
`
    const output = transform(input)
    // Should remove intent when variant exists, regardless of attribute order
    expect(output).not.toContain('intent')
    expect(output).not.toContain('variant=')
    // Should only have one isDestructive
    const matches = output.match(/isDestructive/g)
    expect(matches?.length).toBe(1)
  })

  test('removes loading={false} with whitespace variations', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton loading={ false }>Click</DeprecatedButton>
}
`
    const output = transform(input)
    // Should remove loading={false} even with whitespace
    expect(output).not.toContain('loading')
    expect(output).not.toContain('isBusy')
  })

  test('does not add duplicate isBusy when loading prop and variant="busy" are both used', () => {
    const input = `
import { DeprecatedButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedButton loading={isLoading} variant="busy">Submit</DeprecatedButton>
}
`
    const output = transform(input)
    // Count occurrences of isBusy - should only appear once
    const matches = output.match(/isBusy/g)
    expect(matches?.length).toBe(1)
    // Should not have variant="busy" anymore
    expect(output).not.toContain('variant=')
    expect(output).not.toContain('loading')
  })
})
