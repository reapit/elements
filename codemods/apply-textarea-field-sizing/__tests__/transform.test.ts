import transform from '../transform'

describe('basic transformations', () => {
  test('adds fieldSizing="manual" to a self-closing Textarea', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea /> }`
    const output = transform(input)
    expect(output).toContain('<Textarea fieldSizing="manual" />')
  })

  test('adds fieldSizing="manual" to a non-self-closing Textarea', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea></Textarea> }`
    const output = transform(input)
    expect(output).toContain('<Textarea fieldSizing="manual">')
  })

  test('adds fieldSizing="manual" alongside existing props', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea placeholder="Enter text" name="description" /> }`
    const output = transform(input)
    expect(output).toContain('placeholder="Enter text"')
    expect(output).toContain('name="description"')
    expect(output).toContain('fieldSizing="manual"')
  })

  test('adds fieldSizing="manual" to multiple Textarea instances', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() {
  return (
    <>
      <Textarea placeholder="First" />
      <Textarea placeholder="Second" />
    </>
  )
}`
    const output = transform(input)
    const matches = output.match(/fieldSizing="manual"/g) ?? []
    expect(matches).toHaveLength(2)
  })
})

describe('skips when fieldSizing already present', () => {
  test('does not modify Textarea with fieldSizing="manual"', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea fieldSizing="manual" /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify Textarea with fieldSizing="content"', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea fieldSizing="content" /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify Textarea with fieldSizing="fixed"', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea fieldSizing="fixed" /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify Textarea with a dynamic fieldSizing value', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() { return <Textarea fieldSizing={someVar} /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('adds fieldSizing only to instances that are missing it', () => {
    const input = `import { Textarea } from '@reapit/elements'
function Component() {
  return (
    <>
      <Textarea fieldSizing="content" />
      <Textarea />
    </>
  )
}`
    const output = transform(input)
    // Only one fieldSizing="manual" should be added
    const manualMatches = output.match(/fieldSizing="manual"/g) ?? []
    expect(manualMatches).toHaveLength(1)
    // The existing fieldSizing="content" should be unchanged
    expect(output).toContain('fieldSizing="content"')
  })
})

describe('aliased imports', () => {
  test('adds fieldSizing="manual" when Textarea is aliased as TextArea (post rewrite-v4-imports)', () => {
    const input = `import { Textarea as TextArea } from '@reapit/elements'
function Component() { return <TextArea /> }`
    const output = transform(input)
    expect(output).toContain('<TextArea fieldSizing="manual" />')
  })

  test('adds fieldSizing="manual" when Textarea is aliased with a custom name', () => {
    const input = `import { Textarea as MyTextarea } from '@reapit/elements'
function Component() { return <MyTextarea placeholder="Enter text" /> }`
    const output = transform(input)
    expect(output).toContain('<MyTextarea placeholder="Enter text" fieldSizing="manual" />')
  })

  test('skips when aliased Textarea already has fieldSizing', () => {
    const input = `import { Textarea as TextArea } from '@reapit/elements'
function Component() { return <TextArea fieldSizing="manual" /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })
})

describe('no transformation cases', () => {
  test('returns source unchanged when no Textarea string in file', () => {
    const input = `import { Button } from '@reapit/elements'
function Component() { return <Button>Click</Button> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform Textarea imported from a non-elements package', () => {
    const input = `import { Textarea } from 'some-other-library'
function Component() { return <Textarea /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform Textarea when no imports exist in the file', () => {
    const input = `function Component() { return <Textarea /> }`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('returns unchanged for empty file', () => {
    const input = ``
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform Textarea from a non-facade non-elements package', () => {
    const input = `import { Textarea } from '@other/library'
function Component() { return <Textarea /> }`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toBe(input)
  })
})

describe('facade package support', () => {
  test('adds fieldSizing="manual" to Textarea imported from a facade package', () => {
    const input = `import { Textarea } from '@company/ui-components'
function Component() { return <Textarea /> }`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toContain('<Textarea fieldSizing="manual" />')
  })

  test('adds fieldSizing="manual" to Textarea imported from a facade package subpath', () => {
    const input = `import { Textarea } from '@company/design-system/elements'
function Component() { return <Textarea /> }`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/design-system' })
    expect(output).toContain('<Textarea fieldSizing="manual" />')
  })

  test('does not transform packages that start with a similar prefix but are different', () => {
    const input = `import { Textarea } from '@company/design-system-v2/elements'
function Component() { return <Textarea /> }`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/design-system' })
    expect(output).toBe(input)
  })

  test('transforms Textarea from facade package but not from an unrelated package', () => {
    const input = `import { Textarea } from '@company/ui-components'
import { Textarea as OtherTextarea } from '@other/library'
function Component() {
  return (
    <>
      <Textarea />
      <OtherTextarea />
    </>
  )
}`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toContain('<Textarea fieldSizing="manual" />')
    expect(output).toContain('<OtherTextarea />')
    expect(output).not.toMatch(/<OtherTextarea fieldSizing/)
  })

  test('preserves the facade package import path unchanged', () => {
    const input = `import { Textarea } from '@company/ui-components'
function Component() { return <Textarea /> }`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toContain("from '@company/ui-components'")
  })
})

describe('subpath import support', () => {
  test('adds fieldSizing="manual" to Textarea imported from @reapit/elements/core/textarea', () => {
    const input = `import { Textarea } from '@reapit/elements/core/textarea'
function Component() { return <Textarea /> }`
    const output = transform(input)
    expect(output).toContain('<Textarea fieldSizing="manual" />')
  })

  test('adds fieldSizing="manual" to Textarea imported from any @reapit/elements subpath', () => {
    const input = `import { Textarea } from '@reapit/elements/core'
function Component() { return <Textarea /> }`
    const output = transform(input)
    expect(output).toContain('<Textarea fieldSizing="manual" />')
  })
})

describe('mixed component scenarios', () => {
  test('only modifies Textarea elements, not other components', () => {
    const input = `import { Textarea, Button } from '@reapit/elements'
function Component() {
  return (
    <>
      <Button>Click</Button>
      <Textarea />
    </>
  )
}`
    const output = transform(input)
    expect(output).toContain('<Textarea fieldSizing="manual" />')
    expect(output).toContain('<Button>Click</Button>')
    expect(output).not.toMatch(/<Button fieldSizing/)
  })

  test('handles a realistic form component', () => {
    const input = `import { Textarea, Button } from '@reapit/elements'

function ContactForm() {
  return (
    <form>
      <Textarea
        name="message"
        placeholder="Enter your message"
        onChange={handleChange}
      />
      <Button type="submit">Send</Button>
    </form>
  )
}`
    const output = transform(input)
    expect(output).toContain('fieldSizing="manual"')
    expect(output).toContain('name="message"')
    expect(output).toContain('placeholder="Enter your message"')
    expect(output).toContain('onChange={handleChange}')
    expect(output).not.toMatch(/<Button fieldSizing/)
  })
})
