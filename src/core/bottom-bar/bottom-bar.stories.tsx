import { BottomBar } from './bottom-bar'
import { Menu } from '#src/core/menu'
import { Pattern } from '../drawer/__story__/Pattern'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

// Common href for all menu items that links to the current storybook page.
const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/BottomBar',
  component: BottomBar,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item', 'With overflow menu'],
      mapping: {
        'No selected item': buildMenu('No selected item'),
        'Selected item': buildMenu('Selected item'),
        'With overflow menu': buildMenu('With overflow menu'),
      },
    },
    scrollContainerId: {
      control: false,
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  render: ({ scrollContainerId, ...rest }) => {
    return (
      <div
        id={scrollContainerId}
        style={{
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
          height: '300px',
          overflow: 'auto',
        }}
      >
        <Pattern height="100vh" />
        <div style={{ position: 'sticky', bottom: 0 }}>
          <BottomBar {...rest} scrollContainerId={scrollContainerId} />
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomBar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Without a scroll container ID, the bottom bar will be extended and, if it is a descendant of the
 * scroll container, will remain sticky-positioned to its bottom.
 */
export const Example: Story = {
  args: {
    'aria-label': 'Bottom navigation',
    children: 'With overflow menu',
    scrollContainerId: undefined,
  },
}

/**
 * By specifying a scroll container ID, the bottom bar will dynamically retract as the user
 * scrolls down within that container, and extend as the user scrolls back up.
 */
export const Retractable: Story = {
  args: {
    ...Example.args,
    scrollContainerId: 'scroll-container-id',
  },
}

function buildMenu(type: 'No selected item' | 'Selected item' | 'With overflow menu') {
  return (
    <BottomBar.MenuList>
      <BottomBar.Item aria-current={type !== 'No selected item' ? 'page' : false} icon={<StarIcon />} href={href}>
        Menu 1
      </BottomBar.Item>
      <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href} hasBadge>
        Menu 2
      </BottomBar.Item>
      <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
        Menu 3
      </BottomBar.Item>
      <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
        Menu 4
      </BottomBar.Item>
      {type === 'With overflow menu' ? (
        <BottomBar.MenuItem>
          <Menu.Item>Menu item 5</Menu.Item>
          <Menu.Item>Menu item 6</Menu.Item>
          <Menu.Item>Menu item 6</Menu.Item>
        </BottomBar.MenuItem>
      ) : (
        <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
          Menu 5
        </BottomBar.Item>
      )}
    </BottomBar.MenuList>
  )
}
