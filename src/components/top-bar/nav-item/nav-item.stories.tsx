import { TopBarNavItem } from './nav-item'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/TopBar/NavItem',
  component: TopBarNavItem,
} satisfies Meta<typeof TopBarNavItem>

export default meta

type Story = StoryObj<typeof TopBarNavItem>

export const Example: Story = {
  args: {
    'aria-current': false,
    children: 'Nav Item',
    href: globalThis.top?.location.href!,
  },
}

/**
 * When the item represents the current page, `aria-current="page"` should be supplied to communicate to visual and
 * accessible users that the item is currently "selected".
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
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
