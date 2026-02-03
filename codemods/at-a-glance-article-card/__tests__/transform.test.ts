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
    const input = '<AtAGlanceCard displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe('<AtAGlance.ArticleCard displayValue="42" label="Total" />')
  })

  test('does not rename AtAGlanceCard when using grid prop', () => {
    const input = '<AtAGlanceCard grid="auto / 1fr 1fr"><AtAGlanceCardLabel>Label</AtAGlanceCardLabel></AtAGlanceCard>'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not rename AtAGlanceCard when it has children', () => {
    const input = '<AtAGlanceCard><AtAGlanceCardLabel>Label</AtAGlanceCardLabel></AtAGlanceCard>'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify AtAGlanceAnchorCard', () => {
    const input = '<AtAGlanceAnchorCard href="/dashboard" displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not modify AtAGlanceButtonCard', () => {
    const input = '<AtAGlanceButtonCard onClick={handleClick} displayValue="42" label="Total" />'
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('converts both namespaced and direct usage to AtAGlance.ArticleCard', () => {
    const input =
      '<><AtAGlance.Card displayValue="42" label="Namespaced" /><AtAGlanceCard displayValue="100" label="Direct" /></>'
    const output = transform(input)
    expect(output).toBe(
      '<><AtAGlance.ArticleCard displayValue="42" label="Namespaced" /><AtAGlance.ArticleCard displayValue="100" label="Direct" /></>',
    )
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
