import transform from '../transform'

// ---------------------------------------------------------------------------
// 1. No-op -- file without any DeprecatedTag string
// ---------------------------------------------------------------------------

describe('no-op', () => {
  test('returns source unchanged when DeprecatedTag is absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>hi</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('returns source unchanged for empty string', () => {
    expect(transform('', 'file.tsx')).toBe('')
  })
})

// ---------------------------------------------------------------------------
// 2. Import transformations
// ---------------------------------------------------------------------------

describe('import transformations', () => {
  test('basic rename -- DeprecatedTag -> Tag', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `<DeprecatedTag>text</DeprecatedTag>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).toContain('Tag')
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('basic rename -- DeprecatedTagGroup -> TagGroup', () => {
    const input = [
      `import { DeprecatedTagGroup, DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>text</DeprecatedTag></DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
    expect(output).toContain('TagGroup')
    expect(output).not.toContain('DeprecatedTagGroup')
  })

  test('aliased import -- preserves alias', () => {
    const input = [`import { DeprecatedTag as MyTag } from '@reapit/elements'`, `<MyTag>text</MyTag>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Tag as MyTag')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('type-only import', () => {
    const input = [`import { type DeprecatedTag } from '@reapit/elements'`, `<DeprecatedTag>text</DeprecatedTag>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Tag')
    expect(output).toContain("from '@reapit/elements/core/tag'")
  })

  test('mixed named imports -- preserves others', () => {
    const input = [
      `import { DeprecatedTag, Input } from '@reapit/elements'`,
      `<DeprecatedTag>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Input')
    expect(output).toContain("from '@reapit/elements'")
    expect(output).toContain('Tag')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('removes DeprecatedTagProps import', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagProps } from '@reapit/elements'`,
      `const props: DeprecatedTagProps = {}`,
      `<DeprecatedTag>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('DeprecatedTagProps')
    expect(output).toContain('Tag')
  })

  test('removes ElDeprecatedTag import', () => {
    const input = `import { ElDeprecatedTag } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedTag')
  })

  test('removes ElDeprecatedTagGroup import', () => {
    const input = `import { ElDeprecatedTagGroup } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedTagGroup')
  })

  test('removes ElDeprecatedTagGroupInner import', () => {
    const input = `import { ElDeprecatedTagGroupInner } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedTagGroupInner')
  })

  test('empty declaration cleanup -- removes entire import when all deprecated', () => {
    const input = `import { ElDeprecatedTag, ElDeprecatedTagGroup } from '@reapit/elements'\nexport {}`
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into an existing target import declaration for Tag', () => {
    const input = [
      `import { Tag } from '@reapit/elements/core/tag'`,
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Should not have two separate tag imports
    const matches = output.match(/from '@reapit\/elements\/core\/tag'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('Tag')
  })

  test('merges into an existing target import declaration for TagGroup', () => {
    const input = [
      `import { TagGroup } from '@reapit/elements/core/tag-group'`,
      `import { DeprecatedTagGroup, DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>text</DeprecatedTag></DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/tag-group'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('TagGroup')
  })

  test('already-migrated import -- skips @reapit/elements/core/tag declaration', () => {
    const input = `import { Tag } from '@reapit/elements/core/tag'`
    const output = transform(input, 'file.tsx')
    // Nothing to change -- no DeprecatedTag present -> early return
    expect(output).toBe(input)
  })

  test('splits Tag and TagGroup into separate subpath imports', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>grouped</DeprecatedTag></DeprecatedTagGroup>`,
      `<DeprecatedTag>standalone</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
  })

  test('only imports TagGroup (not Tag) when all tags are inside groups', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>grouped</DeprecatedTag></DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
    expect(output).toContain('TagGroup')
    expect(output).not.toContain("from '@reapit/elements/core/tag'")
  })

  test('only imports Tag (not TagGroup) when there are no groups', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag>standalone</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).not.toContain("from '@reapit/elements/core/tag-group'")
  })
})

// ---------------------------------------------------------------------------
// 3. Subpath import support
// ---------------------------------------------------------------------------

describe('subpath import support', () => {
  test('migrates DeprecatedTag from @reapit/elements/deprecated/tag subpath', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements/deprecated/tag'`,
      `<DeprecatedTag>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).toContain('<Tag>')
    expect(output).not.toContain('<DeprecatedTag')
    expect(output).not.toContain("from '@reapit/elements/deprecated/tag'")
  })

  test('migrates DeprecatedTagGroup from @reapit/elements/deprecated/tag subpath', () => {
    const input = [
      `import { DeprecatedTagGroup, DeprecatedTag } from '@reapit/elements/deprecated/tag'`,
      `<DeprecatedTagGroup><DeprecatedTag>grouped</DeprecatedTag></DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
    expect(output).toContain('TagGroup')
    expect(output).not.toContain('DeprecatedTagGroup')
    expect(output).not.toContain("from '@reapit/elements/deprecated/tag'")
  })

  test('removes El* styled imports from @reapit/elements/deprecated/tag subpath', () => {
    const input = `import { ElDeprecatedTag, ElDeprecatedTagGroup } from '@reapit/elements/deprecated/tag'\nexport {}`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedTag')
    expect(output).not.toContain('ElDeprecatedTagGroup')
    expect(output).not.toContain("from '@reapit/elements/deprecated/tag'")
  })

  test('preserves non-deprecated specifiers from the same subpath import', () => {
    const input = [
      `import { DeprecatedTag, SomeOtherExport } from '@reapit/elements/deprecated/tag'`,
      `<DeprecatedTag>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('SomeOtherExport')
    expect(output).toContain("from '@reapit/elements/deprecated/tag'")
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).not.toContain('<DeprecatedTag')
  })
})

// ---------------------------------------------------------------------------
// 4. Facade package support
// ---------------------------------------------------------------------------

describe('facade package support', () => {
  test('imports Tag from the same facade specifier (not a subpath)', () => {
    const input = [`import { DeprecatedTag } from '@company/ui'`, `<DeprecatedTag>text</DeprecatedTag>`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain("from '@company/ui'")
    expect(output).toContain('Tag')
    expect(output).not.toContain('<DeprecatedTag')
    // Must NOT add a subpath
    expect(output).not.toContain('/core/tag')
  })

  test('facade subpath import stays at the same specifier', () => {
    const input = [`import { DeprecatedTag } from '@company/ui/elements'`, `<DeprecatedTag>text</DeprecatedTag>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain("from '@company/ui/elements'")
    expect(output).toContain('Tag')
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('non-facade import is not transformed when facade is specified', () => {
    const input = [`import { DeprecatedTag } from '@other/lib'`, `<DeprecatedTag>text</DeprecatedTag>`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    // @other/lib is not @reapit/elements or @company/ui -- should be left alone
    expect(output).toContain('DeprecatedTag')
    expect(output).toContain("from '@other/lib'")
  })

  test('direct @reapit/elements import is rewritten to subpath when facadePackage is set', () => {
    const input = [
      `import { DeprecatedTag } from '@company/ui'`,
      `import { DeprecatedTag as RTag } from '@reapit/elements'`,
      `<DeprecatedTag>text</DeprecatedTag>`,
      `<RTag>text2</RTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).not.toContain('<DeprecatedTag')
    // Facade import should stay at the facade specifier
    expect(output).toContain("from '@company/ui'")
    // @reapit/elements import should be rewritten to the canonical subpath, not the facade
    expect(output).toContain("import { Tag as RTag } from '@reapit/elements/core/tag'")
    expect(output).not.toContain("from '@reapit/elements'")
  })

  test('facade imports both Tag and TagGroup at the same specifier', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@company/ui/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>grouped</DeprecatedTag></DeprecatedTagGroup>`,
      `<DeprecatedTag>standalone</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain("from '@company/ui/elements'")
    expect(output).toContain('Tag')
    expect(output).toContain('TagGroup')
    expect(output).not.toContain('<DeprecatedTag')
    expect(output).not.toContain('<DeprecatedTagGroup')
    // Should NOT add @reapit/elements subpath imports
    expect(output).not.toContain('@reapit/elements')
  })
})

// ---------------------------------------------------------------------------
// 4. Type references
// ---------------------------------------------------------------------------

describe('type reference transformations', () => {
  test('type annotation', () => {
    const input = [
      `import { DeprecatedTagProps } from '@reapit/elements'`,
      `const props: DeprecatedTagProps = {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Tag.Props')
    expect(output).not.toContain('DeprecatedTagProps')
  })

  test('interface extends', () => {
    const input = [
      `import { DeprecatedTagProps } from '@reapit/elements'`,
      `interface MyProps extends DeprecatedTagProps { extra: string }`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('extends Tag.Props')
    expect(output).not.toContain('DeprecatedTagProps')
  })

  test('generic type argument', () => {
    const input = [
      `import { DeprecatedTagProps } from '@reapit/elements'`,
      `type Mapped = Partial<DeprecatedTagProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Partial<Tag.Props>')
    expect(output).not.toContain('DeprecatedTagProps')
  })

  test('multiple type references all rewritten', () => {
    const input = [
      `import { DeprecatedTagProps } from '@reapit/elements'`,
      `const a: DeprecatedTagProps = {}`,
      `const b: DeprecatedTagProps = {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('DeprecatedTagProps')
    const count = (output.match(/Tag\.Props/g) ?? []).length
    expect(count).toBeGreaterThanOrEqual(2)
  })
})

// ---------------------------------------------------------------------------
// 5. JSX -- standalone DeprecatedTag -> Tag
// ---------------------------------------------------------------------------

describe('JSX standalone DeprecatedTag transformations', () => {
  test('element rename -- self-closing', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `<DeprecatedTag />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<Tag')
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('element rename -- with children', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `<DeprecatedTag>hello</DeprecatedTag>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<Tag')
    expect(output).toContain('</Tag>')
    expect(output).not.toContain('<DeprecatedTag')
    expect(output).not.toContain('</DeprecatedTag>')
  })

  test('inserts standalone TODO comment', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `<DeprecatedTag>hello</DeprecatedTag>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TODO: Standalone DeprecatedTag migrated to Tag')
    // Comment must appear before the Tag
    const commentIndex = output.indexOf('TODO: Standalone DeprecatedTag')
    const tagIndex = output.indexOf('<Tag')
    expect(commentIndex).toBeLessThan(tagIndex)
  })

  test('intent prop is removed', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag intent="primary">text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/intent=/)
  })

  test('intent prop removal inserts intent TODO comment', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag intent="primary">text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TODO: intent prop removed')
  })

  test('no intent prop -- no intent TODO comment', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `<DeprecatedTag>text</DeprecatedTag>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('intent prop removed')
    // Still has the standalone TODO
    expect(output).toContain('TODO: Standalone DeprecatedTag migrated to Tag')
  })

  test('dynamic intent expression -- removed with TODO', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag intent={dynamicValue}>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/intent=/)
    expect(output).toContain('TODO: intent prop removed')
  })

  test('bare intent attribute -- removed with TODO', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag intent>text</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Bare intent attribute (e.g. <Tag intent>) should not remain in JSX
    expect(output).not.toMatch(/<Tag[^>]*\sintent[\s/>]/)
    expect(output).toContain('TODO: intent prop removed')
  })

  test('preserves other props', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag className="foo" data-testid="bar" intent="danger">txt</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('className="foo"')
    expect(output).toContain('data-testid="bar"')
    expect(output).not.toMatch(/intent=/)
  })

  test('alias preservation -- aliased tag name is preserved', () => {
    const input = [`import { DeprecatedTag as T } from '@reapit/elements'`, `<T intent="success">text</T>`].join('\n')
    const output = transform(input, 'file.tsx')
    // Tag name remains 'T' (alias preserved)
    expect(output).toContain('<T')
    expect(output).not.toMatch(/intent=/)
    expect(output).toContain('TODO: intent prop removed')
  })
})

// ---------------------------------------------------------------------------
// 6. JSX -- DeprecatedTag inside DeprecatedTagGroup -> TagGroup.Item
// ---------------------------------------------------------------------------

describe('JSX DeprecatedTag inside group transformations', () => {
  test('DeprecatedTag children become TagGroup.Item', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag>text</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup.Item')
    expect(output).toContain('</TagGroup.Item>')
    expect(output).not.toContain('<DeprecatedTag')
    expect(output).not.toContain('</DeprecatedTag>')
  })

  test('intent prop is removed from group children', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag intent="success">text</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/intent=/)
    expect(output).toContain('TODO: intent prop removed')
  })

  test('no standalone TODO for tags inside a group', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag>text</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('Standalone DeprecatedTag migrated to Tag')
  })

  test('no intent on group child -- no intent TODO', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag>text</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('intent prop removed')
  })

  test('multiple children all become TagGroup.Item', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag intent="primary">A</DeprecatedTag>`,
      `  <DeprecatedTag intent="success">B</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const itemCount = (output.match(/<TagGroup\.Item/g) ?? []).length
    expect(itemCount).toBe(2)
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('self-closing DeprecatedTag inside group becomes TagGroup.Item', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag />`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup.Item')
    expect(output).not.toContain('<DeprecatedTag')
  })

  test('preserves other props on group children', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag className="foo" intent="warning">text</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('className="foo"')
    expect(output).not.toMatch(/intent=/)
  })

  test('aliased DeprecatedTag inside group -- adds TODO for manual fix', () => {
    const input = [
      `import { DeprecatedTag as T, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <T>text</T>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // JSX tag name stays as T (alias preserved)
    expect(output).toContain('<T>')
    expect(output).toContain('</T>')
    // Should have a TODO comment warning about the alias resolving to Tag
    expect(output).toContain('TODO')
    expect(output).toContain('TagGroup.Item')
  })
})

// ---------------------------------------------------------------------------
// 7. JSX -- DeprecatedTagGroup -> TagGroup
// ---------------------------------------------------------------------------

describe('JSX DeprecatedTagGroup transformations', () => {
  test('renames DeprecatedTagGroup to TagGroup', () => {
    const input = [
      `import { DeprecatedTagGroup, DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>hi</DeprecatedTag></DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup>')
    expect(output).toContain('</TagGroup>')
    expect(output).not.toContain('<DeprecatedTagGroup')
    expect(output).not.toContain('</DeprecatedTagGroup>')
  })

  test('self-closing DeprecatedTagGroup', () => {
    const input = [`import { DeprecatedTagGroup } from '@reapit/elements'`, `<DeprecatedTagGroup />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup')
    expect(output).not.toContain('<DeprecatedTagGroup')
  })

  test('handles multiple sibling DeprecatedTagGroup elements', () => {
    const input = [
      `import { DeprecatedTagGroup, DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTagGroup><DeprecatedTag>first</DeprecatedTag></DeprecatedTagGroup>`,
      `<DeprecatedTagGroup><DeprecatedTag>second</DeprecatedTag></DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const tagGroupCount = (output.match(/<TagGroup>/g) ?? []).length
    expect(tagGroupCount).toBe(2)
    expect(output).not.toContain('<DeprecatedTagGroup')
  })

  test('aliased DeprecatedTagGroup -- preserves alias in JSX', () => {
    const input = [
      `import { DeprecatedTagGroup as TG, DeprecatedTag } from '@reapit/elements'`,
      `<TG><DeprecatedTag>text</DeprecatedTag></TG>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Import should become TagGroup as TG
    expect(output).toContain('TagGroup as TG')
    // JSX tag name should stay as TG (not be overwritten to TagGroup)
    expect(output).toContain('<TG>')
    expect(output).toContain('</TG>')
    expect(output).not.toContain('<TagGroup>')
  })

  test('aliased DeprecatedTagGroup -- self-closing preserves alias', () => {
    const input = [`import { DeprecatedTagGroup as TG } from '@reapit/elements'`, `<TG />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TagGroup as TG')
    expect(output).toContain('<TG')
    expect(output).not.toContain('<TagGroup')
  })
})

// ---------------------------------------------------------------------------
// 8. Styled component import removal
// ---------------------------------------------------------------------------

describe('styled component import removal', () => {
  test('removes all three El* imports in one declaration', () => {
    const input = [
      `import { ElDeprecatedTag, ElDeprecatedTagGroup, ElDeprecatedTagGroupInner } from '@reapit/elements'`,
      `export {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedTag')
    expect(output).not.toContain('ElDeprecatedTagGroup')
    expect(output).not.toContain('ElDeprecatedTagGroupInner')
  })

  test('cleans up empty import declaration after El* removal', () => {
    const input = `import { ElDeprecatedTag } from '@reapit/elements'\nexport {}`
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })
})

// ---------------------------------------------------------------------------
// 9. Multiple occurrences -- mixed standalone and group
// ---------------------------------------------------------------------------

describe('multiple occurrences', () => {
  test('all DeprecatedTag elements in one file are transformed', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `<DeprecatedTag intent="success">A</DeprecatedTag>`,
      `<DeprecatedTag intent="danger">B</DeprecatedTag>`,
      `<DeprecatedTag>C</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('<DeprecatedTag')
    const tagCount = (output.match(/<Tag[\s>]/g) ?? []).length
    expect(tagCount).toBe(3)
  })

  test('mixed standalone DeprecatedTag and DeprecatedTagGroup', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag intent="warning">Grouped</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
      `<DeprecatedTag intent="success">Standalone</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // JSX tag names must be gone
    expect(output).not.toContain('<DeprecatedTag')
    expect(output).not.toContain('</DeprecatedTag>')
    expect(output).not.toContain('<DeprecatedTagGroup')
    expect(output).not.toContain('</DeprecatedTagGroup>')
    // Grouped child becomes TagGroup.Item
    expect(output).toContain('<TagGroup.Item')
    expect(output).toContain('</TagGroup.Item>')
    // Standalone becomes Tag
    expect(output).toContain('<Tag')
    expect(output).toContain('</Tag>')
    // Group wrapper becomes TagGroup
    expect(output).toContain('<TagGroup>')
    expect(output).toContain('</TagGroup>')
    // Has both import paths
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
  })

  test('file with only DeprecatedTagGroup usage (no standalone tags)', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag>A</DeprecatedTag>`,
      `  <DeprecatedTag>B</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Only TagGroup import needed -- Tag is handled internally by TagGroup.Item
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
    expect(output).not.toContain("from '@reapit/elements/core/tag'")
    expect(output).toContain('<TagGroup>')
    expect(output).toContain('<TagGroup.Item')
  })
})

// ---------------------------------------------------------------------------
// 10. DeprecatedTagProps triggers Tag import
// ---------------------------------------------------------------------------

describe('DeprecatedTagProps triggers Tag import', () => {
  test('DeprecatedTagProps reference without JSX still adds Tag import', () => {
    const input = [
      `import { DeprecatedTagProps } from '@reapit/elements'`,
      `const props: DeprecatedTagProps = {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag'")
    expect(output).toContain('Tag')
    expect(output).toContain('Tag.Props')
  })
})

// ---------------------------------------------------------------------------
// 11. Ancestor-walking isInsideTagGroup (conditionals and fragments)
// ---------------------------------------------------------------------------

describe('isInsideTagGroup -- ancestor walking', () => {
  test('conditional expression inside group becomes TagGroup.Item (not standalone Tag)', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  {condition && <DeprecatedTag>cond</DeprecatedTag>}`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup.Item')
    expect(output).not.toContain('Standalone DeprecatedTag')
  })

  test('self-closing DeprecatedTag inside conditional inside group becomes TagGroup.Item', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  {condition && <DeprecatedTag />}`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup.Item')
    expect(output).not.toContain('Standalone DeprecatedTag')
  })

  test('DeprecatedTag inside fragment inside group becomes TagGroup.Item', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <>`,
      `    <DeprecatedTag>frag</DeprecatedTag>`,
      `  </>`,
      `</DeprecatedTagGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup.Item')
    expect(output).not.toContain('Standalone DeprecatedTag')
  })

  test('DeprecatedTag outside group is still treated as standalone', () => {
    const input = [
      `import { DeprecatedTag, DeprecatedTagGroup } from '@reapit/elements'`,
      `<DeprecatedTagGroup>`,
      `  <DeprecatedTag>inside</DeprecatedTag>`,
      `</DeprecatedTagGroup>`,
      `<DeprecatedTag>outside</DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TagGroup.Item')
    expect(output).toContain('<Tag')
    expect(output).toContain('Standalone DeprecatedTag')
  })
})

// ---------------------------------------------------------------------------
// 12. Non-JSX identifier references
// ---------------------------------------------------------------------------

describe('non-JSX identifier references', () => {
  test('DeprecatedTag used as a value reference is rewritten to Tag', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `const Cmp = DeprecatedTag`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const Cmp = Tag')
    expect(output).not.toContain('DeprecatedTag')
  })

  test('DeprecatedTag in ComponentProps generic is rewritten to Tag', () => {
    const input = [
      `import { DeprecatedTag } from '@reapit/elements'`,
      `import { ComponentProps } from 'react'`,
      `type T = ComponentProps<typeof DeprecatedTag>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('ComponentProps<typeof Tag>')
    expect(output).not.toContain('DeprecatedTag')
  })

  test('DeprecatedTagGroup in typeof expression is rewritten to TagGroup', () => {
    const input = [`import { DeprecatedTagGroup } from '@reapit/elements'`, `type T = typeof DeprecatedTagGroup`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('typeof TagGroup')
    expect(output).not.toContain('DeprecatedTagGroup')
  })

  test('non-JSX DeprecatedTag reference still triggers Tag import', () => {
    const input = [`import { DeprecatedTag } from '@reapit/elements'`, `const Cmp = DeprecatedTag`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/tag'")
  })
})

// ---------------------------------------------------------------------------
// 13. TagGroup import fallback (snippet without import declarations)
// ---------------------------------------------------------------------------

describe('TagGroup import fallback', () => {
  test('snippet with DeprecatedTagGroup JSX but no imports still gets a TagGroup import', () => {
    // Snippet inputs have no import declarations; the codemod must still add the import.
    const input = [`<DeprecatedTagGroup>`, `  <DeprecatedTag>item</DeprecatedTag>`, `</DeprecatedTagGroup>`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TagGroup')
    expect(output).toContain("from '@reapit/elements/core/tag-group'")
  })
})
