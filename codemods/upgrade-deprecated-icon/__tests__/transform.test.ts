import transform from '../transform'

describe('import transformations', () => {
  test('adds individual icon import for static icon prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
  })

  test('adds multiple icon imports for different icons', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <>
      <DeprecatedIcon icon="home" />
      <DeprecatedIcon icon="chevronRight" />
    </>
  )
}
`
    const output = transform(input)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
    expect(output).toContain(`import { ChevronRightIcon } from '@reapit/elements/icons/chevron-right'`)
  })

  test('does not add duplicate icon imports', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <>
      <DeprecatedIcon icon="home" />
      <DeprecatedIcon icon="home" />
    </>
  )
}
`
    const output = transform(input)
    const importMatches = output.match(/import.*HomeIcon.*from '@reapit\/elements\/icons\/home'/g)
    expect(importMatches).toHaveLength(1)
  })

  test('removes unused DeprecatedIcon import after transformation', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" />
}
`
    const output = transform(input)
    expect(output).not.toContain('DeprecatedIcon')
  })

  test('preserves DeprecatedIcon import when dynamic icons are present', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ iconName }: { iconName: string }) {
  return <DeprecatedIcon icon={iconName} />
}
`
    const output = transform(input)
    expect(output).toContain('import { DeprecatedIcon } from')
  })

  test('preserves other imports from @reapit/elements', () => {
    const input = `
import { DeprecatedIcon, Button, Input } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { Button, Input } from '@reapit/elements'`)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
  })

  test('uses facade package for icon imports when specified', () => {
    const input = `
import { DeprecatedIcon } from '@company/ui'

function MyComponent() {
  return <DeprecatedIcon icon="home" />
}
`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { HomeIcon } from '@company/ui/icons/home'`)
  })

  test('adds icon import to existing icon import statement', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'
import { HomeIcon } from '@reapit/elements/icons/home'

function MyComponent() {
  return (
    <>
      <HomeIcon />
      <DeprecatedIcon icon="settings" />
    </>
  )
}
`
    const output = transform(input)
    expect(output).toContain(`import { SettingsIcon } from '@reapit/elements/icons/settings'`)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
  })
})

describe('icon name mapping', () => {
  test('transforms camelCase icon names to kebab-case and ComponentName', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="chevronRight" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { ChevronRightIcon } from '@reapit/elements/icons/chevron-right'`)
    expect(output).toContain('<ChevronRightIcon')
  })

  test('maps exportIcon to export', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="exportIcon" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { ExportIcon } from '@reapit/elements/icons/export'`)
    expect(output).toContain('<ExportIcon')
  })

  test('maps elipsis to more', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="elipsis" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { MoreIcon } from '@reapit/elements/icons/more'`)
    expect(output).toContain('<MoreIcon')
  })

  test('keeps removed icon drawClose as DeprecatedIcon', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="drawClose" />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('icon="drawClose"')
    expect(output).toContain('TODO: Icon "drawClose" has been removed in v5 and has no replacement')
  })

  test('keeps removed icon placeholderLarge as DeprecatedIcon', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="placeholderLarge" />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('icon="placeholderLarge"')
    expect(output).toContain('TODO: Icon "placeholderLarge" has been removed in v5 and has no replacement')
  })

  test('keeps removed icon placeholderSmall as DeprecatedIcon', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="placeholderSmall" />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('icon="placeholderSmall"')
  })

  test('keeps removed icon reapitLogo as DeprecatedIcon', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="reapitLogo" />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('icon="reapitLogo"')
  })

  test('keeps removed icon reapitLogoSmall as DeprecatedIcon', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="reapitLogoSmall" />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('icon="reapitLogoSmall"')
  })
})

describe('props transformations - fontSize to size', () => {
  test('maps fontSize 12px to size xs', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="12px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="xs"')
    expect(output).not.toContain('fontSize')
  })

  test('maps fontSize 0.75rem to size xs', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="0.75rem" />
}
`
    const output = transform(input)
    expect(output).toContain('size="xs"')
  })

  test('maps fontSize 16px to size sm', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="16px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="sm"')
  })

  test('maps fontSize 1rem to size sm', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="1rem" />
}
`
    const output = transform(input)
    expect(output).toContain('size="sm"')
  })

  test('maps fontSize 20px to size md', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="20px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="md"')
  })

  test('maps fontSize 1.25rem to size md', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="1.25rem" />
}
`
    const output = transform(input)
    expect(output).toContain('size="md"')
  })

  test('maps fontSize 24px to size lg', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="24px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="lg"')
  })

  test('maps fontSize 1.5rem to size lg', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="1.5rem" />
}
`
    const output = transform(input)
    expect(output).toContain('size="lg"')
  })

  test('adds unmapped fontSize to style prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="32px" />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ fontSize: '32px' }}`)
    expect(output).not.toContain('fontSize="32px"')
  })
})

describe('props transformations - intent to color', () => {
  test('maps intent critical to color secondary', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="critical" />
}
`
    const output = transform(input)
    expect(output).toContain('color="secondary"')
    expect(output).not.toContain('intent')
  })

  test('maps intent danger to color error', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="danger" />
}
`
    const output = transform(input)
    expect(output).toContain('color="error"')
  })

  test('maps intent default to color secondary', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="default" />
}
`
    const output = transform(input)
    expect(output).toContain('color="secondary"')
  })

  test('maps intent low to color secondary', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="low" />
}
`
    const output = transform(input)
    expect(output).toContain('color="secondary"')
  })

  test('maps intent neutral to color info', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="neutral" />
}
`
    const output = transform(input)
    expect(output).toContain('color="info"')
  })

  test('maps intent pending to color pending', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="pending" />
}
`
    const output = transform(input)
    expect(output).toContain('color="pending"')
  })

  test('maps intent success to color success', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="success" />
}
`
    const output = transform(input)
    expect(output).toContain('color="success"')
  })

  test('maps intent primary to color action', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="primary" />
}
`
    const output = transform(input)
    expect(output).toContain('color="action"')
  })

  test('maps intent secondary to color secondary', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="secondary" />
}
`
    const output = transform(input)
    expect(output).toContain('color="secondary"')
  })

  test('maps intent warning to color warning', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="warning" />
}
`
    const output = transform(input)
    expect(output).toContain('color="warning"')
  })

  test('maps unknown intent to color inherit', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent="unknown" />
}
`
    const output = transform(input)
    expect(output).toContain('color="inherit"')
  })
})

describe('props transformations - width and height', () => {
  test('maps square dimensions with mapped size to size prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" width="16px" height="16px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="sm"')
    expect(output).not.toContain('width')
    expect(output).not.toContain('height')
  })

  test('adds square dimensions with unmapped size to style prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" width="32px" height="32px" />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ width: '32px', height: '32px' }}`)
    expect(output).not.toContain('width="32px"')
    expect(output).not.toContain('height="32px"')
  })

  test('adds non-square dimensions to style prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" width="20px" height="30px" />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ width: '20px', height: '30px' }}`)
  })

  test('adds only width to style prop when height is missing', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" width="20px" />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ width: '20px' }}`)
  })

  test('adds only height to style prop when width is missing', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" height="20px" />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ height: '20px' }}`)
  })

  test('prefers fontSize size mapping over width/height when both are present', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="12px" width="16px" height="16px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="xs"')
    // Width/height should be added to style since size is already taken by fontSize
    expect(output).toContain(`style={{ width: '16px', height: '16px' }}`)
  })
})

describe('preserves other props', () => {
  test('preserves className prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" className="custom-icon" />
}
`
    const output = transform(input)
    expect(output).toContain('className="custom-icon"')
  })

  test('preserves onClick prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" onClick={handleClick} />
}
`
    const output = transform(input)
    expect(output).toContain('onClick={handleClick}')
  })

  test('preserves multiple props', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <DeprecatedIcon
      icon="home"
      className="custom"
      onClick={handleClick}
      data-testid="icon"
      aria-label="Home"
    />
  )
}
`
    const output = transform(input)
    expect(output).toContain('className="custom"')
    expect(output).toContain('onClick={handleClick}')
    expect(output).toContain('data-testid="icon"')
    expect(output).toContain('aria-label="Home"')
  })
})

describe('style merging', () => {
  test('adds new style prop when unmapped fontSize is present', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="32px" />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ fontSize: '32px' }}`)
    expect(output).toContain('TODO: Review unmapped dimensions for manual verification')
  })

  test('merges with existing style prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="32px" style={{ color: 'red' }} />
}
`
    const output = transform(input)
    expect(output).toContain(`style={{ ...{ color: 'red' }, fontSize: '32px' }}`)
    expect(output).toContain('TODO: Review merged style prop for manual verification')
  })

  test('merges multiple style properties', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="32px" width="40px" height="50px" />
}
`
    const output = transform(input)
    expect(output).toContain(`fontSize: '32px'`)
    expect(output).toContain(`width: '40px'`)
    expect(output).toContain(`height: '50px'`)
  })

  test('adds TODO comment when merging with existing style', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" width="32px" height="32px" style={existingStyle} />
}
`
    const output = transform(input)
    expect(output).toContain('TODO: Review merged style prop for manual verification')
  })

  test('adds TODO comment when adding new style prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" width="100px" height="50px" />
}
`
    const output = transform(input)
    expect(output).toContain('TODO: Review unmapped dimensions for manual verification')
  })

  test('combines TODO messages when same component has multiple style scenarios', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <div>
      <DeprecatedIcon icon="home" width="32px" height="32px" style={existingStyle} />
      <DeprecatedIcon icon="home" fontSize="18px" />
    </div>
  )
}
`
    const output = transform(input)
    // Should combine both TODO reasons into a single message
    expect(output).toContain('TODO: Review merged style prop and unmapped dimensions for manual verification')
    // Should only appear once (on first HomeIcon)
    const todoCount = (output.match(/TODO: Review/g) || []).length
    expect(todoCount).toBe(1)
  })
})

describe('edge cases - dynamic icon props', () => {
  test('keeps DeprecatedIcon with ternary icon prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ isActive }: { isActive: boolean }) {
  return <DeprecatedIcon icon={isActive ? 'home' : 'settings'} />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('TODO: DeprecatedIcon with dynamic icon prop needs manual migration')
  })

  test('keeps DeprecatedIcon with variable icon prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ iconName }: { iconName: string }) {
  return <DeprecatedIcon icon={iconName} />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
    expect(output).toContain('TODO: DeprecatedIcon with dynamic icon prop needs manual migration')
  })

  test('keeps DeprecatedIcon without icon prop', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon')
  })
})

describe('edge cases - multiple icons', () => {
  test('transforms multiple static icons in same file', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <div>
      <DeprecatedIcon icon="home" />
      <DeprecatedIcon icon="settings" />
      <DeprecatedIcon icon="home" />
    </div>
  )
}
`
    const output = transform(input)
    expect(output).toContain('import { HomeIcon }')
    expect(output).toContain('import { SettingsIcon }')
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('<SettingsIcon')
    expect(output).not.toContain('DeprecatedIcon')
  })

  test('transforms static icons and keeps dynamic icons', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ dynamicIcon }: { dynamicIcon: string }) {
  return (
    <div>
      <DeprecatedIcon icon="home" />
      <DeprecatedIcon icon={dynamicIcon} />
    </div>
  )
}
`
    const output = transform(input)
    expect(output).toContain('import { HomeIcon }')
    expect(output).toContain('import { DeprecatedIcon }')
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('<DeprecatedIcon icon={dynamicIcon}')
  })
})

describe('edge cases - JSX element types', () => {
  test('transforms self-closing JSX element', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" />
}
`
    const output = transform(input)
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('/>')
  })

  test('transforms regular JSX element with closing tag', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home"></DeprecatedIcon>
}
`
    const output = transform(input)
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('</HomeIcon>')
  })
})

describe('edge cases - no transformation needed', () => {
  test('returns source unchanged when no DeprecatedIcon present', () => {
    const input = `
import { Button } from '@reapit/elements'

function MyComponent() {
  return <Button>Click</Button>
}
`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('returns source unchanged for empty file', () => {
    const input = ``
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('returns source unchanged when file only has comments', () => {
    const input = `// This is a comment\n/* Another comment */`
    const output = transform(input)
    expect(output).toBe(input)
  })
})

describe('combined transformations', () => {
  test('transforms icon with fontSize and intent props', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" fontSize="16px" intent="primary" />
}
`
    const output = transform(input)
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('size="sm"')
    expect(output).toContain('color="action"')
    expect(output).not.toContain('fontSize')
    expect(output).not.toContain('intent')
  })

  test('transforms icon with all props', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <DeprecatedIcon
      icon="settings"
      fontSize="20px"
      intent="success"
      className="my-icon"
      onClick={handleClick}
    />
  )
}
`
    const output = transform(input)
    expect(output).toContain('<SettingsIcon')
    expect(output).toContain('size="md"')
    expect(output).toContain('color="success"')
    expect(output).toContain('className="my-icon"')
    expect(output).toContain('onClick={handleClick}')
    expect(output).not.toContain('icon=')
    expect(output).not.toContain('fontSize')
    expect(output).not.toContain('intent')
  })

  test('transforms icon with fontSize, intent, and dimensions', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <DeprecatedIcon
      icon="chevronRight"
      fontSize="12px"
      intent="danger"
      width="24px"
      height="24px"
    />
  )
}
`
    const output = transform(input)
    expect(output).toContain('<ChevronRightIcon')
    expect(output).toContain('size="xs"')
    expect(output).toContain('color="error"')
    // Since fontSize took the size prop, width/height go to style
    expect(output).toContain(`width: '24px'`)
    expect(output).toContain(`height: '24px'`)
  })
})

describe('JSX expression icon props', () => {
  test('transforms icon with string literal in JSX expression', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon={"home"} />
}
`
    const output = transform(input)
    expect(output).toContain('<HomeIcon')
    expect(output).not.toContain('icon=')
  })

  test('transforms icon with single quote string literal in JSX expression', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon={'settings'} />
}
`
    const output = transform(input)
    expect(output).toContain('<SettingsIcon')
  })
})

describe('TODO comments for removed icons', () => {
  test('adds TODO comment for removed icon drawClose', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="drawClose" />
}
`
    const output = transform(input)
    expect(output).toContain('TODO: Icon "drawClose" has been removed in v5 and has no replacement')
  })

  test('adds TODO comment for removed icon reapitLogo', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="reapitLogo" />
}
`
    const output = transform(input)
    expect(output).toContain('TODO: Icon "reapitLogo" has been removed in v5 and has no replacement')
  })

  test('uses JSX comment syntax for removed icons in JSX content', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return (
    <div>
      <DeprecatedIcon icon="reapitLogo" />
    </div>
  )
}
`
    const output = transform(input)
    expect(output).toContain('{/* TODO: Icon "reapitLogo" has been removed in v5 and has no replacement */}')
    expect(output).not.toContain('// TODO:')
  })

  test('uses JS comment syntax for removed icons in object properties', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

const config = {
  iconUrl: <Icon icon="reapitLogoSmall" />,
}
`
    const output = transform(input)
    expect(output).toContain('// TODO: Icon "reapitLogoSmall" has been removed in v5 and has no replacement')
    expect(output).not.toContain('{/*')
  })

  test('is idempotent - does not add duplicate TODO comments', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="drawClose" />
}
`
    const output1 = transform(input)
    const output2 = transform(output1)

    // Count occurrences of the TODO message
    const todoCount = (output2.match(/TODO: Icon "drawClose" has been removed/g) || []).length
    expect(todoCount).toBe(1)
    expect(output1).toBe(output2)
  })
})

describe('import alias handling', () => {
  test('transforms aliased DeprecatedIcon import (as Icon)', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return <Icon icon="home" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
    expect(output).toContain('<HomeIcon')
    expect(output).not.toContain('DeprecatedIcon')
    expect(output).not.toContain('<Icon')
  })

  test('transforms aliased DeprecatedIcon import (as CustomIcon)', () => {
    const input = `
import { DeprecatedIcon as CustomIcon } from '@reapit/elements'

function MyComponent() {
  return <CustomIcon icon="settings" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { SettingsIcon } from '@reapit/elements/icons/settings'`)
    expect(output).toContain('<SettingsIcon')
    expect(output).not.toContain('DeprecatedIcon')
    expect(output).not.toContain('<CustomIcon')
  })

  test('handles multiple icons with aliased import', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return (
    <>
      <Icon icon="home" />
      <Icon icon="settings" />
    </>
  )
}
`
    const output = transform(input)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
    expect(output).toContain(`import { SettingsIcon } from '@reapit/elements/icons/settings'`)
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('<SettingsIcon')
    expect(output).not.toContain('<Icon')
  })

  test('removes aliased import when all icons are transformed', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return <Icon icon="home" />
}
`
    const output = transform(input)
    expect(output).not.toContain('DeprecatedIcon')
    expect(output).not.toContain('as Icon')
  })

  test('preserves aliased import when dynamic icons are present', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent({ iconName }: { iconName: string }) {
  return <Icon icon={iconName} />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon as Icon')
    expect(output).toContain('<Icon icon={iconName}')
  })

  test('handles aliased import with other imports from same package', () => {
    const input = `
import { DeprecatedIcon as Icon, Button, Input } from '@reapit/elements'

function MyComponent() {
  return (
    <>
      <Icon icon="home" />
      <Button>Click me</Button>
    </>
  )
}
`
    const output = transform(input)
    expect(output).toContain(`import { Button, Input } from '@reapit/elements'`)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
    expect(output).not.toContain('DeprecatedIcon')
    expect(output).not.toContain('<Icon')
  })

  test('handles self-closing aliased icon with props', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return <Icon icon="home" fontSize="24px" />
}
`
    const output = transform(input)
    expect(output).toContain('<HomeIcon size="lg" />')
    expect(output).not.toContain('fontSize')
  })

  test('handles aliased icon with children', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return <Icon icon="home">Home</Icon>
}
`
    const output = transform(input)
    expect(output).toContain('<HomeIcon>Home</HomeIcon>')
  })

  test('handles removed icons with aliased import', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return <Icon icon="drawClose" />
}
`
    const output = transform(input)
    expect(output).toContain('DeprecatedIcon as Icon')
    expect(output).toContain('<Icon icon="drawClose"')
    expect(output).toContain('TODO: Icon "drawClose" has been removed in v5 and has no replacement')
  })

  test('handles mixed static and dynamic icons with aliased import', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent({ iconName }: { iconName: string }) {
  return (
    <>
      <Icon icon="home" />
      <Icon icon={iconName} />
    </>
  )
}
`
    const output = transform(input)
    expect(output).toContain(`import { HomeIcon } from '@reapit/elements/icons/home'`)
    expect(output).toContain('DeprecatedIcon as Icon')
    expect(output).toContain('<HomeIcon')
    expect(output).toContain('<Icon icon={iconName}')
  })

  test('transforms icon name mappings with aliased import', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@reapit/elements'

function MyComponent() {
  return <Icon icon="exportIcon" />
}
`
    const output = transform(input)
    expect(output).toContain(`import { ExportIcon } from '@reapit/elements/icons/export'`)
    expect(output).toContain('<ExportIcon')
  })

  test('handles aliased import with facade package', () => {
    const input = `
import { DeprecatedIcon as Icon } from '@company/ui'

function MyComponent() {
  return <Icon icon="home" />
}
`
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { HomeIcon } from '@company/ui/icons/home'`)
    expect(output).toContain('<HomeIcon')
  })
})

describe('dynamic props handling', () => {
  test('preserves dynamic intent prop and adds TODO comment', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ color }) {
  return <DeprecatedIcon icon="home" intent={color} />
}
`
    const output = transform(input)
    expect(output).toContain('intent={color}')
    expect(output).toContain('TODO: Migrate dynamic props manually')
    expect(output).toContain('<HomeIcon')
  })

  test('preserves dynamic fontSize prop and adds TODO comment', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ size }) {
  return <DeprecatedIcon icon="chevronRight" fontSize={size} />
}
`
    const output = transform(input)
    expect(output).toContain('fontSize={size}')
    expect(output).toContain('TODO: Migrate dynamic props manually')
    expect(output).toContain('<ChevronRightIcon')
  })

  test('preserves multiple dynamic props with single TODO comment', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ color, size, w }) {
  return <DeprecatedIcon icon="home" intent={color} fontSize={size} width={w} />
}
`
    const output = transform(input)
    expect(output).toContain('intent={color}')
    expect(output).toContain('fontSize={size}')
    expect(output).toContain('width={w}')
    expect(output).toContain('TODO: Migrate dynamic props manually')
    // Should only have ONE TODO comment for dynamic props, not three
    const todoMatches = output.match(/TODO: Migrate dynamic props manually/g)
    expect(todoMatches).not.toBeNull()
    expect(todoMatches!.length).toBe(1)
  })

  test('transforms static props but preserves dynamic ones', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ color }) {
  return <DeprecatedIcon icon="home" intent={color} fontSize="16px" />
}
`
    const output = transform(input)
    expect(output).toContain('size="sm"') // fontSize transformed
    expect(output).toContain('intent={color}') // intent preserved
    expect(output).not.toContain('fontSize') // fontSize removed
    expect(output).toContain('TODO: Migrate dynamic props manually')
  })

  test('preserves props with no initializer', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedIcon icon="home" intent />
}
`
    const output = transform(input)
    expect(output).toContain('intent') // Preserved
    expect(output).toContain('TODO: Migrate dynamic props manually')
  })
})

describe('non-JSX usage handling', () => {
  test('preserves import when DeprecatedIcon used in styled()', () => {
    const input = `
import styled from 'styled-components'
import { DeprecatedIcon } from '@reapit/elements'

const StyledIcon = styled(DeprecatedIcon)\`
  color: red;
\`
`
    const output = transform(input)
    expect(output).toContain('import { DeprecatedIcon }')
    expect(output).toContain('TODO: DeprecatedIcon used as value - needs manual migration')
  })

  test('preserves import when DeprecatedIcon passed as prop', () => {
    const input = `
import { DeprecatedIcon, Button } from '@reapit/elements'

function MyComponent() {
  return <Button icon={DeprecatedIcon} />
}
`
    const output = transform(input)
    expect(output).toContain('import { DeprecatedIcon')
    expect(output).toContain('TODO: DeprecatedIcon used as value - needs manual migration')
  })
})

describe('context-aware comment syntax', () => {
  test('uses JS comment syntax in object literal context', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

const icons = {
  home: <DeprecatedIcon icon="home" fontSize={dynamicSize} />
}
`
    const output = transform(input)
    expect(output).toContain('// TODO: Migrate dynamic props manually')
  })

  test('uses JSX comment syntax in JSX child context', () => {
    const input = `
import { DeprecatedIcon } from '@reapit/elements'

function MyComponent({ size }) {
  return (
    <div>
      <DeprecatedIcon icon="home" fontSize={size} />
    </div>
  )
}
`
    const output = transform(input)
    expect(output).toContain('{/* TODO: Migrate dynamic props manually */}')
  })
})
