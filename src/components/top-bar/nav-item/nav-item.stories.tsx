import { TopBarNavItem } from './nav-item'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TopBar/NavItem',
  component: TopBarNavItem,
} satisfies Meta<typeof TopBarNavItem>

export default meta

type Story = StoryObj<typeof TopBarNavItem>

export const Example: Story = {
  args: {
    children: 'Nav Item',
    href: globalThis.top?.location.href!,
    isActive: false,
  },
}

/**
 * When the item represents the current page, `isActive` should be supplied to communicate to visual and accessible
 * users that the item is currently "selected". For accessible users, this is internally facilitated via
 * `aria-current="page"` on the underlying `<a>` element. The visual styling of the item is also applied based on
 * this ARIA attribute, so CSS-only consumers just need to ensure they provide `aria-current="page"` to their anchor
 * when appropriate.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    isActive: true,
  },
}

/**
 * When there is not enough space to display the full label, it will not wrap to a new line; rather, it will overflow
 * its container. That said, author's should typically ensure nav items have enough space in the Top Bar. As the main
 * nav's space reduces, nav items should be progressively collapsed into a `TopBar.NavDropdownButton` and its menu.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '50px' }}>
        <Story />
      </div>
    ),
  ],
}
