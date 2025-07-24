import { StarIcon } from '#src/icons/star'
import { HelpIcon } from '#src/icons/help'
import { Menu } from '#src/deprecated/menu'
import { TopBarSecondaryNav } from './secondary-nav'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/TopBar/SecondaryNav',
  component: TopBarSecondaryNav,
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
} satisfies Meta<typeof TopBarSecondaryNav>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected item',
  },
}

/**
 * If a nav item represents the current page, it should be marked as "selected". See the `TopBar.NavIconItem`
 * documentation for details on how.
 */
export const SelectedItem: Story = {
  args: {
    children: 'Selected item',
  },
}

/**
 * The secondary nav can contain a mix of icon items and icon menu items.
 */
export const WithMenu: Story = {
  args: {
    children: 'With menu',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

function buildNav(type: 'No selected item' | 'Selected item' | 'With menu') {
  return [
    <TopBarSecondaryNav.Item
      key="1"
      href={href}
      icon={<StarIcon />}
      aria-label="Nav icon item 1"
      aria-current={type === 'Selected item' ? 'page' : false}
    />,
    <TopBarSecondaryNav.Item
      key="2"
      href={href}
      icon={<StarIcon />}
      aria-label="Nav icon item 2"
      aria-current={false}
    />,
    type === 'With menu' && (
      <TopBarSecondaryNav.MenuItem key="3" icon={<HelpIcon />} aria-label="Help menu">
        <Menu.Item label="Menu item 1" />
        <Menu.Item label="Menu item 2" />
        <Menu.Item label="Menu item 3" />
      </TopBarSecondaryNav.MenuItem>
    ),
  ]
}
