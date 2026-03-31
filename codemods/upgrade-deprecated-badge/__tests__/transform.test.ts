import transform from '../transform'

// ---------------------------------------------------------------------------
// 1. No-op — file without any DeprecatedBadge string
// ---------------------------------------------------------------------------

describe('no-op', () => {
  test('returns source unchanged when DeprecatedBadge is absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button colour="neutral">hi</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('returns source unchanged for empty string', () => {
    expect(transform('', 'file.tsx')).toBe('')
  })
})

// ---------------------------------------------------------------------------
// 2. Import transforms
// ---------------------------------------------------------------------------

describe('import transformations', () => {
  test('basic rename — DeprecatedBadge → Badge', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/badge'")
    expect(output).toContain('Badge')
    expect(output).not.toContain('DeprecatedBadge')
  })

  test('aliased import — preserves alias', () => {
    const input = `import { DeprecatedBadge as MyBadge } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Badge as MyBadge')
    expect(output).toContain("from '@reapit/elements/core/badge'")
    expect(output).not.toContain('DeprecatedBadge')
  })

  test('type-only import', () => {
    const input = `import { type DeprecatedBadge } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Badge')
    expect(output).toContain("from '@reapit/elements/core/badge'")
  })

  test('mixed named imports — preserves others', () => {
    const input = `import { DeprecatedBadge, Input } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Input')
    expect(output).toContain("from '@reapit/elements'")
    expect(output).toContain('Badge')
    expect(output).toContain("from '@reapit/elements/core/badge'")
    expect(output).not.toContain('DeprecatedBadge')
  })

  test('removes DeprecatedBadgeProps import', () => {
    const input = `import { DeprecatedBadge, DeprecatedBadgeProps } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('DeprecatedBadgeProps')
    expect(output).toContain('Badge')
  })

  test('removes DeprecatedBadgeGroup import', () => {
    const input = `import { DeprecatedBadgeGroup } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('DeprecatedBadgeGroup')
  })

  test('removes ElDeprecatedBadge import', () => {
    const input = `import { ElDeprecatedBadge } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedBadge')
  })

  test('removes ElDeprecatedBadgeGroup import', () => {
    const input = `import { ElDeprecatedBadgeGroup } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedBadgeGroup')
  })

  test('removes ElDeprecatedBadgeGroupInner import', () => {
    const input = `import { ElDeprecatedBadgeGroupInner } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedBadgeGroupInner')
  })

  test('empty declaration cleanup — removes entire import when all deprecated', () => {
    const input = `import { DeprecatedBadgeGroup, ElDeprecatedBadge } from '@reapit/elements'\nexport {}`
    const output = transform(input, 'file.tsx')
    // No residual empty import declaration from @reapit/elements
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into an existing target import declaration', () => {
    const input = [
      `import { Badge } from '@reapit/elements/core/badge'`,
      `import { DeprecatedBadge } from '@reapit/elements'`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Should not have two separate badge imports
    const matches = output.match(/from '@reapit\/elements\/core\/badge'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('Badge')
  })

  test('already-migrated import — skips @reapit/elements/core/badge declaration', () => {
    const input = `import { Badge } from '@reapit/elements/core/badge'`
    const output = transform(input, 'file.tsx')
    // Nothing to change — no DeprecatedBadge present → early return
    expect(output).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// 3. Facade package support
// ---------------------------------------------------------------------------

describe('facade package support', () => {
  test('imports Badge from bare facade specifier (no subpath)', () => {
    const input = `import { DeprecatedBadge } from '@company/ui'`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain("from '@company/ui'")
    expect(output).toContain('Badge')
    expect(output).not.toContain('DeprecatedBadge')
    // Must NOT add /core/badge subpath
    expect(output).not.toContain('/core/badge')
  })

  test('facade subpath import is detected and migrated', () => {
    const input = `import { DeprecatedBadge } from '@company/ui/elements'`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain('Badge')
    expect(output).not.toContain('DeprecatedBadge')
  })

  test('non-facade import is not transformed when facade is specified', () => {
    const input = `import { DeprecatedBadge } from '@other/lib'`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    // @other/lib is not @reapit/elements or @company/ui — should be left alone
    expect(output).toContain('DeprecatedBadge')
    expect(output).toContain("from '@other/lib'")
  })

  test('direct @reapit/elements import is rewritten to canonical subpath when facadePackage is set', () => {
    // When facadePackage is configured, facade-package imports are preserved in-place
    // (subpath unchanged). Direct @reapit/elements imports are still rewritten to the
    // canonical subpath — the engine does not merge them into the facade specifier.
    const input = [
      `import { DeprecatedBadge } from '@company/ui'`,
      `import { DeprecatedBadge as RBadge } from '@reapit/elements'`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).not.toContain('DeprecatedBadge')
    // Facade import is preserved in-place
    expect(output).toContain("from '@company/ui'")
    // @reapit/elements import is rewritten to the canonical subpath
    expect(output).toContain("from '@reapit/elements/core/badge'")
  })
})

// ---------------------------------------------------------------------------
// 4. Type references
// ---------------------------------------------------------------------------

describe('type reference transformations', () => {
  test('type annotation', () => {
    const input = [
      `import { DeprecatedBadgeProps } from '@reapit/elements'`,
      `const props: DeprecatedBadgeProps = {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Badge.Props')
    expect(output).not.toContain('DeprecatedBadgeProps')
  })

  test('interface extends', () => {
    const input = [
      `import { DeprecatedBadgeProps } from '@reapit/elements'`,
      `interface MyProps extends DeprecatedBadgeProps { extra: string }`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('extends Badge.Props')
    expect(output).not.toContain('DeprecatedBadgeProps')
  })

  test('generic type argument', () => {
    const input = [
      `import { DeprecatedBadgeProps } from '@reapit/elements'`,
      `type Mapped = Partial<DeprecatedBadgeProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('Partial<Badge.Props>')
    expect(output).not.toContain('DeprecatedBadgeProps')
  })

  test('multiple type references all rewritten', () => {
    const input = [
      `import { DeprecatedBadgeProps } from '@reapit/elements'`,
      `const a: DeprecatedBadgeProps = {}`,
      `const b: DeprecatedBadgeProps = {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('DeprecatedBadgeProps')
    const count = (output.match(/Badge\.Props/g) ?? []).length
    expect(count).toBeGreaterThanOrEqual(2)
  })
})

// ---------------------------------------------------------------------------
// 5. JSX Badge element transforms
// ---------------------------------------------------------------------------

describe('JSX Badge element transformations', () => {
  test('element rename — self-closing', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<Badge')
    expect(output).not.toContain('DeprecatedBadge')
  })

  test('element rename — with children', () => {
    const input = [
      `import { DeprecatedBadge } from '@reapit/elements'`,
      `<DeprecatedBadge>hello</DeprecatedBadge>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<Badge')
    expect(output).toContain('</Badge>')
    expect(output).not.toContain('DeprecatedBadge')
  })

  test('no intent — adds colour="neutral" (required prop)', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
  })

  test('intent="primary" → colour="neutral"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="primary" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
    expect(output).not.toContain('intent')
  })

  test('intent="neutral" → colour="neutral"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="neutral" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
    expect(output).not.toContain('intent')
  })

  test('intent="success" → colour="success"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="success" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="success"')
    expect(output).not.toContain('intent')
  })

  test('intent="pending" → colour="pending"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="pending" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="pending"')
    expect(output).not.toContain('intent')
  })

  test('intent="warning" → colour="warning"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="warning" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="warning"')
    expect(output).not.toContain('intent')
  })

  test('intent="danger" → colour="danger"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="danger" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="danger"')
    expect(output).not.toContain('intent')
  })

  test('intent="default" → colour="neutral"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="default" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
    expect(output).not.toContain('intent')
  })

  test('intent="secondary" → colour="neutral"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="secondary" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
    expect(output).not.toContain('intent')
  })

  test('intent="critical" → colour="danger"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="critical" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="danger"')
    expect(output).not.toContain('intent')
  })

  test('intent="low" → colour="neutral"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent="low" />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
    expect(output).not.toContain('intent')
  })

  test('dynamic intent — renames prop to colour, leaves value unchanged', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent={dynamicValue} />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour={dynamicValue}')
    expect(output).not.toContain('intent')
  })

  test('bare intent attribute (no value) → colour="neutral"', () => {
    const input = `import { DeprecatedBadge } from '@reapit/elements'\n<DeprecatedBadge intent />`
    const output = transform(input, 'file.tsx')
    expect(output).toContain('colour="neutral"')
    expect(output).not.toContain('intent')
  })

  test('alias preservation — aliased tag is preserved unchanged', () => {
    const input = [`import { DeprecatedBadge as B } from '@reapit/elements'`, `<B intent="success" />`].join('\n')
    const output = transform(input, 'file.tsx')
    // Tag name remains 'B' (alias preserved), but colour is mapped
    expect(output).toContain('<B')
    expect(output).toContain('colour="success"')
    expect(output).not.toContain('intent')
  })

  test('preserves other props', () => {
    const input = [
      `import { DeprecatedBadge } from '@reapit/elements'`,
      `<DeprecatedBadge className="foo" role="status" intent="danger">txt</DeprecatedBadge>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('className="foo"')
    expect(output).toContain('role="status"')
    expect(output).toContain('colour="danger"')
  })
})

// ---------------------------------------------------------------------------
// 6. JSX BadgeGroup element transforms
// ---------------------------------------------------------------------------

describe('JSX BadgeGroup element transformations', () => {
  test('renames DeprecatedBadgeGroup to div', () => {
    const input = [
      `import { DeprecatedBadgeGroup } from '@reapit/elements'`,
      `<DeprecatedBadgeGroup><span>hi</span></DeprecatedBadgeGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<div')
    expect(output).toContain('</div>')
    // Tag names must be gone; the comment text still contains the string but that is expected
    expect(output).not.toContain('<DeprecatedBadgeGroup')
    expect(output).not.toContain('</DeprecatedBadgeGroup>')
  })

  test('adds inline style prop', () => {
    const input = [
      `import { DeprecatedBadgeGroup } from '@reapit/elements'`,
      `<DeprecatedBadgeGroup><span>hi</span></DeprecatedBadgeGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('display: "flex"')
    expect(output).toContain('flexWrap: "wrap"')
    expect(output).toContain('gap: "0.25rem"')
  })

  test('inserts TODO comment above the element', () => {
    const input = [
      `import { DeprecatedBadgeGroup } from '@reapit/elements'`,
      `<DeprecatedBadgeGroup><span>hi</span></DeprecatedBadgeGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TODO: DeprecatedBadgeGroup has no core equivalent')
    // Comment must appear before the div
    const commentIndex = output.indexOf('TODO: DeprecatedBadgeGroup')
    const divIndex = output.indexOf('<div')
    expect(commentIndex).toBeLessThan(divIndex)
  })

  test('self-closing DeprecatedBadgeGroup', () => {
    const input = [`import { DeprecatedBadgeGroup } from '@reapit/elements'`, `<DeprecatedBadgeGroup />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<div')
    // JSX tag names must be gone; the TODO comment still contains the string but that is expected
    expect(output).not.toContain('<DeprecatedBadgeGroup')
    expect(output).toContain('TODO: DeprecatedBadgeGroup has no core equivalent')
  })

  test('handles multiple sibling DeprecatedBadgeGroup elements', () => {
    const input = [
      `import { DeprecatedBadgeGroup } from '@reapit/elements'`,
      `<DeprecatedBadgeGroup><span>first</span></DeprecatedBadgeGroup>`,
      `<DeprecatedBadgeGroup><span>second</span></DeprecatedBadgeGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')

    // Both TODO comments should be present
    const firstCommentIndex = output.indexOf('TODO: DeprecatedBadgeGroup has no core equivalent')
    const secondCommentIndex = output.indexOf(
      'TODO: DeprecatedBadgeGroup has no core equivalent',
      firstCommentIndex + 1,
    )

    expect(firstCommentIndex).toBeGreaterThanOrEqual(0)
    expect(secondCommentIndex).toBeGreaterThan(firstCommentIndex)

    // Each comment should appear before the corresponding <div> replacement
    const firstDivIndex = output.indexOf('<div', firstCommentIndex)
    const secondDivIndex = output.indexOf('<div', firstDivIndex + 1)

    expect(firstDivIndex).toBeGreaterThan(firstCommentIndex)
    expect(secondDivIndex).toBeGreaterThan(secondCommentIndex)
  })
})

// ---------------------------------------------------------------------------
// 7. Styled component import removal
// ---------------------------------------------------------------------------

describe('styled component import removal', () => {
  test('removes all three El* imports in one declaration', () => {
    const input = [
      `import { ElDeprecatedBadge, ElDeprecatedBadgeGroup, ElDeprecatedBadgeGroupInner } from '@reapit/elements'`,
      `export {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('ElDeprecatedBadge')
    expect(output).not.toContain('ElDeprecatedBadgeGroup')
    expect(output).not.toContain('ElDeprecatedBadgeGroupInner')
  })

  test('cleans up empty import declaration after El* removal', () => {
    const input = `import { ElDeprecatedBadge } from '@reapit/elements'\nexport {}`
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })
})

// ---------------------------------------------------------------------------
// 8. Multiple occurrences — several badges in one file
// ---------------------------------------------------------------------------

describe('multiple occurrences', () => {
  test('all DeprecatedBadge elements in one file are transformed', () => {
    const input = [
      `import { DeprecatedBadge } from '@reapit/elements'`,
      `<DeprecatedBadge intent="success">A</DeprecatedBadge>`,
      `<DeprecatedBadge intent="danger">B</DeprecatedBadge>`,
      `<DeprecatedBadge />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('DeprecatedBadge')
    const badgeCount = (output.match(/<Badge/g) ?? []).length
    expect(badgeCount).toBe(3)
    expect(output).toContain('colour="success"')
    expect(output).toContain('colour="danger"')
    expect(output).toContain('colour="neutral"')
  })

  test('mixed DeprecatedBadge and DeprecatedBadgeGroup', () => {
    const input = [
      `import { DeprecatedBadge, DeprecatedBadgeGroup } from '@reapit/elements'`,
      `<DeprecatedBadgeGroup>`,
      `  <DeprecatedBadge intent="warning">Warn</DeprecatedBadge>`,
      `  <DeprecatedBadge intent="success">OK</DeprecatedBadge>`,
      `</DeprecatedBadgeGroup>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // JSX tag names must be gone; TODO comments may still contain these strings
    expect(output).not.toContain('<DeprecatedBadge')
    expect(output).not.toContain('</DeprecatedBadge>')
    expect(output).not.toContain('<DeprecatedBadgeGroup')
    expect(output).not.toContain('</DeprecatedBadgeGroup>')
    expect(output).toContain('<div')
    expect(output).toContain('colour="warning"')
    expect(output).toContain('colour="success"')
    expect(output).toContain('TODO: DeprecatedBadgeGroup has no core equivalent')
  })
})
