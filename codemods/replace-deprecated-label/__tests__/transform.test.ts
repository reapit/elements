import transform from '../transform'

describe('no-op', () => {
  test('returns source unchanged when deprecated symbols are absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('import rewrites', () => {
  test('rewrites DeprecatedLabel import from @reapit/elements to core/label-text', () => {
    const input = `import { DeprecatedLabel } from '@reapit/elements'\n<DeprecatedLabel>Text</DeprecatedLabel>`
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { LabelText } from '@reapit/elements/core/label-text'")
    expect(output).not.toContain("from '@reapit/elements'\n")
  })

  test('rewrites DeprecatedLabel import from deprecated/label to core/label-text', () => {
    const input = [
      `import { DeprecatedLabel } from '@reapit/elements/deprecated/label'`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/label-text'")
    expect(output).not.toContain("from '@reapit/elements/deprecated/label'")
  })

  test('rewrites DeprecatedLabelProps import and type references', () => {
    const input = [`import { DeprecatedLabelProps } from '@reapit/elements'`, `type Props = DeprecatedLabelProps`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { LabelText } from '@reapit/elements/core/label-text'")
    expect(output).toContain('type Props = LabelText.Props')
    expect(output).not.toContain('DeprecatedLabelProps')
  })

  test('deduplicates LabelText import when DeprecatedLabel and DeprecatedLabelProps are imported together', () => {
    const input = [
      `import { DeprecatedLabel, DeprecatedLabelProps } from '@reapit/elements'`,
      `type Props = DeprecatedLabelProps`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/label-text'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('import { LabelText } from')
    expect(output).toContain('type Props = LabelText.Props')
    expect(output).toContain('<LabelText>Text</LabelText>')
    expect(output).not.toContain('DeprecatedLabelProps')
  })

  test('rewrites DeprecatedLabelProps alias-only import', () => {
    const input = [`import { DeprecatedLabelProps as LP } from '@reapit/elements'`, `type Props = LP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { LabelText } from '@reapit/elements/core/label-text'")
    expect(output).toContain('type Props = LabelText.Props')
    expect(output).not.toContain('DeprecatedLabelProps')
    expect(output).not.toContain('LP')
  })

  test('preserves aliases', () => {
    const input = [
      `import { DeprecatedLabel as L, DeprecatedLabelProps as LP } from '@reapit/elements'`,
      `type Props = LP`,
      `<L>Label</L>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { LabelText as L, LabelText } from '@reapit/elements/core/label-text'")
    expect(output).toContain('type Props = LabelText.Props')
    expect(output).toContain('<L>Label</L>')
  })

  test('preserves unrelated imports and cleans empty declaration', () => {
    const input = [
      `import { DeprecatedLabel, Input } from '@reapit/elements'`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Input } from '@reapit/elements'`)
    expect(output).toContain(`import { LabelText } from '@reapit/elements/core/label-text'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into existing label-text import', () => {
    const input = [
      `import { LabelText } from '@reapit/elements/core/label-text'`,
      `import { DeprecatedLabel } from '@reapit/elements'`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/label-text'/g)
    expect(matches).toHaveLength(1)
  })

  test('merges rewrites from multiple deprecated source specifiers', () => {
    const input = [
      `import { DeprecatedLabel } from '@reapit/elements'`,
      `import { DeprecatedLabelProps } from '@reapit/elements/deprecated/label'`,
      `type Props = DeprecatedLabelProps`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/label-text'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('type Props = LabelText.Props')
    expect(output).toContain('<LabelText>Text</LabelText>')
    expect(output).not.toContain("from '@reapit/elements/deprecated/label'")
  })
})

describe('export behaviour', () => {
  test('does not rewrite re-export declarations', () => {
    const input = `export { DeprecatedLabel } from '@reapit/elements'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('jsx and identifier rewrites', () => {
  test('rewrites opening and closing JSX tags', () => {
    const input = `import { DeprecatedLabel } from '@reapit/elements'\n<DeprecatedLabel>Text</DeprecatedLabel>`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<LabelText>Text</LabelText>')
    expect(output).not.toContain('<DeprecatedLabel')
  })

  test('rewrites self-closing JSX tags', () => {
    const input = `import { DeprecatedLabel } from '@reapit/elements'\n<DeprecatedLabel />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<LabelText />')
  })

  test('rewrites non-JSX value references', () => {
    const input = [`import { DeprecatedLabel } from '@reapit/elements'`, `const Label = DeprecatedLabel`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const Label = LabelText')
    expect(output).not.toContain('DeprecatedLabel')
  })

  test('rewrites type references in heritage clauses and generics', () => {
    const input = [
      `import { DeprecatedLabelProps } from '@reapit/elements'`,
      `interface Foo extends DeprecatedLabelProps {}`,
      `type Bar = Partial<DeprecatedLabelProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface Foo extends LabelText.Props {}')
    expect(output).toContain('type Bar = Partial<LabelText.Props>')
  })
})

describe('facade package behaviour', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [`import { DeprecatedLabel } from '@company/ui'`, `<DeprecatedLabel>Text</DeprecatedLabel>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { LabelText } from '@company/ui'`)
    expect(output).not.toContain('/core/label-text')
  })

  test('keeps facade subpath specifier unchanged', () => {
    const input = [
      `import { DeprecatedLabel } from '@company/ui/elements'`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { LabelText } from '@company/ui/elements'`)
    expect(output).not.toContain('@reapit/elements/core/label-text')
  })
})
