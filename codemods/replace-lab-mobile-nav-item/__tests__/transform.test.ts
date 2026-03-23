import transform from '../transform'

// ---------------------------------------------------------------------------
// no-op
// ---------------------------------------------------------------------------

describe('no-op', () => {
  test('returns source unchanged when MobileNavItem is absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('returns source unchanged when MobileNavItem is in source text but not imported', () => {
    const input = `// This component is similar to MobileNavItem\nconst x = 1`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// import rewrites
// ---------------------------------------------------------------------------

describe('import rewrites', () => {
  test('rewrites MobileNavItem import from @reapit/elements barrel to core/top-bar', () => {
    const input = [`import { MobileNavItem } from '@reapit/elements'`, `<MobileNavItem href="/a" label="A" />`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { TopBar } from '@reapit/elements/core/top-bar'`)
    expect(output).not.toContain(`from '@reapit/elements'\n`)
  })

  test('rewrites MobileNavItem import from @reapit/elements/lab/mobile-nav-item to core/top-bar', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements/lab/mobile-nav-item'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`from '@reapit/elements/core/top-bar'`)
    expect(output).not.toContain(`from '@reapit/elements/lab/mobile-nav-item'`)
  })

  test('preserves other named imports alongside MobileNavItem', () => {
    const input = [
      `import { MobileNavItem, Button } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements'`)
    expect(output).toContain(`import { TopBar } from '@reapit/elements/core/top-bar'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into an existing @reapit/elements/core/top-bar import', () => {
    const input = [
      `import { TopBar } from '@reapit/elements/core/top-bar'`,
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/top-bar'/g)
    expect(matches).toHaveLength(1)
  })

  test('does not duplicate TopBar when it is already imported from the target specifier', () => {
    const input = [
      `import { TopBar } from '@reapit/elements/core/top-bar'`,
      `import { MobileNavItem } from '@reapit/elements/lab/mobile-nav-item'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const importMatches = output.match(/TopBar/g)
    // Should appear: once in import, once as JSX tag (TopBar.MenuItem ×2: open + close)
    expect(output.match(/import { TopBar }/g)).toHaveLength(1)
  })

  test('does not rewrite re-export declarations', () => {
    const input = `export { MobileNavItem } from '@reapit/elements/lab/mobile-nav-item'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// facade package
// ---------------------------------------------------------------------------

describe('facade package', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [`import { MobileNavItem } from '@company/ui'`, `<MobileNavItem href="/a" label="A" />`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { TopBar } from '@company/ui'`)
    expect(output).not.toContain('/core/top-bar')
  })

  test('keeps facade subpath specifier unchanged', () => {
    const input = [
      `import { MobileNavItem } from '@company/ui/lab/mobile-nav-item'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { TopBar } from '@company/ui/lab/mobile-nav-item'`)
    expect(output).not.toContain('@reapit/elements/core/top-bar')
  })

  test('does not add a second TopBar binding when TopBar is already imported from facade root', () => {
    const input = [
      `import { TopBar } from '@company/ui'`,
      `import { MobileNavItem } from '@company/ui/lab/mobile-nav-item'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    // There should be exactly one import declaration containing TopBar
    expect(output.match(/import \{ TopBar \}/g)).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// type reference rewrites
// ---------------------------------------------------------------------------

describe('type reference rewrites', () => {
  test('rewrites MobileNavItem.Props type alias to TopBar.MenuItemProps', () => {
    const input = [`import { MobileNavItem } from '@reapit/elements'`, `type Props = MobileNavItem.Props`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Props = TopBar.MenuItemProps')
    expect(output).not.toContain('MobileNavItem.Props')
  })

  test('rewrites MobileNavItem.Props in extends clause', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `interface Foo extends MobileNavItem.Props {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface Foo extends TopBar.MenuItemProps {}')
  })

  test('rewrites MobileNavItem.Props in generic type argument', () => {
    const input = [`import { MobileNavItem } from '@reapit/elements'`, `type Foo = Partial<MobileNavItem.Props>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Foo = Partial<TopBar.MenuItemProps>')
  })
})

// ---------------------------------------------------------------------------
// anchor variant
// ---------------------------------------------------------------------------

describe('anchor variant', () => {
  test('converts label to children and adds aria-current={false} when isActive is absent', () => {
    const input = [`import { MobileNavItem } from '@reapit/elements'`, `<MobileNavItem href="/a" label="Home" />`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuItem aria-current={false} href="/a">Home</TopBar.MenuItem>`)
  })

  test('converts isActive boolean shorthand to aria-current="page"', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="Home" isActive />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`aria-current="page"`)
    expect(output).not.toContain('isActive')
  })

  test('converts isActive={true} to aria-current="page"', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="Home" isActive={true} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`aria-current="page"`)
    expect(output).not.toContain('isActive')
  })

  test('converts isActive={false} to aria-current={false}', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="Home" isActive={false} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`aria-current={false}`)
    expect(output).not.toContain('isActive')
  })

  test('converts dynamic isActive expression to ternary and inserts TODO comment', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem href="/a" label="Home" isActive={isCurrent} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`aria-current={isCurrent ? 'page' : false}`)
    expect(output).toContain("TODO: MobileNavItem isActive was a boolean; aria-current expects 'page' or false.")
    expect(output).not.toContain('isActive=')
  })

  test('preserves hasBadge prop', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="Home" hasBadge />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('hasBadge')
  })

  test('preserves arbitrary extra props', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="Home" data-testid="nav-home" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('data-testid="nav-home"')
  })

  test('converts label JSX expression to JSX expression children', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label={title} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('>{title}</TopBar.MenuItem>')
  })

  test('handles aliased MobileNavItem import', () => {
    const input = [
      `import { MobileNavItem as NavItem } from '@reapit/elements'`,
      `<NavItem href="/a" label="Home" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuItem`)
    expect(output).not.toContain('<NavItem')
  })
})

// ---------------------------------------------------------------------------
// button variant
// ---------------------------------------------------------------------------

describe('button variant', () => {
  test('converts to TopBar.MenuItemButton with label as children and onClick preserved', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Save" onClick={handleSave} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuItemButton onClick={handleSave}>Save</TopBar.MenuItemButton>`)
  })

  test('preserves hasBadge on TopBar.MenuItemButton', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Save" onClick={handleSave} hasBadge />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuItemButton onClick={handleSave} hasBadge>Save</TopBar.MenuItemButton>`)
  })

  test('drops isActive and inserts TODO comment', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem label="Save" onClick={handleSave} isActive />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The JSX element should not carry the isActive attribute
    expect(output).not.toContain('<TopBar.MenuItemButton isActive')
    expect(output).not.toContain('isActive />')
    expect(output).toContain('TODO: MobileNavItem isActive has no equivalent on TopBar.MenuItemButton.')
  })

  test('inserts TODO before the statement, not before the import', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem label="Save" onClick={handleSave} isActive />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const todoIndex = output.indexOf('// TODO:')
    const stmtIndex = output.indexOf('const el =')
    expect(todoIndex).toBeGreaterThan(-1)
    expect(todoIndex).toBeLessThan(stmtIndex)
  })

  test('preserves indentation of the statement after inserting TODO comment', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `function foo() {`,
      `  const el = <MobileNavItem label="Save" onClick={handleSave} isActive />`,
      `}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const lines = output.split('\n')
    const todoLine = lines.find((l) => l.includes('// TODO:'))!
    const stmtLine = lines.find((l) => l.includes('const el ='))!
    expect(todoLine).toBeDefined()
    expect(stmtLine).toBeDefined()
    expect(todoLine.match(/^\s*/)?.[0]).toBe(stmtLine.match(/^\s*/)?.[0])
  })

  test('does not insert duplicate TODO for multiple button elements in one statement', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const els = [<MobileNavItem label="A" onClick={a} isActive />, <MobileNavItem label="B" onClick={b} isActive />]`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO: MobileNavItem isActive has no equivalent/g)
    expect(matches).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// expandable variant
// ---------------------------------------------------------------------------

describe('expandable variant', () => {
  test('converts to TopBar.MenuGroup with summary and MenuSubmenu wrapping children', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Products">`,
      `  <MobileNavItem href="/a" label="Overview" />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TopBar.MenuGroup')
    expect(output).toContain('summary={<TopBar.MenuGroupSummary>')
    expect(output).toContain('Products</TopBar.MenuGroupSummary>}')
    expect(output).toContain('<TopBar.MenuSubmenu>')
    expect(output).toContain('<TopBar.MenuSubmenuItem')
    expect(output).toContain('</TopBar.MenuSubmenu>')
    expect(output).toContain('</TopBar.MenuGroup>')
  })

  test('passes isActive through to TopBar.MenuGroup', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Products" isActive>`,
      `  <MobileNavItem href="/a" label="Overview" />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TopBar.MenuGroup isActive')
    expect(output).not.toContain('isActive={')
  })

  test('moves hasBadge to TopBar.MenuGroupSummary', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Products" hasBadge>`,
      `  <MobileNavItem href="/a" label="Overview" />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TopBar.MenuGroupSummary hasBadge>')
    expect(output).not.toMatch(/<TopBar\.MenuGroup\b[^{>]*hasBadge/)
  })

  test('transforms anchor children to TopBar.MenuSubmenuItem', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Products">`,
      `  <MobileNavItem href="/a" label="Overview" isActive />`,
      `  <MobileNavItem href="/b" label="Pricing" />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuSubmenuItem aria-current="page" href="/a">Overview</TopBar.MenuSubmenuItem>`)
    expect(output).toContain(`<TopBar.MenuSubmenuItem aria-current={false} href="/b">Pricing</TopBar.MenuSubmenuItem>`)
  })

  test('transforms button children to TopBar.MenuSubmenuItemButton', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Actions">`,
      `  <MobileNavItem label="Save" onClick={handleSave} />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuSubmenuItemButton onClick={handleSave}>Save</TopBar.MenuSubmenuItemButton>`)
  })

  test('handles mixed anchor and button children', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Products">`,
      `  <MobileNavItem href="/a" label="Overview" />`,
      `  <MobileNavItem label="Add new" onClick={handleAdd} />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuSubmenuItem aria-current={false} href="/a">Overview</TopBar.MenuSubmenuItem>`)
    expect(output).toContain(`<TopBar.MenuSubmenuItemButton onClick={handleAdd}>Add new</TopBar.MenuSubmenuItemButton>`)
  })

  test('inserts TODO comment when children include non-MobileNavItem JSX', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem label="Products">`,
      `  <SomeOtherComponent />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TODO: Children have been wrapped in TopBar.MenuSubmenu.')
    expect(output).toContain('<TopBar.MenuSubmenu>')
  })

  test('preserves extra attributes on TopBar.MenuGroup', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem label="Products" data-testid="products-group">`,
      `  <MobileNavItem href="/a" label="Overview" />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<TopBar.MenuGroup')
    expect(output).toContain('data-testid="products-group"')
  })

  test('does not insert submenu TODO when all children are MobileNavItem', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem label="Products">`,
      `  <MobileNavItem href="/a" label="Overview" />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('TODO: Children have been wrapped')
  })

  test('inserts both TODO messages when non-MobileNavItem child and button child with isActive share a statement', () => {
    // Regression for Fix 2: dedup key must be `insertPos::message`, not just `insertPos`.
    // The old code (dedup by insertPos alone) would silently drop one of the two distinct TODOs.
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem label="Products">`,
      `  <SomeOtherComponent />`,
      `  <MobileNavItem label="Save" onClick={handleSave} isActive />`,
      `</MobileNavItem>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('TODO: Children have been wrapped in TopBar.MenuSubmenu.')
    expect(output).toContain('TODO: MobileNavItem isActive has no equivalent on TopBar.MenuItemButton.')
  })
})

// ---------------------------------------------------------------------------
// spread-only usage
// ---------------------------------------------------------------------------

describe('spread-only usage', () => {
  test('leaves spread-only element unchanged and inserts TODO comment', () => {
    const input = [`import { MobileNavItem } from '@reapit/elements'`, `const el = <MobileNavItem {...props} />`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<MobileNavItem {...props} />')
    expect(output).toContain('TODO: MobileNavItem could not be automatically migrated.')
  })

  test('treats spread with label but no href/onClick as spread-only', () => {
    // Regression for Fix 3: hasSpread && hasLabel && !hasHref && !hasOnClick must yield spread-only,
    // not silently fall through to the anchor path.
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const el = <MobileNavItem label="Home" {...props} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<MobileNavItem label="Home" {...props} />')
    expect(output).toContain('TODO: MobileNavItem could not be automatically migrated.')
    expect(output).not.toContain('<TopBar.MenuItem')
  })
})

// ---------------------------------------------------------------------------
// multiple elements
// ---------------------------------------------------------------------------

describe('multiple elements', () => {
  test('transforms multiple sibling anchor elements', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="Home" />`,
      `<MobileNavItem href="/b" label="About" isActive />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`<TopBar.MenuItem aria-current={false} href="/a">Home</TopBar.MenuItem>`)
    expect(output).toContain(`<TopBar.MenuItem aria-current="page" href="/b">About</TopBar.MenuItem>`)
  })

  test('inserts one TODO per statement, not per element', () => {
    const input = [
      `import { MobileNavItem } from '@reapit/elements'`,
      `const a = <MobileNavItem label="A" onClick={a} isActive />`,
      `const b = <MobileNavItem label="B" onClick={b} isActive />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO: MobileNavItem isActive has no equivalent/g)
    expect(matches).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// import safety
// ---------------------------------------------------------------------------

describe('import safety', () => {
  test('preserves namespace imports when removing MobileNavItem named import', () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { MobileNavItem } from '@reapit/elements'`,
      `<MobileNavItem href="/a" label="A" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import * as Elements from '@reapit/elements'`)
    expect(output).toContain(`import { TopBar } from '@reapit/elements/core/top-bar'`)
  })

  test('does not migrate local MobileNavItem symbols that have no elements import', () => {
    const input = [`const MobileNavItem = () => null`, `<MobileNavItem />`].join('\n')
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})
