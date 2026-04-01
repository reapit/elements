import transform from '../transform'

// ---------------------------------------------------------------------------
// No-op
// ---------------------------------------------------------------------------

describe('no-op', () => {
  test('returns source unchanged when ToggleRadio is absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\nconst el = <Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('returns source unchanged when only Toggle (not ToggleRadio) is present', () => {
    const input = `import { Toggle } from '@reapit/elements'\n<Toggle id="x" />`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// Import rewrites
// ---------------------------------------------------------------------------

describe('import rewrites', () => {
  test('rewrites ToggleRadio import to ChipSelect', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: true }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { ChipSelect } from '@reapit/elements/core/chip-select'`)
    expect(output).not.toContain(`'@reapit/elements'\n`)
  })

  test('removes ToggleRadioProps import and rewrites type references', () => {
    const input = [`import { ToggleRadioProps } from '@reapit/elements'`, `type Props = ToggleRadioProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { ChipSelect } from '@reapit/elements/core/chip-select'`)
    expect(output).toContain(`type Props = ChipSelect.Props`)
    expect(output).not.toContain('ToggleRadioProps')
  })

  test('removes ToggleRadioOption import and leaves a TODO comment on remaining usages', () => {
    const input = [
      `import { ToggleRadio, ToggleRadioOption } from '@reapit/elements'`,
      `const opts: ToggleRadioOption[] = []`,
      `<ToggleRadio name="r" options={opts} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/import[^}]*ToggleRadioOption/)
    expect(output).toContain('// TODO (DS-78)')
  })

  test('removes ToggleRadioWrapped import', () => {
    const input = [
      `import { ToggleRadio, ToggleRadioWrapped } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/import[^}]*ToggleRadioWrapped/)
  })

  test('removes legacy styled component imports', () => {
    const input = [
      `import { ToggleRadio, ElToggleRadioWrap, ElToggleRadioItem, ElToggleRadioLabel, ElToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElToggleRadioWrap')
    expect(output).not.toContain('ElToggleRadioItem')
    expect(output).not.toContain('ElToggleRadioLabel')
    expect(output).not.toContain('ElToggleRadio')
  })

  test('removes handleKeyboardToggleChange import', () => {
    const input = [
      `import { ToggleRadio, handleKeyboardToggleChange } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('handleKeyboardToggleChange')
  })

  test('preserves unrelated imports and cleans up empty declaration', () => {
    const input = [
      `import { ToggleRadio, Input } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Input } from '@reapit/elements'`)
    expect(output).toContain(`import { ChipSelect } from '@reapit/elements/core/chip-select'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges ChipSelect into an existing chip-select import', () => {
    const input = [
      `import { ChipSelect } from '@reapit/elements/core/chip-select'`,
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/chip-select'/g)
    expect(matches).toHaveLength(1)
  })

  test('preserves import alias', () => {
    const input = [
      `import { ToggleRadio as TR } from '@reapit/elements'`,
      `<TR name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { ChipSelect as TR } from '@reapit/elements/core/chip-select'`)
    expect(output).toContain('<TR')
  })

  test('does not rewrite re-export declarations', () => {
    const input = `export { ToggleRadio } from '@reapit/elements'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// Type reference rewrites
// ---------------------------------------------------------------------------

describe('type reference rewrites', () => {
  test('rewrites ToggleRadioProps in type alias', () => {
    const input = [`import { ToggleRadioProps } from '@reapit/elements'`, `type Props = ToggleRadioProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Props = ChipSelect.Props')
    expect(output).not.toContain('ToggleRadioProps')
  })

  test('rewrites ToggleRadioProps in interface extension', () => {
    const input = [
      `import { ToggleRadioProps } from '@reapit/elements'`,
      `interface MyProps extends ToggleRadioProps {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface MyProps extends ChipSelect.Props {}')
  })

  test('rewrites ToggleRadioProps in generic type argument', () => {
    const input = [
      `import { ToggleRadioProps } from '@reapit/elements'`,
      `type Partial = Partial<ToggleRadioProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Partial = Partial<ChipSelect.Props>')
  })
})

// ---------------------------------------------------------------------------
// Inline options expansion
// ---------------------------------------------------------------------------

describe('inline options expansion', () => {
  test('expands a self-closing ToggleRadio with inline options into ChipSelect with Option children', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio`,
      `  name="my-radio"`,
      `  options={[`,
      `    { id: 'opt1', value: 'a', text: 'Option A', isChecked: true },`,
      `    { id: 'opt2', value: 'b', text: 'Option B', isChecked: false },`,
      `  ]}`,
      `/>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<ChipSelect')
    expect(output).toContain('</ChipSelect>')
    expect(output).toContain(`<ChipSelect.Option value="a" defaultChecked>Option A</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="b">Option B</ChipSelect.Option>`)
    expect(output).not.toContain('ToggleRadio')
    expect(output).not.toContain('options={')
  })

  test('maps isChecked: true to defaultChecked', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'x', text: 'X', isChecked: true }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('defaultChecked')
  })

  test('does not add defaultChecked when isChecked is false', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'x', text: 'X', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('defaultChecked')
    expect(output).toContain(`<ChipSelect.Option value="x">X</ChipSelect.Option>`)
  })

  test('propagates parent-level disabled to each ChipSelect.Option', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" disabled options={[`,
      `  { id: '1', value: 'a', text: 'A', isChecked: false },`,
      `  { id: '2', value: 'b', text: 'B', isChecked: true },`,
      `]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<ChipSelect.Option value="a" disabled>A</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="b" defaultChecked disabled>B</ChipSelect.Option>`)
    // disabled should not appear on the ChipSelect container itself (not on ChipSelect.Option)
    expect(output).not.toMatch(/<ChipSelect(?!\.Option)[^>]*\bdisabled\b/)
  })

  test('does not add disabled to options when disabled={false} is on the parent', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" disabled={false} options={[`,
      `  { id: '1', value: 'a', text: 'A', isChecked: false },`,
      `  { id: '2', value: 'b', text: 'B', isChecked: true },`,
      `]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<ChipSelect.Option value="a">A</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="b" defaultChecked>B</ChipSelect.Option>`)
    expect(output).not.toMatch(/\bdisabled\b/)
  })

  test('propagates disabled={someExpr} to each ChipSelect.Option', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const isDisabled = true`,
      `const el = <ToggleRadio name="r" disabled={isDisabled} options={[`,
      `  { id: '1', value: 'a', text: 'A', isChecked: false },`,
      `  { id: '2', value: 'b', text: 'B', isChecked: true },`,
      `]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<ChipSelect.Option value="a" disabled={isDisabled}>A</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="b" defaultChecked disabled={isDisabled}>B</ChipSelect.Option>`)
    // disabled should not appear on the ChipSelect container itself (not on ChipSelect.Option)
    expect(output).not.toMatch(/<ChipSelect(?!\.Option)[^>]*\bdisabled\b/)
  })

  test('preserves name and other props on the ChipSelect container', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="my-radio" className="foo" options={[{ id: '1', value: 'x', text: 'X', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('name="my-radio"')
    expect(output).toContain('className="foo"')
  })

  test('expands three options correctly', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[`,
      `  { id: '1', value: 'a', text: 'Option A', isChecked: true },`,
      `  { id: '2', value: 'b', text: 'Option B', isChecked: false },`,
      `  { id: '3', value: 'c', text: 'Option C', isChecked: false },`,
      `]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<ChipSelect.Option value="a" defaultChecked>Option A</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="b">Option B</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="c">Option C</ChipSelect.Option>`)
  })

  test('removes hasGreyBg prop from the ChipSelect container and inserts a TODO', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" hasGreyBg options={[{ id: '1', value: 'x', text: 'X', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The prop must be absent from JSX; the prop name may appear in the TODO comment text
    const jsxLines = output.split('\n').filter((l) => !l.trimStart().startsWith('//'))
    expect(jsxLines.join('\n')).not.toContain('hasGreyBg')
    expect(output).toContain('<ChipSelect')
    expect(output).toContain('// TODO (DS-78)')
  })

  test('removes isFullWidth prop from the ChipSelect container and inserts a TODO', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" isFullWidth options={[{ id: '1', value: 'x', text: 'X', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The prop must be absent from JSX; the prop name may appear in the TODO comment text
    const jsxLines = output.split('\n').filter((l) => !l.trimStart().startsWith('//'))
    expect(jsxLines.join('\n')).not.toContain('isFullWidth')
    expect(output).toContain('<ChipSelect')
    expect(output).toContain('// TODO (DS-78)')
  })

  test('does not expand when options is not present', () => {
    // ToggleRadio without options prop — unusual but should not crash
    const input = [`import { ToggleRadio } from '@reapit/elements'`, `<ToggleRadio name="r" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('ChipSelect')
    expect(output).not.toContain('ToggleRadio')
  })

  test('escapes double-quotes and angle brackets in option value and text', () => {
    // value contains a double-quote; text contains an angle bracket
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'say "hi"', text: 'A<B', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`value="say &quot;hi&quot;"`)
    expect(output).toContain(`>A&lt;B<`)
    expect(output).not.toContain(`value="say "hi""`)
    expect(output).not.toContain(`>A<B<`)
  })
})

// ---------------------------------------------------------------------------
// Dynamic options (TODO comment fallback)
// ---------------------------------------------------------------------------

describe('dynamic options (TODO fallback)', () => {
  test('inserts a TODO comment when options is a variable reference', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const opts = []`,
      `const el = <ToggleRadio name="r" options={opts} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO (DS-78)')
    // Tag is still renamed even though options could not be expanded
    expect(output).toContain('<ChipSelect')
    expect(output).not.toContain('<ToggleRadio')
    // options prop must be removed — ChipSelect has no `options` prop
    expect(output).not.toContain('options={opts}')
    // Element must be non-self-closing (has children)
    expect(output).toContain('</ChipSelect>')
  })

  test('inserts a TODO comment when options is a function call', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const el = <ToggleRadio name="r" options={getOptions()} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO (DS-78)')
    expect(output).toContain('<ChipSelect')
    expect(output).not.toContain('options={getOptions()}')
    expect(output).toContain('</ChipSelect>')
  })

  test('inserts a TODO comment when options contains a spread element', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const el = <ToggleRadio name="r" options={[...extraOpts, { id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO (DS-78)')
    expect(output).not.toContain('options={')
    expect(output).toContain('</ChipSelect>')
  })

  test('inserts TODO comment when options contains an entry with a computed value', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const el = <ToggleRadio name="r" options={[{ id: '1', value: someVar, text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO (DS-78)')
    expect(output).not.toContain('options={')
    expect(output).toContain('</ChipSelect>')
  })

  test('inserts a TODO comment for hasGreyBg/isFullWidth removal on dynamic options element', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const el = <ToggleRadio name="r" hasGreyBg options={opts} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // At least one TODO should be present
    expect(output).toContain('// TODO (DS-78)')
    expect(output).not.toContain('hasGreyBg')
    expect(output).not.toContain('options={opts}')
  })

  test('inserts only one TODO per statement when element appears once', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const el = <ToggleRadio name="r" options={opts} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Expect exactly one TODO per statement — dynamic options produces one comment
    const matches = output.match(/\/\/ TODO \(DS-78\)/g)
    expect(matches).not.toBeNull()
    expect(matches!.length).toBe(1)
  })
})

// ---------------------------------------------------------------------------
// ToggleRadioOption type usage
// ---------------------------------------------------------------------------

describe('ToggleRadioOption type usage', () => {
  test('removes ToggleRadioOption from imports', () => {
    const input = [
      `import { ToggleRadio, ToggleRadioOption } from '@reapit/elements'`,
      `const opts: ToggleRadioOption[] = []`,
      `<ToggleRadio name="r" options={opts} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/import[^}]*ToggleRadioOption/)
  })

  test('inserts a TODO comment on remaining ToggleRadioOption type references', () => {
    const input = [
      `import { ToggleRadio, ToggleRadioOption } from '@reapit/elements'`,
      `const opts: ToggleRadioOption[] = []`,
      `<ToggleRadio name="r" options={opts} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO (DS-78)')
  })
})

// ---------------------------------------------------------------------------
// Facade package
// ---------------------------------------------------------------------------

describe('facade package', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [
      `import { ToggleRadio } from '@company/ui'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { ChipSelect } from '@company/ui'`)
    expect(output).not.toContain('@reapit/elements/core/chip-select')
  })
})

// ---------------------------------------------------------------------------
// Import safety
// ---------------------------------------------------------------------------

describe('import safety', () => {
  test('does not migrate local ToggleRadio symbols when there are no @reapit/elements imports', () => {
    const input = [`const ToggleRadio = () => null`, `<ToggleRadio name="r" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('preserves namespace imports on the same specifier', () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { ToggleRadio } from '@reapit/elements'`,
      `<ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import * as Elements from '@reapit/elements'`)
    expect(output).toContain(`import { ChipSelect } from '@reapit/elements/core/chip-select'`)
  })

  test('removes unused ToggleRadio import without adding ChipSelect when no JSX is present', () => {
    // Importing ToggleRadio but only as a type or without JSX usage
    const input = `import { ToggleRadio } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    // Import should be cleaned up since it's now empty
    expect(output).not.toContain('ToggleRadio')
  })
})

// ---------------------------------------------------------------------------
// Multiple elements and real-world patterns
// ---------------------------------------------------------------------------

describe('real-world patterns', () => {
  test('handles multiple ToggleRadio elements in the same file', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const a = <ToggleRadio name="a" options={[{ id: '1', value: 'x', text: 'X', isChecked: true }]} />`,
      `const b = <ToggleRadio name="b" options={[{ id: '2', value: 'y', text: 'Y', isChecked: false }]} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ToggleRadio')
    const chipSelectCount = (output.match(/<ChipSelect(?!\.)[^/]*>/g) ?? []).length
    expect(chipSelectCount).toBe(2)
  })

  test('handles a file with both ToggleRadio and other components', () => {
    const input = [
      `import { ToggleRadio, Button } from '@reapit/elements'`,
      `const el = <ToggleRadio name="r" options={[{ id: '1', value: 'a', text: 'A', isChecked: false }]} />`,
      `const btn = <Button>Click</Button>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<ChipSelect')
    expect(output).toContain('<Button>Click</Button>')
    expect(output).toContain(`import { Button } from '@reapit/elements'`)
  })

  test('mirrors the toggle.stories.tsx ToggleRadioDefault pattern', () => {
    const input = [
      `import { ToggleRadio } from '@reapit/elements'`,
      `const el = (`,
      `  <ToggleRadio`,
      `    name="my-cool-toggle-radio"`,
      `    options={[`,
      `      {`,
      `        id: 'option-1',`,
      `        value: 'option-1',`,
      `        text: 'Option 1',`,
      `        isChecked: true,`,
      `      },`,
      `      {`,
      `        id: 'option-2',`,
      `        value: 'option-2',`,
      `        text: 'Option 2',`,
      `        isChecked: false,`,
      `      },`,
      `    ]}`,
      `  />`,
      `)`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { ChipSelect } from '@reapit/elements/core/chip-select'`)
    expect(output).not.toContain('ToggleRadio')
    expect(output).toContain(`<ChipSelect.Option value="option-1" defaultChecked>Option 1</ChipSelect.Option>`)
    expect(output).toContain(`<ChipSelect.Option value="option-2">Option 2</ChipSelect.Option>`)
    expect(output).toContain('name="my-cool-toggle-radio"')
    expect(output).toContain('</ChipSelect>')
  })
})
