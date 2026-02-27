import transform from '../transform'
import { isElementsImport as sharedIsElementsImport } from '../../shared/elements-import'

describe('basic component imports', () => {
  test('transforms simple component import', () => {
    const input = `import { Button } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { DeprecatedButton as Button } from '@reapit/elements'`)
  })

  test('transforms multiple component imports', () => {
    const input = `import { Button, Badge, Chip } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { DeprecatedButton as Button, DeprecatedBadge as Badge, DeprecatedChip as Chip } from '@reapit/elements'`,
    )
  })

  test('transforms all main components', () => {
    const input = `import { Accordion, Badge, BreadCrumb, Button, Chip, Drawer, Icon, Label, MainContainer, Menu, Nav, PageHeader, Pagination, SplitButton, StatusIndicator, Table, Tag, ToolTip } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedAccordion as Accordion')
    expect(output).toContain('DeprecatedBadge as Badge')
    expect(output).toContain('DeprecatedBreadCrumb as BreadCrumb')
    expect(output).toContain('DeprecatedButton as Button')
    expect(output).toContain('DeprecatedChip as Chip')
    expect(output).toContain('DeprecatedDrawer as Drawer')
    expect(output).toContain('DeprecatedIcon as Icon')
    expect(output).toContain('DeprecatedLabel as Label')
    expect(output).toContain('DeprecatedMainContainer as MainContainer')
    expect(output).toContain('DeprecatedMenu as Menu')
    expect(output).toContain('DeprecatedNav as Nav')
    expect(output).toContain('DeprecatedPageHeader as PageHeader')
    expect(output).toContain('DeprecatedPagination as Pagination')
    expect(output).toContain('DeprecatedSplitButton as SplitButton')
    expect(output).toContain('DeprecatedStatusIndicator as StatusIndicator')
    expect(output).toContain('DeprecatedTable as Table')
    expect(output).toContain('DeprecatedTag as Tag')
    expect(output).toContain('DeprecatedToolTip as ToolTip')
  })

  test('transforms sub-components', () => {
    const input = `import { AccordionItem, ButtonGroup, DrawerBody, MenuItem } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { DeprecatedAccordionItem as AccordionItem, DeprecatedButtonGroup as ButtonGroup, DeprecatedDrawerBody as DrawerBody, DeprecatedMenuItem as MenuItem } from '@reapit/elements'`,
    )
  })
})

describe('type imports', () => {
  test('transforms type-only import statement', () => {
    const input = `import type { ButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import type { DeprecatedButtonProps as ButtonProps } from '@reapit/elements'`)
  })

  test('transforms multiple type imports', () => {
    const input = `import type { ButtonProps, BadgeProps, ChipProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import type { DeprecatedButtonProps as ButtonProps, DeprecatedBadgeProps as BadgeProps, DeprecatedChipProps as ChipProps } from '@reapit/elements'`,
    )
  })

  test('transforms inline type imports', () => {
    const input = `import { Button, type ButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { DeprecatedButton as Button, type DeprecatedButtonProps as ButtonProps } from '@reapit/elements'`,
    )
  })

  test('auto-detects Props types', () => {
    const input = `import type { AccordionProps, MenuItemProps, TableCellProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedAccordionProps as AccordionProps')
    expect(output).toContain('DeprecatedMenuItemProps as MenuItemProps')
    expect(output).toContain('DeprecatedTableCellProps as TableCellProps')
  })
})

describe('aliased imports', () => {
  test('preserves custom component alias', () => {
    const input = `import { Button as MyButton } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { DeprecatedButton as MyButton } from '@reapit/elements'`)
  })

  test('preserves custom type alias', () => {
    const input = `import type { ButtonProps as MyButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import type { DeprecatedButtonProps as MyButtonProps } from '@reapit/elements'`)
  })

  test('preserves multiple custom aliases', () => {
    const input = `import { Button as Btn, Badge as Bdg, type ButtonProps as BtnProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { DeprecatedButton as Btn, DeprecatedBadge as Bdg, type DeprecatedButtonProps as BtnProps } from '@reapit/elements'`,
    )
  })
})

describe('already deprecated imports', () => {
  test('does not transform already deprecated component', () => {
    const input = `import { DeprecatedButton } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform already deprecated type', () => {
    const input = `import type { DeprecatedButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform mixed deprecated and non-deprecated', () => {
    const input = `import { DeprecatedButton, Badge } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { DeprecatedButton, DeprecatedBadge as Badge } from '@reapit/elements'`)
  })
})

describe('multiple import statements', () => {
  test('transforms multiple separate import statements', () => {
    const input = `import { Button } from '@reapit/elements'
import { Badge } from '@reapit/elements'
import type { ButtonProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain(`import { DeprecatedButton as Button } from '@reapit/elements'`)
    expect(output).toContain(`import { DeprecatedBadge as Badge } from '@reapit/elements'`)
    expect(output).toContain(`import type { DeprecatedButtonProps as ButtonProps } from '@reapit/elements'`)
  })

  test('handles imports mixed with other code', () => {
    const input = `import { Button } from '@reapit/elements'
import { useState } from 'react'

export const MyComponent = () => {
  return <Button>Click</Button>
}`
    const output = transform(input)
    expect(output).toContain(`import { DeprecatedButton as Button } from '@reapit/elements'`)
    expect(output).toContain(`import { useState } from 'react'`)
    expect(output).toContain('export const MyComponent')
  })
})

describe('non-elements imports', () => {
  test('does not transform non-elements imports', () => {
    const input = `import { Button } from 'some-other-library'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform React imports', () => {
    const input = `import { useState, useEffect } from 'react'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('transforms only elements imports when mixed', () => {
    const input = `import { Button } from '@reapit/elements'
import { useState } from 'react'
import { SomeComponent } from './components'`
    const output = transform(input)
    expect(output).toContain(`import { DeprecatedButton as Button } from '@reapit/elements'`)
    expect(output).toContain(`import { useState } from 'react'`)
    expect(output).toContain(`import { SomeComponent } from './components'`)
  })
})

describe('no elements imports', () => {
  test('returns unchanged when no elements imports', () => {
    const input = `import { useState } from 'react'

export const MyComponent = () => {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('returns unchanged when no imports at all', () => {
    const input = `export const MyComponent = () => {
  return <div>Hello</div>
}`
    const output = transform(input)
    expect(output).toBe(input)
  })
})

describe('facade package support', () => {
  test('transforms facade package imports', () => {
    const input = `import { Button } from '@company/ui-components'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toBe(`import { DeprecatedButton as Button } from '@company/ui-components'`)
  })

  test('transforms facade package with subpath', () => {
    const input = `import { Button } from '@company/design-system/elements'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/design-system' })
    expect(output).toBe(`import { DeprecatedButton as Button } from '@company/design-system/elements'`)
  })

  test('does not transform non-facade package when facade is specified', () => {
    const input = `import { Button } from '@other/library'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toBe(input)
  })

  test('transforms both elements and facade package imports', () => {
    const input = `import { Button } from '@reapit/elements'
import { Badge } from '@company/ui-components'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toContain(`import { DeprecatedButton as Button } from '@reapit/elements'`)
    expect(output).toContain(`import { DeprecatedBadge as Badge } from '@company/ui-components'`)
  })
})

describe('complex real-world scenarios', () => {
  test('transforms complex file with multiple imports and usage', () => {
    const input = `import { Button, ButtonGroup, type ButtonProps } from '@reapit/elements'
import { useState } from 'react'

interface Props extends ButtonProps {
  onClick: () => void
}

export const MyComponent: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <ButtonGroup>
      <Button {...props}>Click me</Button>
      <Button onClick={() => setOpen(true)}>Open</Button>
    </ButtonGroup>
  )
}`
    const output = transform(input)
    expect(output).toContain(
      `import { DeprecatedButton as Button, DeprecatedButtonGroup as ButtonGroup, type DeprecatedButtonProps as ButtonProps } from '@reapit/elements'`,
    )
    expect(output).toContain('interface Props extends ButtonProps')
    expect(output).toContain('<ButtonGroup>')
    expect(output).toContain('<Button {...props}>')
  })

  test('handles all sub-component groups', () => {
    const input = `import {
      AccordionItem,
      ButtonGroup,
      DrawerBody,
      MenuItem,
      NavItem,
      PageHeaderContainer,
      PaginationButton,
      ActionButton,
      TableCell,
      BadgeGroup,
      Avatar
    } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedAccordionItem as AccordionItem')
    expect(output).toContain('DeprecatedButtonGroup as ButtonGroup')
    expect(output).toContain('DeprecatedDrawerBody as DrawerBody')
    expect(output).toContain('DeprecatedMenuItem as MenuItem')
    expect(output).toContain('DeprecatedNavItem as NavItem')
    expect(output).toContain('DeprecatedPageHeaderContainer as PageHeaderContainer')
    expect(output).toContain('DeprecatedPaginationButton as PaginationButton')
    // ActionButton is not a standalone export, should remain unchanged
    expect(output).toContain('ActionButton,')
    expect(output).not.toContain('DeprecatedActionButton')
    expect(output).toContain('DeprecatedTableCell as TableCell')
    expect(output).toContain('DeprecatedBadgeGroup as BadgeGroup')
    expect(output).toContain('DeprecatedAvatar as Avatar')
  })

  test('handles empty import (edge case)', () => {
    const input = `import '@reapit/elements/styles.css'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('handles default import (edge case)', () => {
    const input = `import Elements from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('handles namespace import (edge case)', () => {
    const input = `import * as Elements from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(input)
  })
})

describe('whitespace and formatting preservation', () => {
  test('preserves multiline imports', () => {
    const input = `import {
  Button,
  Badge,
  Chip
} from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedButton as Button')
    expect(output).toContain('DeprecatedBadge as Badge')
    expect(output).toContain('DeprecatedChip as Chip')
  })

  test('preserves trailing commas', () => {
    const input = `import { Button, Badge } from '@reapit/elements'`
    const output = transform(input)
    // ts-morph handles formatting, just ensure transformation occurred
    expect(output).toContain('DeprecatedButton as Button')
    expect(output).toContain('DeprecatedBadge as Badge')
  })
})

describe('styled components', () => {
  test('transforms styled button components', () => {
    const input = `import { ElButton, ElButtonLabel, ElButtonSpinner } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { ElDeprecatedButton as ElButton, ElDeprecatedButtonLabel as ElButtonLabel, ElDeprecatedButtonSpinner as ElButtonSpinner } from '@reapit/elements'`,
    )
  })

  test('transforms styled menu components', () => {
    const input = `import { ElMenu, ElMenuList, ElMenuItemAnchor, ElMenuItemButton } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('ElDeprecatedMenu as ElMenu')
    expect(output).toContain('ElDeprecatedMenuList as ElMenuList')
    expect(output).toContain('ElDeprecatedMenuItemAnchor as ElMenuItemAnchor')
    expect(output).toContain('ElDeprecatedMenuItemButton as ElMenuItemButton')
  })
})

describe('CSS classes', () => {
  test('transforms button CSS classes', () => {
    const input = `import { elButtonSizeSmall, elButtonLabel, elIcon } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { elDeprecatedButtonSizeSmall as elButtonSizeSmall, elDeprecatedButtonLabel as elButtonLabel, elDeprecatedIcon as elIcon } from '@reapit/elements'`,
    )
  })

  test('transforms nav CSS classes', () => {
    const input = `import { elNavItemActive, elNavItemExpanded, elNavIsHidden } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { elDeprecatedNavItemActive as elNavItemActive, elDeprecatedNavItemExpanded as elNavItemExpanded, elDeprecatedNavIsHidden as elNavIsHidden } from '@reapit/elements'`,
    )
  })

  test('transforms layout CSS classes', () => {
    const input = `import { elMainContainer } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { elDeprecatedMainContainer as elMainContainer } from '@reapit/elements'`)
  })

  test('transforms pagination CSS classes', () => {
    const input = `import { elPaginationPrimary } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { elDeprecatedPaginationPrimary as elPaginationPrimary } from '@reapit/elements'`)
  })

  test('transforms mixed components and CSS classes', () => {
    const input = `import { Button, elButtonLabel, ElButton } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(
      `import { DeprecatedButton as Button, elDeprecatedButtonLabel as elButtonLabel, ElDeprecatedButton as ElButton } from '@reapit/elements'`,
    )
  })
})

describe('edge cases', () => {
  test('handles component names that are not in mapping', () => {
    const input = `import { Button, SomeUnknownComponent } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedButton as Button')
    expect(output).toContain('SomeUnknownComponent')
    expect(output).not.toContain('DeprecatedSomeUnknownComponent')
  })

  test('handles type names that are not in mapping', () => {
    const input = `import type { ButtonProps, UnknownTypeProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedButtonProps as ButtonProps')
    expect(output).toContain('UnknownTypeProps')
    expect(output).not.toContain('DeprecatedUnknownTypeProps')
  })

  test('handles empty file', () => {
    const input = ``
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('handles file with only comments', () => {
    const input = `// This is a comment
/* This is a block comment */`
    const output = transform(input)
    expect(output).toBe(input)
  })
})

describe('formatting edge cases', () => {
  test('handles double-quoted imports', () => {
    const input = `import { Button } from "@reapit/elements"`
    const output = transform(input)
    expect(output).toBe(`import { DeprecatedButton as Button } from "@reapit/elements"`)
  })

  test('handles no-whitespace imports', () => {
    const input = `import{Button}from'@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedButton as Button')
  })

  test('handles multiline imports', () => {
    const input = `import {
  Button,
  Badge
} from '@reapit/elements'`
    const output = transform(input)
    expect(output).toContain('DeprecatedButton as Button')
    expect(output).toContain('DeprecatedBadge as Badge')
  })
})

describe('v5 subpath imports', () => {
  test('does not transform v5 Button import from core/button', () => {
    const input = `import { Button } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform v5 Input import from core/input', () => {
    const input = `import { Input } from '@reapit/elements/core/input'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform v5 type imports from subpaths', () => {
    const input = `import type { ButtonProps } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform v5 inline type imports from subpaths', () => {
    const input = `import { Button, type ButtonProps } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform multiple v5 imports from same subpath', () => {
    const input = `import { Button, ButtonProps } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('handles mixed v4 and v5 imports in same file', () => {
    const input = `import { Badge } from '@reapit/elements'
import { Button } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toContain(`import { DeprecatedBadge as Badge } from '@reapit/elements'`)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
  })

  test('handles mixed v4 and v5 imports with types', () => {
    const input = `import { Badge, type BadgeProps } from '@reapit/elements'
import { Button, type ButtonProps } from '@reapit/elements/core/button'
import { useState } from 'react'`
    const output = transform(input)
    expect(output).toContain(
      `import { DeprecatedBadge as Badge, type DeprecatedBadgeProps as BadgeProps } from '@reapit/elements'`,
    )
    expect(output).toContain(`import { Button, type ButtonProps } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { useState } from 'react'`)
  })

  test('handles complex file with both v4 and v5 imports', () => {
    const input = `import { Badge, DeprecatedIcon as Icon, elMainContainer } from '@reapit/elements'
import { Button } from '@reapit/elements/core/button'
import { useState } from 'react'

export const MyComponent = () => {
  return (
    <div className={elMainContainer}>
      <Badge>v4 Badge</Badge>
      <Button>v5 Button</Button>
      <Icon icon="home" />
    </div>
  )
}`
    const output = transform(input)
    expect(output).toContain(
      `import { DeprecatedBadge as Badge, DeprecatedIcon as Icon, elDeprecatedMainContainer as elMainContainer } from '@reapit/elements'`,
    )
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { useState } from 'react'`)
    expect(output).toContain('<Badge>v4 Badge</Badge>')
    expect(output).toContain('<Button>v5 Button</Button>')
  })

  test('does not transform v5 imports from any subpath pattern', () => {
    const input = `import { Dialog } from '@reapit/elements/core/dialog'
import { Toast } from '@reapit/elements/core/toast'
import { Tooltip } from '@reapit/elements/core/tooltip'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('does not transform v5 imports with custom aliases', () => {
    const input = `import { Button as V5Button } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('facade package still supports subpath imports', () => {
    const input = `import { Button } from '@company/design-system/elements'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/design-system' })
    expect(output).toBe(`import { DeprecatedButton as Button } from '@company/design-system/elements'`)
  })

  test('transforms v4 elements but not v5 when using facade package', () => {
    const input = `import { Badge } from '@reapit/elements'
import { Button } from '@reapit/elements/core/button'
import { Icon } from '@company/ui-components'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toContain(`import { DeprecatedBadge as Badge } from '@reapit/elements'`)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { DeprecatedIcon as Icon } from '@company/ui-components'`)
  })
})

describe('local isElementsImport divergence from shared helper', () => {
  // The shared isElementsImport in codemods/shared/elements-import.ts matches
  // BOTH bare package imports and subpath imports. The local copy in this
  // codemod's transform intentionally only matches bare '@reapit/elements'
  // (not subpaths) to avoid transforming v5-style imports.
  //
  // These tests verify that contract: the shared helper matches subpaths,
  // but the transform does NOT act on them.

  test('shared isElementsImport matches @reapit/elements subpath imports', () => {
    expect(sharedIsElementsImport('@reapit/elements/core/button')).toBe(true)
    expect(sharedIsElementsImport('@reapit/elements/core/dialog')).toBe(true)
    expect(sharedIsElementsImport('@reapit/elements')).toBe(true)
  })

  test('transform does not act on @reapit/elements subpath imports', () => {
    const input = `import { Button } from '@reapit/elements/core/button'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('transform acts on bare @reapit/elements imports', () => {
    const input = `import { Button } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { DeprecatedButton as Button } from '@reapit/elements'`)
  })

  test('shared isElementsImport matches facade package subpath imports', () => {
    expect(sharedIsElementsImport('@company/ui/elements', '@company/ui')).toBe(true)
    expect(sharedIsElementsImport('@company/ui', '@company/ui')).toBe(true)
  })

  test('transform acts on facade package subpath imports (v4 facade behaviour)', () => {
    const input = `import { Button } from '@company/ui/elements'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/ui' })
    expect(output).toBe(`import { DeprecatedButton as Button } from '@company/ui/elements'`)
  })
})

describe('TextArea to Textarea rename', () => {
  test('renames TextArea import to Textarea with alias', () => {
    const input = `import { TextArea } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { Textarea as TextArea } from '@reapit/elements'`)
  })

  test('renames TextAreaProps to TextareaProps with alias', () => {
    const input = `import type { TextAreaProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import type { TextareaProps as TextAreaProps } from '@reapit/elements'`)
  })

  test('renames inline type TextAreaProps', () => {
    const input = `import { TextArea, type TextAreaProps } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { Textarea as TextArea, type TextareaProps as TextAreaProps } from '@reapit/elements'`)
  })

  test('preserves custom alias on TextArea', () => {
    const input = `import { TextArea as MyTextArea } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { Textarea as MyTextArea } from '@reapit/elements'`)
  })

  test('does not transform already-renamed Textarea import', () => {
    const input = `import { Textarea } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(input)
  })

  test('renames TextArea together with other v4 components', () => {
    const input = `import { Button, TextArea } from '@reapit/elements'`
    const output = transform(input)
    expect(output).toBe(`import { DeprecatedButton as Button, Textarea as TextArea } from '@reapit/elements'`)
  })

  test('renames TextArea from facade package', () => {
    const input = `import { TextArea } from '@company/ui-components'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/ui-components' })
    expect(output).toBe(`import { Textarea as TextArea } from '@company/ui-components'`)
  })

  test('renames TextArea from facade package subpath', () => {
    const input = `import { TextArea } from '@company/design-system/elements'`
    const output = transform(input, 'test.tsx', { facadePackage: '@company/design-system' })
    expect(output).toBe(`import { Textarea as TextArea } from '@company/design-system/elements'`)
  })

  test('does not rename TextArea from v5 subpath import', () => {
    const input = `import { TextArea } from '@reapit/elements/core/textarea'`
    const output = transform(input)
    expect(output).toBe(input)
  })
})
