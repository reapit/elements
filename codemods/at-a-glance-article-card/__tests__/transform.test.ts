import transform from '../transform'

describe('namespaced component usage (AtAGlance.Card)', () => {
  test('renames AtAGlance.Card to AtAGlance.ArticleCard when using old props-based API', () => {
    const input = '<AtAGlance.Card displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe('<AtAGlance.ArticleCard displayValue="42" label="Total" />')
  })

  test('preserves all props when renaming AtAGlance.Card to AtAGlance.ArticleCard', () => {
    const input = '<AtAGlance.Card displayValue="42" label="Total" description="Last 30 days" layout="horizontal" />'
    const output = transform(input)
    expect(output).toBe(
      '<AtAGlance.ArticleCard displayValue="42" label="Total" description="Last 30 days" layout="horizontal" />',
    )
  })

  test('does not rename AtAGlance.Card when using grid prop', () => {
    const input =
      '<AtAGlance.Card grid="auto / 1fr 1fr"><AtAGlance.CardLabel>Label</AtAGlance.CardLabel></AtAGlance.Card>'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not rename AtAGlance.Card when it has children', () => {
    const input = '<AtAGlance.Card><AtAGlance.CardLabel>Label</AtAGlance.CardLabel></AtAGlance.Card>'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify AtAGlance.AnchorCard', () => {
    const input = '<AtAGlance.AnchorCard href="/dashboard" displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify AtAGlance.ButtonCard', () => {
    const input = '<AtAGlance.ButtonCard onClick={handleClick} displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify AtAGlance.ArticleCard', () => {
    const input = '<AtAGlance.ArticleCard displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('renames multiple AtAGlance.Card instances', () => {
    const input =
      '<><AtAGlance.Card displayValue="10" label="First" /><AtAGlance.Card displayValue="20" label="Second" /></>'
    const output = transform(input)
    expect(output).toBe(
      '<><AtAGlance.ArticleCard displayValue="10" label="First" /><AtAGlance.ArticleCard displayValue="20" label="Second" /></>',
    )
  })

  test('renames old API usage while preserving new API usage in the same file', () => {
    const input =
      '<><AtAGlance.Card displayValue="42" label="Old" /><AtAGlance.Card grid="auto"><span>New</span></AtAGlance.Card></>'
    const output = transform(input)
    expect(output).toBe(
      '<><AtAGlance.ArticleCard displayValue="42" label="Old" /><AtAGlance.Card grid="auto"><span>New</span></AtAGlance.Card></>',
    )
  })

  test('does not modify non-AtAGlance Card components', () => {
    const input = '<><AtAGlance.Card displayValue="42" label="Total" /><Card title="Other">Content</Card></>'
    const output = transform(input)
    expect(output).toContain('<Card title="Other">Content</Card>')
  })
})

describe('direct component usage (AtAGlanceCard)', () => {
  test('converts AtAGlanceCard to AtAGlance.ArticleCard when using old props-based API', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'
<AtAGlanceCard displayValue="42" label="Total" />`
    const output = transform(input)
    expect(output).toContain('<AtAGlance.ArticleCard displayValue="42" label="Total" />')
  })

  test('does not rename AtAGlanceCard when using grid prop', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'
<AtAGlanceCard grid="auto / 1fr 1fr"><AtAGlanceCardLabel>Label</AtAGlanceCardLabel></AtAGlanceCard>`
    const output = transform(input)
    expect(output).toContain('<AtAGlanceCard grid="auto / 1fr 1fr">')
  })

  test('does not rename AtAGlanceCard when it has children', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'
<AtAGlanceCard><AtAGlanceCardLabel>Label</AtAGlanceCardLabel></AtAGlanceCard>`
    const output = transform(input)
    expect(output).toContain('<AtAGlanceCard>')
  })

  test('does not modify AtAGlanceAnchorCard', () => {
    const input = `import { AtAGlanceAnchorCard } from '@reapit/elements'
<AtAGlanceAnchorCard href="/dashboard" displayValue="42" label="Total" />`
    const output = transform(input)
    expect(output).toContain('<AtAGlanceAnchorCard href="/dashboard"')
    expect(output).not.toContain('ArticleCard')
  })

  test('does not modify AtAGlanceButtonCard', () => {
    const input = `import { AtAGlanceButtonCard } from '@reapit/elements'
<AtAGlanceButtonCard onClick={handleClick} displayValue="42" label="Total" />`
    const output = transform(input)
    expect(output).toContain('<AtAGlanceButtonCard onClick={handleClick}')
    expect(output).not.toContain('ArticleCard')
  })

  test('converts both namespaced and direct usage to AtAGlance.ArticleCard', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'
<><AtAGlance.Card displayValue="42" label="Namespaced" /><AtAGlanceCard displayValue="100" label="Direct" /></>`
    const output = transform(input)
    expect(output).toContain('<AtAGlance.ArticleCard displayValue="42" label="Namespaced" />')
    expect(output).toContain('<AtAGlance.ArticleCard displayValue="100" label="Direct" />')
  })
})

describe('import handling', () => {
  test('removes AtAGlanceCard from imports when no longer used', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).not.toContain('AtAGlanceCard')
    expect(output).toContain('<AtAGlance.ArticleCard')
  })

  test('keeps AtAGlanceCard import when still used with new primitive API', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard grid="auto"><span>Content</span></AtAGlanceCard>
}`
    const output = transform(input)
    expect(output).toContain('import { AtAGlanceCard }')
  })

  test('removes only AtAGlanceCard from imports while keeping other imports', () => {
    const input = `import { AtAGlanceCard, AtAGlance } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).toContain('AtAGlance')
    expect(output).not.toMatch(/\bAtAGlanceCard\b/)
  })

  test('adds AtAGlance import when converting AtAGlanceCard and no AtAGlance import exists', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).toContain('import { AtAGlance }')
    expect(output).not.toContain('AtAGlanceCard')
  })

  test('removes entire import declaration when no named imports remain', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).not.toContain('import { }')
    expect(output).toContain('import { AtAGlance }')
  })

  test('handles subpath imports correctly', () => {
    const input = `import { AtAGlance } from '@reapit/elements/core/at-a-glance'

function Component() {
  return <AtAGlance.Card displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).toContain("import { AtAGlance } from '@reapit/elements/core/at-a-glance'")
    expect(output).toContain('<AtAGlance.ArticleCard')
  })

  test('handles aliased AtAGlanceCard imports', () => {
    const input = `import { AtAGlanceCard as Card } from '@reapit/elements'

function Component() {
  return <Card displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).not.toContain('<Card')
    expect(output).toContain('import { AtAGlance }')
  })

  test('does not add duplicate AtAGlance imports when multiple import declarations exist', () => {
    const input = `import { Button } from '@reapit/elements'
import { AtAGlanceCard } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    const atAGlanceMatches = output.match(/\bAtAGlance\b/g) || []
    // Should have AtAGlance in import (once) and in JSX (once)
    expect(atAGlanceMatches.length).toBe(2)
  })
})

describe('facade package support', () => {
  test('transforms components imported from a facade package', () => {
    const input = `import { AtAGlanceCard } from '@company/ui-components'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toContain('import { AtAGlance }')
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).not.toContain('AtAGlanceCard')
  })

  test('removes AtAGlanceCard import and adds AtAGlance import for facade packages', () => {
    const input = `import { AtAGlanceCard } from '@company/ui-components'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toContain("import { AtAGlance } from '@company/ui-components'")
    expect(output).not.toContain('AtAGlanceCard')
  })

  test('does not transform non-facade packages', () => {
    const input = `import { AtAGlanceCard } from '@other/package'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toBe(input) // No transformation
  })

  test('works without facade package parameter (backward compatible)', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).toContain('<AtAGlance.ArticleCard')
  })

  test('handles facade package alongside direct @reapit/elements imports', () => {
    const input = `import { Button } from '@reapit/elements'
import { AtAGlanceCard } from '@company/ui-components'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toContain("import { AtAGlance } from '@company/ui-components'")
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).toContain("import { Button } from '@reapit/elements'")
  })

  test('transforms namespaced AtAGlance.Card with facade package', () => {
    const input = `import { AtAGlance } from '@company/ui-components'

function Component() {
  return <AtAGlance.Card displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).toContain("import { AtAGlance } from '@company/ui-components'")
  })

  test('handles aliased imports from facade packages', () => {
    const input = `import { AtAGlanceCard as Card } from '@company/ui-components'

function Component() {
  return <Card displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).not.toContain('<Card')
    expect(output).toContain('import { AtAGlance }')
  })

  test('does not transform AtAGlanceCard with new API from facade package', () => {
    const input = `import { AtAGlanceCard } from '@company/ui-components'

function Component() {
  return <AtAGlanceCard grid="auto"><span>Content</span></AtAGlanceCard>
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toBe(input) // No transformation for new API
  })

  test('transforms multiple uses of AtAGlanceCard from facade package', () => {
    const input = `import { AtAGlanceCard } from '@company/ui-components'

function Component() {
  return (
    <>
      <AtAGlanceCard displayValue="10" label="First" />
      <AtAGlanceCard displayValue="20" label="Second" />
    </>
  )
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/ui-components',
    })
    expect(output).toContain('<AtAGlance.ArticleCard displayValue="10" label="First" />')
    expect(output).toContain('<AtAGlance.ArticleCard displayValue="20" label="Second" />')
    expect(output).not.toContain('AtAGlanceCard')
  })

  test('transforms imports from facade package subpaths using prefix matching', () => {
    const input = `import { AtAGlanceCard } from '@company/design-system/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/design-system',
    })
    expect(output).toContain("import { AtAGlance } from '@company/design-system/elements'")
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).not.toContain('AtAGlanceCard')
  })

  test('transforms imports from multiple subpaths of the same facade package', () => {
    const input = `import { Button } from '@company/design-system/core'
import { AtAGlanceCard } from '@company/design-system/elements'

function Component() {
  return (
    <>
      <Button>Click</Button>
      <AtAGlanceCard displayValue="42" label="Total" />
    </>
  )
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/design-system',
    })
    expect(output).toContain("import { AtAGlance } from '@company/design-system/elements'")
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).toContain("import { Button } from '@company/design-system/core'")
    expect(output).not.toContain('AtAGlanceCard')
  })

  test('does not transform packages that start with similar prefix but are different', () => {
    const input = `import { AtAGlanceCard } from '@company/design-system-v2/elements'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input, 'file.tsx', {
      facadePackage: '@company/design-system',
    })
    expect(output).toBe(input) // Should not transform - different package
  })
})

describe('default @reapit/elements prefix matching', () => {
  test('transforms imports from @reapit/elements subpaths without facade package', () => {
    const input = `import { AtAGlanceCard } from '@reapit/elements/core/at-a-glance'

function Component() {
  return <AtAGlanceCard displayValue="42" label="Total" />
}`
    const output = transform(input)
    expect(output).toContain("import { AtAGlance } from '@reapit/elements/core/at-a-glance'")
    expect(output).toContain('<AtAGlance.ArticleCard')
    expect(output).not.toContain('AtAGlanceCard')
  })
})
