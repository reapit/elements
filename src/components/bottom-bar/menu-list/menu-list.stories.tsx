import { BottomBarMenuList } from './menu-list'
import { Menu } from '#src/components/menu'
import { Pattern } from '#src/components/drawer/__story__/Pattern'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

// Common href for all menu items that links to the current storybook page.
const href = globalThis.top?.location.href!

const meta = {
  title: 'Components/BottomBar/MenuList',
  component: BottomBarMenuList,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item'],
      mapping: {
        'No selected item': buildMenu('No selected item'),
        'Selected item': buildMenu('Selected item'),
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
        }}
      >
        <Pattern height="120px" />
        <Story />
      </div>
    ),
  ],
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof BottomBarMenuList>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected item',
  },
}

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `BottomBar.Item`
 * documentation for details on how.
 */
export const SelectedItem: Story = {
  args: {
    children: 'Selected item',
  },
}

function buildMenu(type: 'No selected item' | 'Selected item') {
  return [
    <BottomBarMenuList.Item
      key="1"
      aria-current={type === 'Selected item' ? 'page' : false}
      href={href}
      icon={<StarIcon />}
    >
      Menu item 1
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.Item key="2" aria-current={false} href={href} icon={<StarIcon />}>
      Menu item 2
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.Item key="3" aria-current={false} href={href} icon={<StarIcon />}>
      Menu item 3
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.Item key="4" aria-current={false} href={href} icon={<StarIcon />}>
      Menu item 4
    </BottomBarMenuList.Item>,
    <BottomBarMenuList.MenuItem key="5">
      <Menu.Item label="Menu item 5" />
      <Menu.Item label="Menu item 6" />
      <Menu.Item label="Menu item 7" />
    </BottomBarMenuList.MenuItem>,
  ]
}
