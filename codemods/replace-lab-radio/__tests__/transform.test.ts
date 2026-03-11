import transform from '../transform'

describe('no-op', () => {
  test('returns source unchanged when Radio symbols are absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('import rewrites', () => {
  test('rewrites Radio import from @reapit/elements to core/radio-group-control', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `<Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioButton } from '@reapit/elements/core/radio-group-control'")
    expect(output).not.toContain("from '@reapit/elements'\n")
  })

  test('rewrites Radio import from @reapit/elements/lab/radio to core/radio-group-control', () => {
    const input = [`import { Radio } from '@reapit/elements/lab/radio'`, `<Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/radio-group-control'")
    expect(output).not.toContain("from '@reapit/elements/lab/radio'")
  })

  test('rewrites RadioProps import and type references', () => {
    const input = [`import { RadioProps } from '@reapit/elements'`, `type Props = RadioProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioButton } from '@reapit/elements/core/radio-group-control'")
    expect(output).toContain('type Props = RadioButton.Props')
    expect(output).not.toContain('RadioProps')
  })

  test('deduplicates RadioButton import when Radio and RadioProps are imported together', () => {
    const input = [
      `import { Radio, RadioProps } from '@reapit/elements'`,
      `type Props = RadioProps`,
      `<Radio label="Opt" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('import { RadioButton } from')
    expect(output).toContain('type Props = RadioButton.Props')
    expect(output).toContain('<RadioButton')
    expect(output).not.toContain('RadioProps')
  })

  test('rewrites RadioProps alias-only import', () => {
    const input = [`import { RadioProps as RP } from '@reapit/elements'`, `type Props = RP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioButton } from '@reapit/elements/core/radio-group-control'")
    expect(output).toContain('type Props = RadioButton.Props')
    expect(output).not.toContain('RadioProps')
    expect(output).not.toContain('= RP')
  })

  test('preserves aliases', () => {
    const input = [
      `import { Radio as R, RadioProps as RP } from '@reapit/elements'`,
      `type Props = RP`,
      `<R label="Opt" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(
      "import { RadioButton as R, RadioButton } from '@reapit/elements/core/radio-group-control'",
    )
    expect(output).toContain('type Props = RadioButton.Props')
    expect(output).toContain('<R')
  })

  test('preserves unrelated imports and cleans empty declaration', () => {
    const input = [`import { Radio, Input } from '@reapit/elements'`, `<Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Input } from '@reapit/elements'`)
    expect(output).toContain(`import { RadioButton } from '@reapit/elements/core/radio-group-control'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into existing radio-group-control import', () => {
    const input = [
      `import { RadioButton } from '@reapit/elements/core/radio-group-control'`,
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g)
    expect(matches).toHaveLength(1)
  })

  test('merges rewrites from multiple deprecated source specifiers', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `import { RadioProps } from '@reapit/elements/lab/radio'`,
      `type Props = RadioProps`,
      `<Radio label="Opt" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('type Props = RadioButton.Props')
    expect(output).toContain('<RadioButton')
    expect(output).not.toContain("from '@reapit/elements/lab/radio'")
  })
})

describe('export behaviour', () => {
  test('does not rewrite re-export declarations', () => {
    const input = `export { Radio } from '@reapit/elements/lab/radio'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('rewrites local export specifiers safely', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `export { Radio }`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { RadioButton } from '@reapit/elements/core/radio-group-control'`)
    expect(output).toContain('export { RadioButton }')
    expect(output).not.toContain('export { Radio }')
  })
})

describe('jsx and identifier rewrites', () => {
  test('rewrites opening and closing JSX tags', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `<Radio label="Opt"><span /></Radio>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<RadioButton')
    expect(output).toContain('</RadioButton>')
    expect(output).not.toMatch(/<Radio[^B]/)
  })

  test('rewrites self-closing JSX tags', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `<Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<RadioButton')
  })

  test('rewrites non-JSX value references', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `const R = Radio`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const R = RadioButton')
    expect(output).not.toMatch(/= Radio[^B]/)
  })

  test('does not rewrite non-JSX value references for aliased imports', () => {
    const input = [`import { Radio as R } from '@reapit/elements'`, `const C = R`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioButton as R } from '@reapit/elements/core/radio-group-control'")
    expect(output).toContain('const C = R')
    expect(output).not.toContain('const C = RadioButton')
  })

  test('does not rewrite object property keys named Radio', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const map = { Radio }`,
      `const picked = map.Radio`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const map = { RadioButton }')
    expect(output).toContain('const picked = map.Radio')
  })

  test('rewrites type references in heritage clauses and generics', () => {
    const input = [
      `import { RadioProps } from '@reapit/elements'`,
      `interface Foo extends RadioProps {}`,
      `type Bar = Partial<RadioProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface Foo extends RadioButton.Props {}')
    expect(output).toContain('type Bar = Partial<RadioButton.Props>')
  })
})

describe('prop renames and removals', () => {
  test('renames isRequired to required', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `<Radio label="Opt" isRequired />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('required')
    expect(output).not.toContain('isRequired')
  })

  test('removes hasError prop', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `<Radio label="Opt" hasError />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('hasError')
  })

  test('renames isRequired and removes hasError in the same element', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `<Radio label="Opt" isRequired hasError />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('required')
    expect(output).not.toContain('isRequired')
    expect(output).not.toContain('hasError')
  })

  test('renames props with expression values', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" isRequired={isRequired} hasError={hasError} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('required={isRequired}')
    expect(output).not.toContain('isRequired=')
    expect(output).not.toContain('hasError')
  })

  test('preserves unchanged props alongside renamed and removed ones', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" supplementaryInfo="Extra" isRequired hasError />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('label="Opt"')
    expect(output).toContain('supplementaryInfo="Extra"')
    expect(output).toContain('required')
    expect(output).not.toContain('isRequired')
    expect(output).not.toContain('hasError')
  })

  test('does not rename props on unrelated components', () => {
    const input = [
      `import { SomeOtherComponent } from '@reapit/elements/core/other'`,
      `<SomeOtherComponent isRequired hasError />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('isRequired')
    expect(output).toContain('hasError')
  })
})

describe('TODO comment', () => {
  test('inserts a TODO comment before each migrated JSX statement', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `const el = <Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO: Consider using RadioGroupControl rather than RadioButton directly.')
    const todoIndex = output.indexOf('// TODO:')
    const elIndex = output.indexOf('const el =')
    expect(todoIndex).toBeLessThan(elIndex)
  })

  test('inserts only one TODO comment per statement even when element appears once', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `const el = <Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO:/g)
    expect(matches).toHaveLength(1)
  })

  test('inserts a TODO comment before each of multiple migrated statements', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const a = <Radio label="A" />`,
      `const b = <Radio label="B" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO:/g)
    expect(matches).toHaveLength(2)
  })

  test('inserts only one TODO comment when multiple Radio elements share a statement', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const els = [<Radio label="A" />, <Radio label="B" />]`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO:/g)
    expect(matches).toHaveLength(1)
  })

  test('does not insert a TODO comment when no JSX elements are migrated', () => {
    const input = [`import { Radio } from '@reapit/elements'`, `const R = Radio`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('// TODO:')
  })

  test('preserves indentation of the migrated statement after inserting the TODO comment', () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `function foo() {`,
      `  const el = <Radio label="Opt" />`,
      `}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const lines = output.split('\n')
    const todoLine = lines.find((l) => l.includes('// TODO:'))!
    const stmtLine = lines.find((l) => l.includes('const el ='))!
    expect(todoLine).toBeDefined()
    expect(stmtLine).toBeDefined()
    // Both the comment and the statement should share the same leading indentation.
    expect(todoLine.match(/^\s*/)?.[0]).toBe(stmtLine.match(/^\s*/)?.[0])
  })
})

describe('facade package behaviour', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [`import { Radio } from '@company/ui'`, `<Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { RadioButton } from '@company/ui'`)
    expect(output).not.toContain('/core/radio-group-control')
  })

  test('keeps facade subpath specifier unchanged', () => {
    const input = [`import { Radio } from '@company/ui/lab/radio'`, `<Radio label="Opt" />`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { RadioButton } from '@company/ui/lab/radio'`)
    expect(output).not.toContain('@reapit/elements/core/radio-group-control')
  })
})

describe('import safety', () => {
  test('preserves namespace imports when removing deprecated named imports', () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" />`,
    ].join('\n')

    const output = transform(input, 'file.tsx')

    expect(output).toContain(`import * as Elements from '@reapit/elements'`)
    expect(output).toContain(`import { RadioButton } from '@reapit/elements/core/radio-group-control'`)
  })

  test('does not migrate local Radio symbols when there are no imports', () => {
    const input = [`const Radio = () => null`, `<Radio />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('does not migrate local RadioProps symbols when there are no imports', () => {
    const input = [`type RadioProps = { a: string }`, `type Props = RadioProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('removes RadioProps import and adds no RadioButton import when RadioProps is imported but unused', () => {
    const input = `import { RadioProps } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('RadioProps')
    expect(output).not.toContain('RadioButton')
    expect(output).not.toContain("from '@reapit/elements/core/radio-group-control'")
  })
})
