import transform from '../transform'

describe('no-op', () => {
  test('returns source unchanged when RadioGroup symbols are absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('import rewrites', () => {
  test('rewrites RadioGroup import from @reapit/elements to core/radio-group-control', () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `<RadioGroup><option /></RadioGroup>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'")
    expect(output).not.toContain("from '@reapit/elements'\n")
  })

  test('rewrites RadioGroup import from @reapit/elements/lab/radio-group to core/radio-group-control', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements/lab/radio-group'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/radio-group-control'")
    expect(output).not.toContain("from '@reapit/elements/lab/radio-group'")
  })

  test('rewrites RadioGroupProps import and type references', () => {
    const input = [`import { RadioGroupProps } from '@reapit/elements'`, `type Props = RadioGroupProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'")
    expect(output).toContain('type Props = RadioGroupControl.Props')
    expect(output).not.toContain('RadioGroupProps')
  })

  test('deduplicates RadioGroupControl import when RadioGroup and RadioGroupProps are imported together', () => {
    const input = [
      `import { RadioGroup, RadioGroupProps } from '@reapit/elements'`,
      `type Props = RadioGroupProps`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('import { RadioGroupControl } from')
    expect(output).toContain('type Props = RadioGroupControl.Props')
    expect(output).toContain('<RadioGroupControl>')
    expect(output).not.toContain('RadioGroupProps')
  })

  test('rewrites RadioGroupProps alias-only import', () => {
    const input = [`import { RadioGroupProps as RGP } from '@reapit/elements'`, `type Props = RGP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'")
    expect(output).toContain('type Props = RadioGroupControl.Props')
    expect(output).not.toContain('RadioGroupProps')
    expect(output).not.toContain('RGP')
  })

  test('preserves aliases', () => {
    const input = [
      `import { RadioGroup as RG, RadioGroupProps as RGP } from '@reapit/elements'`,
      `type Props = RGP`,
      `<RG><option /></RG>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(
      "import { RadioGroupControl as RG, RadioGroupControl } from '@reapit/elements/core/radio-group-control'",
    )
    expect(output).toContain('type Props = RadioGroupControl.Props')
    expect(output).toContain('<RG>')
  })

  test('preserves unrelated imports and cleans empty declaration', () => {
    const input = [`import { RadioGroup, Input } from '@reapit/elements'`, `<RadioGroup><option /></RadioGroup>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Input } from '@reapit/elements'`)
    expect(output).toContain(`import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into existing radio-group-control import', () => {
    const input = [
      `import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'`,
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g)
    expect(matches).toHaveLength(1)
  })

  test('merges rewrites from multiple deprecated source specifiers', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `import { RadioGroupProps } from '@reapit/elements/lab/radio-group'`,
      `type Props = RadioGroupProps`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('type Props = RadioGroupControl.Props')
    expect(output).toContain('<RadioGroupControl>')
    expect(output).not.toContain("from '@reapit/elements/lab/radio-group'")
  })
})

describe('export behaviour', () => {
  test('does not rewrite re-export declarations', () => {
    const input = `export { RadioGroup } from '@reapit/elements/lab/radio-group'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('rewrites local export specifiers safely', () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `export { RadioGroup }`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'`)
    expect(output).toContain('export { RadioGroupControl }')
    expect(output).not.toContain('export { RadioGroup }')
  })
})

describe('jsx and identifier rewrites', () => {
  test('rewrites opening and closing JSX tags', () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `<RadioGroup><option /></RadioGroup>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<RadioGroupControl>')
    expect(output).toContain('</RadioGroupControl>')
    expect(output).not.toMatch(/<RadioGroup[^C]/)
  })

  test('rewrites self-closing JSX tags', () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `<RadioGroup />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<RadioGroupControl />')
  })

  test('rewrites non-JSX value references', () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `const RG = RadioGroup`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const RG = RadioGroupControl')
    expect(output).not.toMatch(/= RadioGroup[^C]/)
  })

  test('does not rewrite non-JSX value references for aliased imports', () => {
    const input = [`import { RadioGroup as RG } from '@reapit/elements'`, `const C = RG`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { RadioGroupControl as RG } from '@reapit/elements/core/radio-group-control'")
    expect(output).toContain('const C = RG')
    expect(output).not.toContain('const C = RadioGroupControl')
  })

  test('does not rewrite object property keys named RadioGroup', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `const map = { RadioGroup }`,
      `const picked = map.RadioGroup`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const map = { RadioGroupControl }')
    expect(output).toContain('const picked = map.RadioGroup')
  })

  test('rewrites type references in heritage clauses and generics', () => {
    const input = [
      `import { RadioGroupProps } from '@reapit/elements'`,
      `interface Foo extends RadioGroupProps {}`,
      `type Bar = Partial<RadioGroupProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface Foo extends RadioGroupControl.Props {}')
    expect(output).toContain('type Bar = Partial<RadioGroupControl.Props>')
  })
})

describe('prop renames', () => {
  test('renames isRequired to required', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup isRequired><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('required')
    expect(output).not.toContain('isRequired')
  })

  test('renames errorMessage to errorText', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup errorMessage="Invalid selection"><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('errorText="Invalid selection"')
    expect(output).not.toContain('errorMessage')
  })

  test('renames both isRequired and errorMessage in the same element', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup isRequired errorMessage="Pick one"><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('required')
    expect(output).toContain('errorText="Pick one"')
    expect(output).not.toContain('isRequired')
    expect(output).not.toContain('errorMessage')
  })

  test('renames props with expression values', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup isRequired={isRequired} errorMessage={error}><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('required={isRequired}')
    expect(output).toContain('errorText={error}')
    expect(output).not.toContain('isRequired=')
    expect(output).not.toContain('errorMessage=')
  })

  test('preserves unchanged props alongside renamed ones', () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup label="Colour" orientation="horizontal" isRequired errorMessage="Required"><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('label="Colour"')
    expect(output).toContain('orientation="horizontal"')
    expect(output).toContain('required')
    expect(output).toContain('errorText="Required"')
  })

  test('does not rename props on unrelated components', () => {
    const input = [
      `import { SomeOtherComponent } from '@reapit/elements/core/other'`,
      `<SomeOtherComponent isRequired errorMessage="oops" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('isRequired')
    expect(output).toContain('errorMessage')
  })
})

describe('facade package behaviour', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [`import { RadioGroup } from '@company/ui'`, `<RadioGroup><option /></RadioGroup>`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { RadioGroupControl } from '@company/ui'`)
    expect(output).not.toContain('/core/radio-group-control')
  })

  test('keeps facade subpath specifier unchanged', () => {
    const input = [
      `import { RadioGroup } from '@company/ui/lab/radio-group'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { RadioGroupControl } from '@company/ui/lab/radio-group'`)
    expect(output).not.toContain('@reapit/elements/core/radio-group-control')
  })
})

describe('import safety', () => {
  test('preserves namespace imports when removing deprecated named imports', () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join('\n')

    const output = transform(input, 'file.tsx')

    expect(output).toContain(`import * as Elements from '@reapit/elements'`)
    expect(output).toContain(`import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'`)
  })

  test('does not migrate local RadioGroup symbols when there are no imports', () => {
    const input = [`const RadioGroup = () => null`, `<RadioGroup />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('does not migrate local RadioGroupProps symbols when there are no imports', () => {
    const input = [`type RadioGroupProps = { a: string }`, `type Props = RadioGroupProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })
})
