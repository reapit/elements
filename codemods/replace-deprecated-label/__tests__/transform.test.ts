import { createMigrationTestSuite } from '../../shared/test-helpers.js'
import transform from '../transform'

createMigrationTestSuite(transform, {
  oldName: 'DeprecatedLabel',
  newName: 'LabelText',
  targetSpecifier: '@reapit/elements/core/label-text',
  oldPropsName: 'DeprecatedLabelProps',
  newPropsType: 'LabelText.Props',
  facadePackage: '@company/ui',
})

describe('import rewrites (extended)', () => {
  test('rewrites DeprecatedLabel import from deprecated/label to core/label-text', () => {
    const input = [
      `import { DeprecatedLabel } from '@reapit/elements/deprecated/label'`,
      `<DeprecatedLabel>Text</DeprecatedLabel>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/label-text'")
    expect(output).not.toContain("from '@reapit/elements/deprecated/label'")
  })

  test('rewrites DeprecatedLabelProps alias-only import', () => {
    const input = [`import { DeprecatedLabelProps as LP } from '@reapit/elements'`, `type Props = LP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { LabelText } from '@reapit/elements/core/label-text'")
    expect(output).toContain('type Props = LabelText.Props')
    expect(output).not.toContain('DeprecatedLabelProps')
    expect(output).not.toContain('LP')
  })

  test('preserves component alias alongside props alias', () => {
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

describe('facade package behaviour (extended)', () => {
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

describe('jsx and identifier rewrites (extended)', () => {
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
