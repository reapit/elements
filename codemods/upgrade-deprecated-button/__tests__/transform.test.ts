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
    expect(output).toContain('<Button')
    expect(output).toContain('</Button>')
    expect(output).toContain('isDestructive={true}')
    expect(output).not.toContain('<MyBtn')
    expect(output).not.toContain('</MyBtn>')
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
    expect(output).toContain('<Button')
    expect(output).toContain('aria-disabled')
    expect(output).not.toContain('<CustomButton')
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
    expect(output).toContain('<Button')
    expect(output).toContain('isBusy={true}')
    expect(output).not.toContain('<Btn')
    expect(output).not.toContain('variant="busy"')
  })
})
