import { TopBarMainNav } from './main-nav'
import { DeprecatedMenu } from '#src/deprecated/menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/TopBar/MainNav',
  component: TopBarMainNav,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item', 'With menu'],
      mapping: {
        'No selected item': buildNav('No selected item'),
        'Selected item': buildNav('Selected item'),
        'With menu': buildNav('With menu'),
      },
    },
  },
} satisfies Meta<typeof TopBarMainNav>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected item',
  },
}

/**
 * If a nav item represents the current page, it should be marked as "selected". See the `TopBar.NavItem`
 * documentation for details on how.
 */
export const SelectedItem: Story = {
  args: {
    children: 'Selected item',
  },
}

/**
 * The main nav can contain a mix of nav items and menu items.
 */
export const WithMenu: Story = {
  args: {
    children: 'With menu',
  },
}

function buildNav(type: 'No selected item' | 'Selected item' | 'With menu') {
  return [
    <TopBarMainNav.Item key="1" href={href} aria-current={type === 'Selected item' ? 'page' : false}>
      Nav item 1
    </TopBarMainNav.Item>,
    <TopBarMainNav.Item key="2" aria-current={false} href={href}>
      Nav item 2
    </TopBarMainNav.Item>,
    type === 'With menu' && (
      <TopBarMainNav.MenuItem label="More">
        <DeprecatedMenu.Item label="Menu Item 1" />
        <DeprecatedMenu.Item label="Menu Item 2" />
        <DeprecatedMenu.Item label="Menu Item 3" />
      </TopBarMainNav.MenuItem>
    ),
  ].filter(Boolean)
}
