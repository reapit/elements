# Menu Drawer Navigation Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement navigation components for TopBar MenuDrawer that mirror SideBar patterns with support for both anchor-based navigation and button-based actions.

**Architecture:** Create MenuItem (simple), MenuGroup (expandable with submenu), and Submenu components following the namespace interface pattern. Use base components for anchor/button variants to maximize code reuse. Follow SideBar structure closely for consistency.

**Tech Stack:** React, TypeScript, Linaria (CSS-in-JS), Vitest, React Testing Library

**Reference Components:**

- `src/core/side-bar/menu-group/` - MenuGroup pattern with `<details>` element
- `src/core/side-bar/menu-item/` - MenuItem anchor pattern
- `src/core/side-bar/submenu/` - Submenu list pattern
- `src/core/top-bar/nav-icon-item/nav-icon-item-base.tsx` - Base component pattern

**Design Tokens (from Figma):**

- Spacing: `--spacing-4` (16px), `--spacing-2` (8px)
- Border radius: `--comp-navigation-border-radius-nav_item-mobile`
- Text color: `--comp-navigation-colour-text-mobile_nav-default`
- Background (expanded): `--comp-navigation-colour-fill-mobile_nav-expanded`
- Font: `font/base/regular` via `font()` helper

---

## Task 1: MenuItem Styles

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-item/styles.ts`

**Step 1: Create menu-item directory**

```bash
mkdir -p src/core/top-bar/menu-drawer/menu-item/__tests__
```

**Step 2: Write MenuItem styles**

Create `src/core/top-bar/menu-drawer/menu-item/styles.ts`:

```typescript
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '#src/core/text/index'

export const elTopBarMenuDrawerMenuItem = css`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-template-areas: 'label';
  grid-template-columns: 1fr;

  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  width: 100%;

  text-decoration: none;
  border: none;
  background: transparent;
  text-align: left;
  border-radius: var(--comp-navigation-border-radius-nav_item-mobile);

  &:hover,
  &:focus-visible {
    background: var(--colour-fill-neutral-light);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`

export const ElTopBarMenuDrawerMenuItemLabel = styled.span`
  grid-area: label;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--comp-navigation-colour-text-mobile_nav-default);
  ${font('base', 'regular')}

  [aria-current='page'] > & {
    ${font('base', 'medium')}
  }
`
```

**Step 3: Commit styles**

```bash
git add src/core/top-bar/menu-drawer/menu-item/styles.ts
git commit -m "feat(menu-drawer): add MenuItem styles"
```

---

## Task 2: MenuItem Base Component

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-item/menu-item-base.tsx`

**Step 1: Write MenuItem base component**

Create `src/core/top-bar/menu-drawer/menu-item/menu-item-base.tsx`:

```typescript
import { ElTopBarMenuDrawerMenuItemLabel } from './styles'
import type { ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuItemBase {
  export interface Props {
    children: ReactNode
  }
}

/**
 * Base component for menu drawer items. Provides shared label structure.
 * Not exported publicly - used internally by anchor and button variants.
 */
export function TopBarMenuDrawerMenuItemBase({ children }: TopBarMenuDrawerMenuItemBase.Props) {
  return <ElTopBarMenuDrawerMenuItemLabel>{children}</ElTopBarMenuDrawerMenuItemLabel>
}
```

**Step 2: Commit base component**

```bash
git add src/core/top-bar/menu-drawer/menu-item/menu-item-base.tsx
git commit -m "feat(menu-drawer): add MenuItem base component"
```

---

## Task 3: MenuItem Anchor Variant with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-item/menu-item.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-item/menu-item.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-item/__tests__/menu-item.test.tsx`

**Step 1: Write failing test for MenuItem anchor**

Create `src/core/top-bar/menu-drawer/menu-item/__tests__/menu-item.test.tsx`:

```typescript
import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../menu-item.stories'
import { elTopBarMenuDrawerMenuItem } from '../styles'

const MenuItemStories = composeStories(stories)

test('renders a link', () => {
  render(<MenuItemStories.Default>Item</MenuItemStories.Default>)
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

test(`combines the .${elTopBarMenuDrawerMenuItem} and consumer-supplied classes correctly`, () => {
  render(<MenuItemStories.Default className="my-custom-class" />)
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuItem} my-custom-class`)
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(<MenuItemStories.Default>Item</MenuItemStories.Default>)
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(<MenuItemStories.Selected>Item</MenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})

test('has correct href attribute', () => {
  render(<MenuItemStories.Default href="/test" />)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test menu-item.test.tsx
```

Expected: FAIL - stories and component don't exist

**Step 3: Write MenuItem anchor component**

Create `src/core/top-bar/menu-drawer/menu-item/menu-item.tsx`:

```typescript
import { cx } from '@linaria/core'
import { elTopBarMenuDrawerMenuItem } from './styles'
import { TopBarMenuDrawerMenuItemBase } from './menu-item-base'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuItem {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * When the item represents the current page, `aria-current="page"` should be supplied.
     */
    'aria-current': 'page' | false
    /**
     * The label of the menu item.
     */
    children: ReactNode
    /**
     * The URL to navigate to when this item is activated.
     */
    href: string
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerMenuItem.Props` instead
 */
export type TopBarMenuDrawerMenuItemProps = TopBarMenuDrawerMenuItem.Props

/**
 * Simple anchor-based menu item for use in TopBar MenuDrawer. Always navigates to another page.
 */
export function TopBarMenuDrawerMenuItem({
  'aria-current': ariaCurrent,
  children,
  className,
  ...rest
}: TopBarMenuDrawerMenuItem.Props) {
  return (
    <a {...rest} aria-current={ariaCurrent} className={cx(elTopBarMenuDrawerMenuItem, className)}>
      <TopBarMenuDrawerMenuItemBase>{children}</TopBarMenuDrawerMenuItemBase>
    </a>
  )
}
```

**Step 4: Write MenuItem stories**

Create `src/core/top-bar/menu-drawer/menu-item/menu-item.stories.tsx`:

```typescript
import { TopBarMenuDrawerMenuItem } from './menu-item'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuItem',
  component: TopBarMenuDrawerMenuItem,
  args: {
    children: 'Dashboard',
    href: '/dashboard',
    'aria-current': false,
  },
} satisfies Meta<typeof TopBarMenuDrawerMenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: {
    'aria-current': 'page',
  },
}
```

**Step 5: Run test to verify it passes**

```bash
yarn test menu-item.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit MenuItem anchor**

```bash
git add src/core/top-bar/menu-drawer/menu-item/menu-item.tsx
git add src/core/top-bar/menu-drawer/menu-item/menu-item.stories.tsx
git add src/core/top-bar/menu-drawer/menu-item/__tests__/menu-item.test.tsx
git commit -m "feat(menu-drawer): add MenuItem anchor variant with tests"
```

---

## Task 4: MenuItem Button Variant with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-item/menu-item-button.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-item/menu-item-button.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-item/__tests__/menu-item-button.test.tsx`

**Step 1: Write failing test for MenuItem button**

Create `src/core/top-bar/menu-drawer/menu-item/__tests__/menu-item-button.test.tsx`:

```typescript
import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as stories from '../menu-item-button.stories'
import { elTopBarMenuDrawerMenuItem } from '../styles'

const MenuItemButtonStories = composeStories(stories)

test('renders a button', () => {
  render(<MenuItemButtonStories.Default>Action</MenuItemButtonStories.Default>)
  expect(screen.getByRole('button', { name: 'Action' })).toBeVisible()
})

test(`combines the .${elTopBarMenuDrawerMenuItem} and consumer-supplied classes correctly`, () => {
  render(<MenuItemButtonStories.Default className="my-custom-class" />)
  expect(screen.getByRole('button')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuItem} my-custom-class`)
})

test('triggers onClick handler when clicked', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()

  render(<MenuItemButtonStories.Default onClick={handleClick} />)

  await user.click(screen.getByRole('button'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('has type="button" by default', () => {
  render(<MenuItemButtonStories.Default />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test menu-item-button.test.tsx
```

Expected: FAIL - stories and component don't exist

**Step 3: Write MenuItem button component**

Create `src/core/top-bar/menu-drawer/menu-item/menu-item-button.tsx`:

```typescript
import { cx } from '@linaria/core'
import { elTopBarMenuDrawerMenuItem } from './styles'
import { TopBarMenuDrawerMenuItemBase } from './menu-item-base'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuItemButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The label of the menu item.
     */
    children: ReactNode
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerMenuItemButton.Props` instead
 */
export type TopBarMenuDrawerMenuItemButtonProps = TopBarMenuDrawerMenuItemButton.Props

/**
 * Simple button-based menu item for use in TopBar MenuDrawer. Used for actions that don't navigate.
 */
export function TopBarMenuDrawerMenuItemButton({
  children,
  className,
  type = 'button',
  ...rest
}: TopBarMenuDrawerMenuItemButton.Props) {
  return (
    <button {...rest} type={type} className={cx(elTopBarMenuDrawerMenuItem, className)}>
      <TopBarMenuDrawerMenuItemBase>{children}</TopBarMenuDrawerMenuItemBase>
    </button>
  )
}
```

**Step 4: Write MenuItem button stories**

Create `src/core/top-bar/menu-drawer/menu-item/menu-item-button.stories.tsx`:

```typescript
import { TopBarMenuDrawerMenuItemButton } from './menu-item-button'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuItemButton',
  component: TopBarMenuDrawerMenuItemButton,
  args: {
    children: 'Sign Out',
    onClick: () => alert('Clicked!'),
  },
} satisfies Meta<typeof TopBarMenuDrawerMenuItemButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

**Step 5: Run test to verify it passes**

```bash
yarn test menu-item-button.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit MenuItem button**

```bash
git add src/core/top-bar/menu-drawer/menu-item/menu-item-button.tsx
git add src/core/top-bar/menu-drawer/menu-item/menu-item-button.stories.tsx
git add src/core/top-bar/menu-drawer/menu-item/__tests__/menu-item-button.test.tsx
git commit -m "feat(menu-drawer): add MenuItem button variant with tests"
```

---

## Task 5: MenuItem Index Exports

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-item/index.ts`

**Step 1: Write MenuItem index exports**

Create `src/core/top-bar/menu-drawer/menu-item/index.ts`:

```typescript
export { TopBarMenuDrawerMenuItem } from './menu-item'
export { TopBarMenuDrawerMenuItemButton } from './menu-item-button'

export type { TopBarMenuDrawerMenuItem as TopBarMenuDrawerMenuItemNamespace } from './menu-item'
export type { TopBarMenuDrawerMenuItemButton as TopBarMenuDrawerMenuItemButtonNamespace } from './menu-item-button'
```

**Step 2: Commit MenuItem exports**

```bash
git add src/core/top-bar/menu-drawer/menu-item/index.ts
git commit -m "feat(menu-drawer): add MenuItem index exports"
```

---

## Task 6: Submenu Styles

**Files:**

- Create: `src/core/top-bar/menu-drawer/submenu/styles.ts`

**Step 1: Create submenu directory**

```bash
mkdir -p src/core/top-bar/menu-drawer/submenu/__tests__
```

**Step 2: Write Submenu styles**

Create `src/core/top-bar/menu-drawer/submenu/styles.ts`:

```typescript
import { styled } from '@linaria/react'
import { font } from '#src/core/text/index'

export const ElTopBarMenuDrawerSubmenuList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  margin-block: 0;
  padding-inline: 0;
  padding-block-end: var(--spacing-2);
`

export const ElTopBarMenuDrawerSubmenuListItem = styled.li`
  display: block;
`

export const ElTopBarMenuDrawerSubmenuItemLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  padding: var(--spacing-2) var(--spacing-4);
  display: block;

  color: var(--comp-navigation-colour-text-mobile_nav-default);
  ${font('base', 'regular')}

  [aria-current='page'] > & {
    ${font('base', 'medium')}
  }
`
```

**Step 3: Commit Submenu styles**

```bash
git add src/core/top-bar/menu-drawer/submenu/styles.ts
git commit -m "feat(menu-drawer): add Submenu styles"
```

---

## Task 7: Submenu Container with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/submenu/submenu.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/submenu.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/__tests__/submenu.test.tsx`

**Step 1: Write failing test for Submenu**

Create `src/core/top-bar/menu-drawer/submenu/__tests__/submenu.test.tsx`:

```typescript
import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../submenu.stories'

const SubmenuStories = composeStories(stories)

test('renders a list', () => {
  render(<SubmenuStories.Default />)
  expect(screen.getByRole('list')).toBeVisible()
})

test('renders list items as children', () => {
  render(<SubmenuStories.Default />)
  const list = screen.getByRole('list')
  expect(list.children).toHaveLength(3)
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test submenu.test.tsx
```

Expected: FAIL - stories and component don't exist

**Step 3: Write Submenu component**

Create `src/core/top-bar/menu-drawer/submenu/submenu.tsx`:

```typescript
import { ElTopBarMenuDrawerSubmenuList } from './styles'
import { TopBarMenuDrawerSubmenuListItem } from './submenu-list-item'

import type { ComponentProps, ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenu {
  export interface Props extends ComponentProps<typeof ElTopBarMenuDrawerSubmenuList> {
    /**
     * A collection of items, typically `TopBar.MenuDrawerSubmenuItem` or `TopBar.MenuDrawerSubmenuItemButton` components
     */
    children: ReactNode
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerSubmenu.Props` instead
 */
export type TopBarMenuDrawerSubmenuProps = TopBarMenuDrawerSubmenu.Props

/**
 * A simple submenu for use in TopBar MenuDrawer. Typically used as the child of a MenuGroup.
 * The submenu itself will typically contain a collection of SubmenuItem or SubmenuItemButton components.
 */
export function TopBarMenuDrawerSubmenu({ children, ...rest }: TopBarMenuDrawerSubmenu.Props) {
  return <ElTopBarMenuDrawerSubmenuList {...rest}>{children}</ElTopBarMenuDrawerSubmenuList>
}

TopBarMenuDrawerSubmenu.displayName = 'TopBar.MenuDrawer.Submenu'

TopBarMenuDrawerSubmenu.Item = TopBarMenuDrawerSubmenuListItem
```

**Step 4: Write Submenu stories (temporary - will update after list item)**

Create `src/core/top-bar/menu-drawer/submenu/submenu.stories.tsx`:

```typescript
import { TopBarMenuDrawerSubmenu } from './submenu'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/Submenu',
  component: TopBarMenuDrawerSubmenu,
  args: {
    children: (
      <>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </>
    ),
  },
} satisfies Meta<typeof TopBarMenuDrawerSubmenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

**Step 5: Run test to verify it passes**

```bash
yarn test submenu.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit Submenu container**

```bash
git add src/core/top-bar/menu-drawer/submenu/submenu.tsx
git add src/core/top-bar/menu-drawer/submenu/submenu.stories.tsx
git add src/core/top-bar/menu-drawer/submenu/__tests__/submenu.test.tsx
git commit -m "feat(menu-drawer): add Submenu container with tests"
```

---

## Task 8: SubmenuItem Anchor with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/submenu/submenu-item.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/submenu-item.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/__tests__/submenu-item.test.tsx`

**Step 1: Write failing test for SubmenuItem anchor**

Create `src/core/top-bar/menu-drawer/submenu/__tests__/submenu-item.test.tsx`:

```typescript
import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../submenu-item.stories'

const SubmenuItemStories = composeStories(stories)

test('renders a link', () => {
  render(<SubmenuItemStories.Default>Profile</SubmenuItemStories.Default>)
  expect(screen.getByRole('link', { name: 'Profile' })).toBeVisible()
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(<SubmenuItemStories.Default>Profile</SubmenuItemStories.Default>)
  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(<SubmenuItemStories.Selected>Profile</SubmenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page')
})

test('has correct href attribute', () => {
  render(<SubmenuItemStories.Default href="/settings/profile" />)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/settings/profile')
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test submenu-item.test.tsx
```

Expected: FAIL - stories and component don't exist

**Step 3: Write SubmenuItem component**

Create `src/core/top-bar/menu-drawer/submenu/submenu-item.tsx`:

```typescript
import { cx } from '@linaria/core'
import { ElTopBarMenuDrawerSubmenuItemLabel } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenuItem {
  export interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-current'> {
    /**
     * When the item represents the current page, `aria-current="page"` should be supplied.
     */
    'aria-current': 'page' | false
    /**
     * The label of the menu item.
     */
    children: ReactNode
    /**
     * The URL to navigate to when this item is activated.
     */
    href: string
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerSubmenuItem.Props` instead
 */
export type TopBarMenuDrawerSubmenuItemProps = TopBarMenuDrawerSubmenuItem.Props

/**
 * A simple anchor-based submenu item for use in TopBar MenuDrawer submenus.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.MenuDrawerSubmenuItem`
 * as it wraps the anchor element in a list item (`<li>`) to ensure good semantics and accessibility.
 */
export function TopBarMenuDrawerSubmenuItem({
  'aria-current': ariaCurrent,
  children,
  className,
  ...rest
}: TopBarMenuDrawerSubmenuItem.Props) {
  return (
    <a {...rest} aria-current={ariaCurrent} className={cx(className)}>
      <ElTopBarMenuDrawerSubmenuItemLabel>{children}</ElTopBarMenuDrawerSubmenuItemLabel>
    </a>
  )
}
```

**Step 4: Write SubmenuItem stories**

Create `src/core/top-bar/menu-drawer/submenu/submenu-item.stories.tsx`:

```typescript
import { TopBarMenuDrawerSubmenuItem } from './submenu-item'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/SubmenuItem',
  component: TopBarMenuDrawerSubmenuItem,
  args: {
    children: 'Profile',
    href: '/settings/profile',
    'aria-current': false,
  },
} satisfies Meta<typeof TopBarMenuDrawerSubmenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: {
    'aria-current': 'page',
  },
}
```

**Step 5: Run test to verify it passes**

```bash
yarn test submenu-item.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit SubmenuItem anchor**

```bash
git add src/core/top-bar/menu-drawer/submenu/submenu-item.tsx
git add src/core/top-bar/menu-drawer/submenu/submenu-item.stories.tsx
git add src/core/top-bar/menu-drawer/submenu/__tests__/submenu-item.test.tsx
git commit -m "feat(menu-drawer): add SubmenuItem anchor variant with tests"
```

---

## Task 9: SubmenuItem Button with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/submenu/submenu-item-button.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/submenu-item-button.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/__tests__/submenu-item-button.test.tsx`

**Step 1: Write failing test for SubmenuItem button**

Create `src/core/top-bar/menu-drawer/submenu/__tests__/submenu-item-button.test.tsx`:

```typescript
import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as stories from '../submenu-item-button.stories'

const SubmenuItemButtonStories = composeStories(stories)

test('renders a button', () => {
  render(<SubmenuItemButtonStories.Default>Logout</SubmenuItemButtonStories.Default>)
  expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible()
})

test('triggers onClick handler when clicked', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()

  render(<SubmenuItemButtonStories.Default onClick={handleClick} />)

  await user.click(screen.getByRole('button'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('has type="button" by default', () => {
  render(<SubmenuItemButtonStories.Default />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test submenu-item-button.test.tsx
```

Expected: FAIL - stories and component don't exist

**Step 3: Write SubmenuItem button component**

Create `src/core/top-bar/menu-drawer/submenu/submenu-item-button.tsx`:

```typescript
import { cx } from '@linaria/core'
import { ElTopBarMenuDrawerSubmenuItemLabel } from './styles'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenuItemButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The label of the menu item.
     */
    children: ReactNode
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerSubmenuItemButton.Props` instead
 */
export type TopBarMenuDrawerSubmenuItemButtonProps = TopBarMenuDrawerSubmenuItemButton.Props

/**
 * A simple button-based submenu item for use in TopBar MenuDrawer submenus.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.MenuDrawerSubmenuItemButton`
 * as it wraps the button element in a list item (`<li>`) to ensure good semantics and accessibility.
 */
export function TopBarMenuDrawerSubmenuItemButton({
  children,
  className,
  type = 'button',
  ...rest
}: TopBarMenuDrawerSubmenuItemButton.Props) {
  return (
    <button {...rest} type={type} className={cx(className)}>
      <ElTopBarMenuDrawerSubmenuItemLabel>{children}</ElTopBarMenuDrawerSubmenuItemLabel>
    </button>
  )
}
```

**Step 4: Write SubmenuItem button stories**

Create `src/core/top-bar/menu-drawer/submenu/submenu-item-button.stories.tsx`:

```typescript
import { TopBarMenuDrawerSubmenuItemButton } from './submenu-item-button'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/SubmenuItemButton',
  component: TopBarMenuDrawerSubmenuItemButton,
  args: {
    children: 'Logout',
    onClick: () => alert('Logout clicked!'),
  },
} satisfies Meta<typeof TopBarMenuDrawerSubmenuItemButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

**Step 5: Run test to verify it passes**

```bash
yarn test submenu-item-button.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit SubmenuItem button**

```bash
git add src/core/top-bar/menu-drawer/submenu/submenu-item-button.tsx
git add src/core/top-bar/menu-drawer/submenu/submenu-item-button.stories.tsx
git add src/core/top-bar/menu-drawer/submenu/__tests__/submenu-item-button.test.tsx
git commit -m "feat(menu-drawer): add SubmenuItem button variant with tests"
```

---

## Task 10: Submenu List Item Wrapper with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/submenu/submenu-list-item.tsx`
- Create: `src/core/top-bar/menu-drawer/submenu/__tests__/submenu-list-item.test.tsx`

**Step 1: Write failing test for SubmenuListItem**

Create `src/core/top-bar/menu-drawer/submenu/__tests__/submenu-list-item.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerSubmenuListItem } from '../submenu-list-item'
import { TopBarMenuDrawerSubmenuItem } from '../submenu-item'

test('wraps children in a list item', () => {
  render(
    <ul>
      <TopBarMenuDrawerSubmenuListItem>
        <TopBarMenuDrawerSubmenuItem href="/test" aria-current={false}>
          Test
        </TopBarMenuDrawerSubmenuItem>
      </TopBarMenuDrawerSubmenuListItem>
    </ul>,
  )

  const link = screen.getByRole('link')
  expect(link.parentElement?.tagName).toBe('LI')
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test submenu-list-item.test.tsx
```

Expected: FAIL - component doesn't exist

**Step 3: Write SubmenuListItem wrapper component**

Create `src/core/top-bar/menu-drawer/submenu/submenu-list-item.tsx`:

```typescript
import { ElTopBarMenuDrawerSubmenuListItem } from './styles'
import { TopBarMenuDrawerSubmenuItem } from './submenu-item'
import { TopBarMenuDrawerSubmenuItemButton } from './submenu-item-button'

import type { ComponentProps, ReactElement } from 'react'

export namespace TopBarMenuDrawerSubmenuListItem {
  export interface Props extends ComponentProps<typeof ElTopBarMenuDrawerSubmenuListItem> {
    children:
      | ReactElement<typeof TopBarMenuDrawerSubmenuItem>
      | ReactElement<typeof TopBarMenuDrawerSubmenuItemButton>
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerSubmenuListItem.Props` instead
 */
export type TopBarMenuDrawerSubmenuListItemProps = TopBarMenuDrawerSubmenuListItem.Props

/**
 * Wraps a submenu item (anchor or button) in a list item element for proper semantics.
 * Used internally by `TopBar.MenuDrawer.Submenu`.
 */
export function TopBarMenuDrawerSubmenuListItem({ children, ...rest }: TopBarMenuDrawerSubmenuListItem.Props) {
  return <ElTopBarMenuDrawerSubmenuListItem {...rest}>{children}</ElTopBarMenuDrawerSubmenuListItem>
}
```

**Step 4: Run test to verify it passes**

```bash
yarn test submenu-list-item.test.tsx
```

Expected: PASS - test green

**Step 5: Update Submenu to use list item wrapper**

Modify `src/core/top-bar/menu-drawer/submenu/submenu.tsx` - update the `Item` attachment:

```typescript
TopBarMenuDrawerSubmenu.Item = TopBarMenuDrawerSubmenuListItem
```

**Step 6: Commit SubmenuListItem**

```bash
git add src/core/top-bar/menu-drawer/submenu/submenu-list-item.tsx
git add src/core/top-bar/menu-drawer/submenu/__tests__/submenu-list-item.test.tsx
git add src/core/top-bar/menu-drawer/submenu/submenu.tsx
git commit -m "feat(menu-drawer): add SubmenuListItem wrapper with tests"
```

---

## Task 11: Submenu Index Exports

**Files:**

- Create: `src/core/top-bar/menu-drawer/submenu/index.ts`

**Step 1: Write Submenu index exports**

Create `src/core/top-bar/menu-drawer/submenu/index.ts`:

```typescript
export { TopBarMenuDrawerSubmenu } from './submenu'
export { TopBarMenuDrawerSubmenuItem } from './submenu-item'
export { TopBarMenuDrawerSubmenuItemButton } from './submenu-item-button'
export { TopBarMenuDrawerSubmenuListItem } from './submenu-list-item'

export type { TopBarMenuDrawerSubmenu as TopBarMenuDrawerSubmenuNamespace } from './submenu'
export type { TopBarMenuDrawerSubmenuItem as TopBarMenuDrawerSubmenuItemNamespace } from './submenu-item'
export type { TopBarMenuDrawerSubmenuItemButton as TopBarMenuDrawerSubmenuItemButtonNamespace } from './submenu-item-button'
```

**Step 2: Commit Submenu exports**

```bash
git add src/core/top-bar/menu-drawer/submenu/index.ts
git commit -m "feat(menu-drawer): add Submenu index exports"
```

---

## Task 12: MenuGroup Styles

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-group/styles.ts`

**Step 1: Create menu-group directory**

```bash
mkdir -p src/core/top-bar/menu-drawer/menu-group/__tests__
```

**Step 2: Write MenuGroup styles**

Create `src/core/top-bar/menu-drawer/menu-group/styles.ts`:

```typescript
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '#src/core/text/index'

export const elTopBarMenuDrawerMenuGroup = css`
  border-radius: var(--comp-navigation-border-radius-nav_item-mobile);
  width: 100%;

  &:open,
  &[open],
  &[data-is-active='true'],
  &:has([aria-current='page']) {
    background: var(--comp-navigation-colour-fill-mobile_nav-expanded);
  }
`

export const elTopBarMenuDrawerMenuGroupSummary = css`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-template-areas: 'label dropdown';
  grid-template-columns: 1fr auto;

  padding: var(--spacing-2) var(--spacing-4);
  width: 100%;

  list-style: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: var(--colour-fill-neutral-light);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  /* Remove default marker */
  &::-webkit-details-marker {
    display: none;
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryLabel = styled.span`
  grid-area: label;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--comp-navigation-colour-text-mobile_nav-default);
  ${font('base', 'regular')}

  :where(details[data-is-active='true'], details:has([aria-current='page'])) & {
    ${font('base', 'medium')}
  }
`

export const ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon = styled.span`
  grid-area: dropdown;

  display: inline-flex;
  align-items: center;

  color: var(--comp-navigation-colour-icon-sidebar-default);

  width: var(--icon_size-s);
  height: var(--icon_size-s);

  details:open & {
    transform: rotate(180deg);
  }
`
```

**Step 3: Commit MenuGroup styles**

```bash
git add src/core/top-bar/menu-drawer/menu-group/styles.ts
git commit -m "feat(menu-drawer): add MenuGroup styles"
```

---

## Task 13: MenuGroup Summary with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-group/menu-group-summary.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-group/menu-group-summary.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-group/__tests__/menu-group-summary.test.tsx`

**Step 1: Write failing test for MenuGroupSummary**

Create `src/core/top-bar/menu-drawer/menu-group/__tests__/menu-group-summary.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuGroupSummary } from '../menu-group-summary'

test('renders as a summary element', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>
    </details>,
  )

  const summary = screen.getByText('Settings')
  expect(summary.tagName).toBe('SUMMARY')
})

test('includes chevron icon', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>
    </details>,
  )

  // Icon should be hidden from accessibility tree
  const icon = screen.getByText('Settings').parentElement?.querySelector('[aria-hidden]')
  expect(icon).toBeInTheDocument()
})

test('renders label text correctly', () => {
  render(
    <details>
      <TopBarMenuDrawerMenuGroupSummary>My Label</TopBarMenuDrawerMenuGroupSummary>
    </details>,
  )

  expect(screen.getByText('My Label')).toBeVisible()
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test menu-group-summary.test.tsx
```

Expected: FAIL - component doesn't exist

**Step 3: Write MenuGroupSummary component**

Create `src/core/top-bar/menu-drawer/menu-group/menu-group-summary.tsx`:

```typescript
import { ChevronUpIcon } from '#src/icons/chevron-up'
import { cx } from '@linaria/core'
import {
  elTopBarMenuDrawerMenuGroupSummary,
  ElTopBarMenuDrawerMenuGroupSummaryLabel,
  ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuGroupSummary {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The label for the menu group.
     */
    children: ReactNode
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerMenuGroupSummary.Props` instead
 */
export type TopBarMenuDrawerMenuGroupSummaryProps = TopBarMenuDrawerMenuGroupSummary.Props

/**
 * A summary element for the MenuGroup. Designed for use within a `<details>` element,
 * relying on its `open` state to determine the orientation of the chevron icon.
 *
 * ⚠️ **Important**: `<summary>` elements are not interactive outside of a parent `<details>` element.
 * This component should only be used as the summary for a MenuGroup component.
 */
export function TopBarMenuDrawerMenuGroupSummary({
  children,
  className,
  ...props
}: TopBarMenuDrawerMenuGroupSummary.Props) {
  return (
    <summary {...props} className={cx(elTopBarMenuDrawerMenuGroupSummary, className)}>
      <ElTopBarMenuDrawerMenuGroupSummaryLabel>{children}</ElTopBarMenuDrawerMenuGroupSummaryLabel>
      <ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon aria-hidden>
        <ChevronUpIcon />
      </ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon>
    </summary>
  )
}
```

**Step 4: Write MenuGroupSummary stories**

Create `src/core/top-bar/menu-drawer/menu-group/menu-group-summary.stories.tsx`:

```typescript
import { TopBarMenuDrawerMenuGroupSummary } from './menu-group-summary'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuGroupSummary',
  component: TopBarMenuDrawerMenuGroupSummary,
  args: {
    children: 'Settings',
  },
  decorators: [
    (Story) => (
      <details open>
        <Story />
        <div style={{ padding: '8px 16px' }}>
          <div>Submenu content goes here</div>
        </div>
      </details>
    ),
  ],
} satisfies Meta<typeof TopBarMenuDrawerMenuGroupSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

**Step 5: Run test to verify it passes**

```bash
yarn test menu-group-summary.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit MenuGroupSummary**

```bash
git add src/core/top-bar/menu-drawer/menu-group/menu-group-summary.tsx
git add src/core/top-bar/menu-drawer/menu-group/menu-group-summary.stories.tsx
git add src/core/top-bar/menu-drawer/menu-group/__tests__/menu-group-summary.test.tsx
git commit -m "feat(menu-drawer): add MenuGroupSummary with tests"
```

---

## Task 14: MenuGroup Container with Test

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-group/menu-group.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-group/menu-group.stories.tsx`
- Create: `src/core/top-bar/menu-drawer/menu-group/__tests__/menu-group.test.tsx`

**Step 1: Write failing test for MenuGroup**

Create `src/core/top-bar/menu-drawer/menu-group/__tests__/menu-group.test.tsx`:

```typescript
import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../menu-group.stories'
import { elTopBarMenuDrawerMenuGroup } from '../styles'

const MenuGroupStories = composeStories(stories)

test('renders a <details> element', () => {
  render(<MenuGroupStories.Default />)
  const group = screen.getByRole('group')

  expect(group.tagName).toBe('DETAILS')
  expect(group).toBeInTheDocument()
})

test(`combines the .${elTopBarMenuDrawerMenuGroup} and consumer-supplied classes correctly`, () => {
  render(<MenuGroupStories.Default className="my-custom-class" />)
  expect(screen.getByRole('group')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuGroup} my-custom-class`)
})

test('is closed by default', () => {
  render(<MenuGroupStories.Default />)
  expect(screen.getByRole('group')).not.toBeVisible()
})

test('can be opened with open prop', () => {
  render(<MenuGroupStories.Open />)
  expect(screen.getByRole('group')).toBeVisible()
})

test('applies isActive data attribute', () => {
  render(<MenuGroupStories.Active />)
  expect(screen.getByRole('group')).toHaveAttribute('data-is-active', 'true')
})

test('renders summary and children correctly', () => {
  render(<MenuGroupStories.Default />)

  expect(screen.getByText('Settings')).toBeInTheDocument()
  expect(screen.getByText('Profile')).toBeInTheDocument()
})
```

**Step 2: Run test to verify it fails**

```bash
yarn test menu-group.test.tsx
```

Expected: FAIL - stories and component don't exist

**Step 3: Write MenuGroup component**

Create `src/core/top-bar/menu-drawer/menu-group/menu-group.tsx`:

```typescript
import { cx } from '@linaria/core'
import { elTopBarMenuDrawerMenuGroup } from './styles'
import { TopBarMenuDrawerMenuGroupSummary } from './menu-group-summary'

import type { DetailsHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuGroup {
  export interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
    /**
     * Typically a single `TopBar.MenuDrawer.Submenu` component that contains submenu items
     */
    children: ReactNode
    /**
     * Allows consumers to "force" the menu group to appear active. Being active means
     * the menu group will have the expanded background color.
     */
    isActive?: boolean
    /**
     * Indicates whether the menu group's contents (the submenu) are currently visible.
     * Can be controlled or uncontrolled.
     */
    open?: boolean
    /**
     * The summary/main item for the menu group. Will typically be a `TopBar.MenuDrawer.MenuGroupSummary`.
     */
    summary: ReactNode
  }
}

/**
 * @deprecated Use `TopBarMenuDrawerMenuGroup.Props` instead
 */
export type TopBarMenuDrawerMenuGroupProps = TopBarMenuDrawerMenuGroup.Props

/**
 * An expandable menu group for use in TopBar MenuDrawer. The group uses a `<details>` element
 * to provide a native disclosure widget for showing and hiding the submenu.
 *
 * The open state can be controlled or uncontrolled. The `isActive` prop can force the visual
 * "active" state (expanded background color) even when closed.
 */
export function TopBarMenuDrawerMenuGroup({
  children,
  className,
  isActive,
  summary,
  ...rest
}: TopBarMenuDrawerMenuGroup.Props) {
  return (
    <details {...rest} className={cx(elTopBarMenuDrawerMenuGroup, className)} data-is-active={isActive}>
      {summary}
      {children}
    </details>
  )
}

TopBarMenuDrawerMenuGroup.Summary = TopBarMenuDrawerMenuGroupSummary
```

**Step 4: Write MenuGroup stories**

Create `src/core/top-bar/menu-drawer/menu-group/menu-group.stories.tsx`:

```typescript
import { TopBarMenuDrawerMenuGroup } from './menu-group'
import { TopBarMenuDrawerMenuGroupSummary } from './menu-group-summary'
import { TopBarMenuDrawerSubmenu } from '../submenu'
import { TopBarMenuDrawerSubmenuItem } from '../submenu/submenu-item'
import { TopBarMenuDrawerSubmenuListItem } from '../submenu/submenu-list-item'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuGroup',
  component: TopBarMenuDrawerMenuGroup,
  args: {
    summary: <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>,
    children: (
      <TopBarMenuDrawerSubmenu>
        <TopBarMenuDrawerSubmenuListItem>
          <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current={false}>
            Profile
          </TopBarMenuDrawerSubmenuItem>
        </TopBarMenuDrawerSubmenuListItem>
        <TopBarMenuDrawerSubmenuListItem>
          <TopBarMenuDrawerSubmenuItem href="/settings/preferences" aria-current={false}>
            Preferences
          </TopBarMenuDrawerSubmenuItem>
        </TopBarMenuDrawerSubmenuListItem>
      </TopBarMenuDrawerSubmenu>
    ),
  },
} satisfies Meta<typeof TopBarMenuDrawerMenuGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
  args: {
    open: true,
  },
}

export const Active: Story = {
  args: {
    isActive: true,
  },
}
```

**Step 5: Run test to verify it passes**

```bash
yarn test menu-group.test.tsx
```

Expected: PASS - all tests green

**Step 6: Commit MenuGroup**

```bash
git add src/core/top-bar/menu-drawer/menu-group/menu-group.tsx
git add src/core/top-bar/menu-drawer/menu-group/menu-group.stories.tsx
git add src/core/top-bar/menu-drawer/menu-group/__tests__/menu-group.test.tsx
git commit -m "feat(menu-drawer): add MenuGroup container with tests"
```

---

## Task 15: MenuGroup Index Exports

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-group/index.ts`

**Step 1: Write MenuGroup index exports**

Create `src/core/top-bar/menu-drawer/menu-group/index.ts`:

```typescript
export { TopBarMenuDrawerMenuGroup } from './menu-group'
export { TopBarMenuDrawerMenuGroupSummary } from './menu-group-summary'

export type { TopBarMenuDrawerMenuGroup as TopBarMenuDrawerMenuGroupNamespace } from './menu-group'
export type { TopBarMenuDrawerMenuGroupSummary as TopBarMenuDrawerMenuGroupSummaryNamespace } from './menu-group-summary'
```

**Step 2: Commit MenuGroup exports**

```bash
git add src/core/top-bar/menu-drawer/menu-group/index.ts
git commit -m "feat(menu-drawer): add MenuGroup index exports"
```

---

## Task 16: Update MenuDrawer Index Exports

**Files:**

- Modify: `src/core/top-bar/menu-drawer/index.ts`

**Step 1: Add new component exports to menu-drawer/index.ts**

Read current file:

```bash
cat src/core/top-bar/menu-drawer/index.ts
```

Add these exports:

```typescript
export * from './menu-item'
export * from './menu-group'
export * from './submenu'
```

**Step 2: Verify exports are correct**

```bash
yarn check
```

Expected: No TypeScript errors

**Step 3: Commit updated exports**

```bash
git add src/core/top-bar/menu-drawer/index.ts
git commit -m "feat(menu-drawer): export new navigation components"
```

---

## Task 17: Attach Components to TopBarMenuDrawer

**Files:**

- Modify: `src/core/top-bar/menu-drawer/menu-drawer.tsx`

**Step 1: Import new components in menu-drawer.tsx**

Add imports at the top of `src/core/top-bar/menu-drawer/menu-drawer.tsx`:

```typescript
import { TopBarMenuDrawerMenuItem, TopBarMenuDrawerMenuItemButton } from './menu-item'
import { TopBarMenuDrawerMenuGroup, TopBarMenuDrawerMenuGroupSummary } from './menu-group'
import { TopBarMenuDrawerSubmenu, TopBarMenuDrawerSubmenuItem, TopBarMenuDrawerSubmenuItemButton } from './submenu'
```

**Step 2: Attach components to TopBarMenuDrawer namespace**

Add these attachments after the existing `TopBarMenuDrawer.Header = TopBarMenuDrawerHeader` line:

```typescript
TopBarMenuDrawer.MenuItem = TopBarMenuDrawerMenuItem
TopBarMenuDrawer.MenuItemButton = TopBarMenuDrawerMenuItemButton
TopBarMenuDrawer.MenuGroup = TopBarMenuDrawerMenuGroup
TopBarMenuDrawer.MenuGroupSummary = TopBarMenuDrawerMenuGroupSummary
TopBarMenuDrawer.Submenu = TopBarMenuDrawerSubmenu
TopBarMenuDrawer.SubmenuItem = TopBarMenuDrawerSubmenuItem
TopBarMenuDrawer.SubmenuItemButton = TopBarMenuDrawerSubmenuItemButton
```

**Step 3: Verify TypeScript types**

```bash
yarn check
```

Expected: No TypeScript errors

**Step 4: Commit attachments**

```bash
git add src/core/top-bar/menu-drawer/menu-drawer.tsx
git commit -m "feat(menu-drawer): attach navigation components to TopBarMenuDrawer namespace"
```

---

## Task 18: Flatten MenuDrawer Components on TopBar

**Files:**

- Modify: `src/core/top-bar/top-bar.tsx`

**Step 1: Add flattened attachments to TopBar**

Add these lines after the existing `TopBar.MenuDrawerHeader = TopBarMenuDrawer.Header` line in `src/core/top-bar/top-bar.tsx`:

```typescript
TopBar.MenuDrawerMenuItem = TopBarMenuDrawer.MenuItem
TopBar.MenuDrawerMenuItemButton = TopBarMenuDrawer.MenuItemButton
TopBar.MenuDrawerMenuGroup = TopBarMenuDrawer.MenuGroup
TopBar.MenuDrawerMenuGroupSummary = TopBarMenuDrawer.MenuGroupSummary
TopBar.MenuDrawerSubmenu = TopBarMenuDrawer.Submenu
TopBar.MenuDrawerSubmenuItem = TopBarMenuDrawer.SubmenuItem
TopBar.MenuDrawerSubmenuItemButton = TopBarMenuDrawer.SubmenuItemButton
```

**Step 2: Verify TypeScript types**

```bash
yarn check
```

Expected: No TypeScript errors

**Step 3: Commit flattened attachments**

```bash
git add src/core/top-bar/top-bar.tsx
git commit -m "feat(menu-drawer): flatten MenuDrawer components on TopBar namespace"
```

---

## Task 19: Update Submenu Stories with Real Components

**Files:**

- Modify: `src/core/top-bar/menu-drawer/submenu/submenu.stories.tsx`

**Step 1: Update Submenu stories to use real components**

Replace the temporary stories in `src/core/top-bar/menu-drawer/submenu/submenu.stories.tsx`:

```typescript
import { TopBarMenuDrawerSubmenu } from './submenu'
import { TopBarMenuDrawerSubmenuItem } from './submenu-item'
import { TopBarMenuDrawerSubmenuItemButton } from './submenu-item-button'
import { TopBarMenuDrawerSubmenuListItem } from './submenu-list-item'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/Submenu',
  component: TopBarMenuDrawerSubmenu,
  args: {
    children: (
      <>
        <TopBarMenuDrawerSubmenuListItem>
          <TopBarMenuDrawerSubmenuItem href="/item1" aria-current={false}>
            Item 1
          </TopBarMenuDrawerSubmenuItem>
        </TopBarMenuDrawerSubmenuListItem>
        <TopBarMenuDrawerSubmenuListItem>
          <TopBarMenuDrawerSubmenuItem href="/item2" aria-current="page">
            Item 2
          </TopBarMenuDrawerSubmenuItem>
        </TopBarMenuDrawerSubmenuListItem>
        <TopBarMenuDrawerSubmenuListItem>
          <TopBarMenuDrawerSubmenuItemButton onClick={() => alert('Item 3 clicked!')}>
            Item 3
          </TopBarMenuDrawerSubmenuItemButton>
        </TopBarMenuDrawerSubmenuListItem>
      </>
    ),
  },
} satisfies Meta<typeof TopBarMenuDrawerSubmenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

**Step 2: Verify stories render correctly**

```bash
yarn start
```

Navigate to the Submenu story in Storybook and verify it renders correctly.

**Step 3: Commit updated stories**

```bash
git add src/core/top-bar/menu-drawer/submenu/submenu.stories.tsx
git commit -m "feat(menu-drawer): update Submenu stories with real components"
```

---

## Task 20: Create Comprehensive MenuDrawer Story

**Files:**

- Create: `src/core/top-bar/menu-drawer/menu-drawer-navigation.stories.tsx`

**Step 1: Write comprehensive story showcasing all components**

Create `src/core/top-bar/menu-drawer/menu-drawer-navigation.stories.tsx`:

```typescript
import { TopBar } from '../top-bar'
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Core/TopBar/MenuDrawer/Navigation',
  component: TopBar.MenuDrawer,
} satisfies Meta<typeof TopBar.MenuDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const CompleteExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Menu</button>
        <TopBar.MenuDrawer isOpen={isOpen} closedBy="closerequest">
          <TopBar.MenuDrawerHeader onClose={() => setIsOpen(false)}>Navigation Menu</TopBar.MenuDrawerHeader>

          {/* Simple menu items (anchors) */}
          <TopBar.MenuDrawerMenuItem href="/dashboard" aria-current="page">
            Dashboard
          </TopBar.MenuDrawerMenuItem>

          <TopBar.MenuDrawerMenuItem href="/projects" aria-current={false}>
            Projects
          </TopBar.MenuDrawerMenuItem>

          {/* Simple menu item (button) */}
          <TopBar.MenuDrawerMenuItemButton onClick={() => alert('Quick Action!')}>
            Quick Action
          </TopBar.MenuDrawerMenuItemButton>

          {/* Expandable menu group */}
          <TopBar.MenuDrawerMenuGroup
            summary={<TopBar.MenuDrawerMenuGroupSummary>Settings</TopBar.MenuDrawerMenuGroupSummary>}
          >
            <TopBar.MenuDrawerSubmenu>
              <TopBar.MenuDrawerSubmenu.Item>
                <TopBar.MenuDrawerSubmenuItem href="/settings/profile" aria-current={false}>
                  Profile
                </TopBar.MenuDrawerSubmenuItem>
              </TopBar.MenuDrawerSubmenu.Item>
              <TopBar.MenuDrawerSubmenu.Item>
                <TopBar.MenuDrawerSubmenuItem href="/settings/preferences" aria-current={false}>
                  Preferences
                </TopBar.MenuDrawerSubmenuItem>
              </TopBar.MenuDrawerSubmenu.Item>
              <TopBar.MenuDrawerSubmenu.Item>
                <TopBar.MenuDrawerSubmenuItemButton onClick={() => alert('Logout')}>
                  Logout
                </TopBar.MenuDrawerSubmenuItemButton>
              </TopBar.MenuDrawerSubmenu.Item>
            </TopBar.MenuDrawerSubmenu>
          </TopBar.MenuDrawerMenuGroup>

          {/* Another expandable menu group (active) */}
          <TopBar.MenuDrawerMenuGroup
            isActive
            summary={<TopBar.MenuDrawerMenuGroupSummary>Account</TopBar.MenuDrawerMenuGroupSummary>}
          >
            <TopBar.MenuDrawerSubmenu>
              <TopBar.MenuDrawerSubmenu.Item>
                <TopBar.MenuDrawerSubmenuItem href="/account/billing" aria-current={false}>
                  Billing
                </TopBar.MenuDrawerSubmenuItem>
              </TopBar.MenuDrawerSubmenu.Item>
              <TopBar.MenuDrawerSubmenu.Item>
                <TopBar.MenuDrawerSubmenuItem href="/account/team" aria-current={false}>
                  Team
                </TopBar.MenuDrawerSubmenuItem>
              </TopBar.MenuDrawerSubmenu.Item>
            </TopBar.MenuDrawerSubmenu>
          </TopBar.MenuDrawerMenuGroup>
        </TopBar.MenuDrawer>
      </>
    )
  },
}
```

**Step 2: Verify story renders correctly in Storybook**

```bash
yarn start
```

Navigate to the new story and verify all components work together correctly.

**Step 3: Commit comprehensive story**

```bash
git add src/core/top-bar/menu-drawer/menu-drawer-navigation.stories.tsx
git commit -m "feat(menu-drawer): add comprehensive navigation components story"
```

---

## Task 21: Run Full Test Suite

**Step 1: Run all MenuDrawer tests**

```bash
yarn test menu-drawer
```

Expected: All tests pass

**Step 2: If any tests fail, fix them**

Review failures and update tests or implementation as needed.

**Step 3: Commit any test fixes**

```bash
git add .
git commit -m "fix(menu-drawer): resolve test failures"
```

---

## Task 22: Run Type Check

**Step 1: Run TypeScript type check**

```bash
yarn check
```

Expected: No TypeScript errors

**Step 2: If type errors exist, fix them**

Review errors and fix type issues in components.

**Step 3: Commit any type fixes**

```bash
git add .
git commit -m "fix(menu-drawer): resolve TypeScript errors"
```

---

## Task 23: Run Build

**Step 1: Build the library**

```bash
yarn build
```

Expected: Build succeeds without errors

**Step 2: If build fails, fix the issues**

Review build errors and fix them.

**Step 3: Commit any build fixes**

```bash
git add .
git commit -m "fix(menu-drawer): resolve build issues"
```

---

## Task 24: Final Verification

**Step 1: Run complete test suite**

```bash
yarn test
```

Expected: All tests pass

**Step 2: Run linting**

```bash
yarn lint
```

Expected: No linting errors

**Step 3: Verify Storybook builds**

```bash
yarn build-storybook
```

Expected: Storybook builds successfully

---

## Summary

You've successfully implemented:

✅ **MenuItem** - Anchor and button variants with base component pattern  
✅ **MenuGroup** - Expandable container using `<details>` element with Summary component  
✅ **Submenu** - List container with anchor and button item variants  
✅ **Styles** - Linaria CSS following Figma design tokens  
✅ **Tests** - Comprehensive unit tests for all components  
✅ **Stories** - Storybook documentation for each component  
✅ **Exports** - Proper namespace pattern and flattened TopBar access

All components follow:

- Namespace interface pattern (`component-interface-pattern` skill)
- SideBar structural patterns for consistency
- TDD approach with tests written first
- Proper accessibility with ARIA attributes
- Type safety with TypeScript

The MenuDrawer now has a complete navigation system supporting both anchor-based navigation and button-based actions, with expandable menu groups for hierarchical navigation.
