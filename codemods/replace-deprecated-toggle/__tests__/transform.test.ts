import transform from '../transform'

const TARGET = '@reapit/elements/core/switch'

describe('upgrade-deprecated-toggle', () => {
  // ---------------------------------------------------------------------------
  // No-op cases
  // ---------------------------------------------------------------------------

  describe('no-op', () => {
    test('returns source unchanged when Toggle string is absent', () => {
      const input = `import { Button } from '@reapit/elements'\n<Button />`
      expect(transform(input, 'file.tsx')).toBe(input)
    })

    test('returns empty string unchanged', () => {
      expect(transform('', 'file.tsx')).toBe('')
    })

    test('returns source unchanged when only ToggleRadio is present', () => {
      const input = `
import { ToggleRadio } from '@reapit/elements'
<ToggleRadio options={[]} name="x" />
`
      expect(transform(input, 'file.tsx')).toBe(input)
    })
  })

  // ---------------------------------------------------------------------------
  // Import transformations
  // ---------------------------------------------------------------------------

  describe('import transformations', () => {
    test('rewrites Toggle import to Switch at subpath specifier', () => {
      const input = `import { Toggle } from '@reapit/elements'\n<Toggle id="x" />`
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`import { Switch } from '${TARGET}'`)
      expect(output).not.toContain(`from '@reapit/elements'\n`)
      expect(output).not.toContain('Toggle')
    })

    test('preserves alias when Toggle is aliased', () => {
      const input = `import { Toggle as T } from '@reapit/elements'\n<T id="x" />`
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`import { Switch as T } from '${TARGET}'`)
      expect(output).toContain('<T ')
    })

    test('removes ToggleProps import and rewrites type references', () => {
      const input = `import { ToggleProps } from '@reapit/elements'\nconst p: ToggleProps = {}`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('ToggleProps')
      expect(output).toContain('Switch.Props')
    })

    test('removes ElToggleItem from import', () => {
      const input = `import { Toggle, ElToggleItem } from '@reapit/elements'\n<Toggle><ElToggleItem>On</ElToggleItem></Toggle>`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('ElToggleItem')
      expect(output).toContain(`import { Switch } from '${TARGET}'`)
    })

    test('removes ElToggleCheckbox and ElToggleLabel from import', () => {
      const input = `import { ElToggleCheckbox, ElToggleLabel } from '@reapit/elements'`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('ElToggleCheckbox')
      expect(output).not.toContain('ElToggleLabel')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })

    test('removes elToggleFullWidth and elHasGreyBg from import', () => {
      const input = `import { elToggleFullWidth, elHasGreyBg } from '@reapit/elements'`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('elToggleFullWidth')
      expect(output).not.toContain('elHasGreyBg')
    })

    test('removes handleKeyboardToggleChange from import', () => {
      const input = `import { handleKeyboardToggleChange } from '@reapit/elements'`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('handleKeyboardToggleChange')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })

    test('removes ToggleWrapped from import', () => {
      const input = `import { ToggleWrapped } from '@reapit/elements'`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('ToggleWrapped')
      expect(output).not.toContain(`from '@reapit/elements'`)
    })

    test('cleans up empty import declaration when all specifiers are removed', () => {
      const input = `import { ElToggleItem, ElToggleCheckbox } from '@reapit/elements'`
      const output = transform(input, 'file.tsx')
      expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
    })

    test('merges into existing @reapit/elements/core/switch import', () => {
      const input = [
        `import { Switch } from '${TARGET}'`,
        `import { Toggle } from '@reapit/elements'`,
        `<Toggle id="x" />`,
      ].join('\n')
      const output = transform(input, 'file.tsx')
      const matches = output.match(new RegExp(`from '${TARGET.replace(/\//g, '\\/')}'`, 'g'))
      expect(matches).toHaveLength(1)
    })

    test('preserves unrelated imports alongside deprecated ones', () => {
      const input = `import { Toggle, Input } from '@reapit/elements'\n<Toggle id="x" />`
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`import { Input } from '@reapit/elements'`)
      expect(output).toContain(`import { Switch } from '${TARGET}'`)
    })

    test('leaves ToggleRadio import untouched when alongside Toggle', () => {
      const input = `import { Toggle, ToggleRadio } from '@reapit/elements'\n<Toggle id="x" />`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('ToggleRadio')
      expect(output).toContain(`import { Switch } from '${TARGET}'`)
    })
  })

  // ---------------------------------------------------------------------------
  // Facade package support
  // ---------------------------------------------------------------------------

  describe('facade package', () => {
    test('keeps facade package specifier when facadePackage option is set', () => {
      const input = `import { Toggle } from '@company/ui'\n<Toggle id="x" />`
      const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
      expect(output).toContain(`import { Switch } from '@company/ui'`)
      expect(output).not.toContain(TARGET)
    })

    test('does not transform non-facade specifier without the option', () => {
      const input = `import { Toggle } from '@company/ui'\n<Toggle id="x" />`
      const output = transform(input, 'file.tsx')
      // No facade option → treated as unrelated import
      expect(output).toBe(input)
    })
  })

  // ---------------------------------------------------------------------------
  // Type reference transformations
  // ---------------------------------------------------------------------------

  describe('type reference transformations', () => {
    test('rewrites ToggleProps type annotation to Switch.Props', () => {
      const input = `import { ToggleProps } from '@reapit/elements'\nconst p: ToggleProps = {}`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('Switch.Props')
      expect(output).not.toContain('ToggleProps')
    })

    test('rewrites ToggleProps in interface extends clause', () => {
      const input = `import { ToggleProps } from '@reapit/elements'\ninterface MyProps extends ToggleProps {}`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('extends Switch.Props')
      expect(output).not.toContain('ToggleProps')
    })

    test('rewrites multiple ToggleProps references', () => {
      const input = [
        `import { ToggleProps } from '@reapit/elements'`,
        `const a: ToggleProps = {}`,
        `const b: ToggleProps = {}`,
      ].join('\n')
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('ToggleProps')
      const count = (output.match(/Switch\.Props/g) ?? []).length
      expect(count).toBeGreaterThanOrEqual(2)
    })
  })

  // ---------------------------------------------------------------------------
  // JSX — with text labels
  // ---------------------------------------------------------------------------

  describe('JSX element transformations — with text labels', () => {
    test('extracts first ElToggleItem text as label prop', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x"><ElToggleItem>On</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('label="On"')
      expect(output).not.toContain('<ElToggleItem>')
      expect(output).not.toContain('</Toggle>')
    })

    test('preserves existing props (id, className, checked, onChange)', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="tog" className="my-class" checked onChange={handler}>
  <ElToggleItem>Yes</ElToggleItem>
  <ElToggleItem>No</ElToggleItem>
</Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('id="tog"')
      expect(output).toContain('className="my-class"')
      expect(output).toContain('checked')
      expect(output).toContain('onChange={handler}')
      expect(output).toContain('label="Yes"')
    })

    test('escapes double quotes in extracted label text', () => {
      // JSX text nodes can contain literal double quotes — ts-morph returns them
      // as-is, so escapeJsxAttributeValue must convert " to &quot; to avoid
      // producing broken JSX attribute syntax.
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x"><ElToggleItem>Say "hello"</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('label="Say &quot;hello&quot;"')
    })

    test('escapes ampersands in extracted label text', () => {
      // A literal & in JSX text is returned as-is by ts-morph — it must be
      // escaped to &amp; so the JSX attribute value remains valid.
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x"><ElToggleItem>A & B</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('label="A &amp; B"')
    })

    test('handles aliased Toggle usage with text labels', () => {
      const input = `
import { Toggle as Tog } from '@reapit/elements'
<Tog id="x"><ElToggleItem>On</ElToggleItem><ElToggleItem>Off</ElToggleItem></Tog>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('label="On"')
      expect(output).toContain('<Tog ')
      expect(output).not.toContain('</Tog>')
    })
  })

  // ---------------------------------------------------------------------------
  // JSX — switch style (empty ElToggleItem children)
  // ---------------------------------------------------------------------------

  describe('JSX element transformations — switch style (empty children)', () => {
    test('adds aria-label placeholder when ElToggleItem children are self-closing', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x"><ElToggleItem /><ElToggleItem /></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('aria-label="TODO: add accessible label"')
      expect(output).not.toContain('<ElToggleItem')
    })
  })

  // ---------------------------------------------------------------------------
  // JSX — self-closing
  // ---------------------------------------------------------------------------

  describe('JSX element transformations — self-closing', () => {
    test('adds aria-label placeholder to self-closing Toggle', () => {
      const input = `import { Toggle } from '@reapit/elements'\n<Toggle id="x" />`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('<Switch ')
      expect(output).toContain('aria-label="TODO: add accessible label"')
    })

    test('does not add aria-label when label prop already exists', () => {
      const input = `import { Toggle } from '@reapit/elements'\n<Toggle id="x" label="My toggle" />`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('aria-label')
      expect(output).toContain('label="My toggle"')
    })

    test('does not add aria-label when aria-label prop already exists', () => {
      const input = `import { Toggle } from '@reapit/elements'\n<Toggle id="x" aria-label="My toggle" />`
      const output = transform(input, 'file.tsx')
      const ariaLabelCount = (output.match(/aria-label=/g) ?? []).length
      expect(ariaLabelCount).toBe(1)
      expect(output).not.toContain('TODO: add accessible label')
    })
  })

  // ---------------------------------------------------------------------------
  // JSX — explicit label on non-self-closing element
  // ---------------------------------------------------------------------------

  describe('JSX element transformations — explicit label on opening element', () => {
    test('does not duplicate label when label prop already exists alongside ElToggleItem children', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x" label="Existing">
  <ElToggleItem>On</ElToggleItem>
  <ElToggleItem>Off</ElToggleItem>
</Toggle>
`
      const output = transform(input, 'file.tsx')
      const labelCount = (output.match(/label=/g) ?? []).length
      expect(labelCount).toBe(1)
      expect(output).toContain('label="Existing"')
      expect(output).not.toContain('aria-label')
    })

    test('does not duplicate aria-label when aria-label prop already exists alongside ElToggleItem children', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x" aria-label="Existing">
  <ElToggleItem>On</ElToggleItem>
  <ElToggleItem>Off</ElToggleItem>
</Toggle>
`
      const output = transform(input, 'file.tsx')
      const ariaLabelCount = (output.match(/aria-label=/g) ?? []).length
      expect(ariaLabelCount).toBe(1)
      expect(output).toContain('aria-label="Existing"')
      expect(output).not.toContain('label="On"')
    })
  })

  // ---------------------------------------------------------------------------
  // JSX — dynamic content
  // ---------------------------------------------------------------------------

  describe('JSX element transformations — dynamic content', () => {
    test('uses JSX expression syntax when ElToggleItem contains a variable', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle id="x"><ElToggleItem>{label}</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('label={label}')
    })
  })

  // ---------------------------------------------------------------------------
  // Prop removal
  // ---------------------------------------------------------------------------

  describe('prop removal', () => {
    test('removes hasGreyBg prop', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle hasGreyBg><ElToggleItem>On</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('hasGreyBg')
      expect(output).toContain('label="On"')
    })

    test('removes isFullWidth prop', () => {
      const input = `
import { Toggle } from '@reapit/elements'
<Toggle isFullWidth><ElToggleItem>On</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
`
      const output = transform(input, 'file.tsx')
      expect(output).not.toContain('isFullWidth')
      expect(output).toContain('label="On"')
    })
  })

  // ---------------------------------------------------------------------------
  // Multiple occurrences
  // ---------------------------------------------------------------------------

  describe('multiple occurrences', () => {
    test('transforms all Toggle elements in a single file', () => {
      const input = `
import { Toggle } from '@reapit/elements'

const A = () => (
  <Toggle id="a"><ElToggleItem>On</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
)

const B = () => <Toggle id="b" />
`
      const output = transform(input, 'file.tsx')
      expect(output).toContain('label="On"')
      expect(output).toContain('aria-label="TODO: add accessible label"')
      expect(output).not.toContain('<Toggle')
      expect(output).not.toContain('</Toggle>')
    })
  })

  // ---------------------------------------------------------------------------
  // ToggleRadio is untouched
  // ---------------------------------------------------------------------------

  describe('ToggleRadio coexistence', () => {
    test('leaves ToggleRadio JSX and imports intact when both Toggle and ToggleRadio are used', () => {
      const input = `
import { Toggle, ToggleRadio } from '@reapit/elements'

const A = () => (
  <Toggle id="tog"><ElToggleItem>On</ElToggleItem><ElToggleItem>Off</ElToggleItem></Toggle>
)

const B = () => (
  <ToggleRadio options={opts} name="grp" />
)
`
      const output = transform(input, 'file.tsx')
      // Toggle is migrated
      expect(output).toContain(`import { Switch } from '${TARGET}'`)
      expect(output).toContain('label="On"')
      expect(output).not.toMatch(/<Toggle[^R]/)
      // ToggleRadio is untouched
      expect(output).toContain('ToggleRadio')
      expect(output).toContain('<ToggleRadio')
    })
  })
})
