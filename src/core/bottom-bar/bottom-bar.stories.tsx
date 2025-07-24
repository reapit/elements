import { BottomBar } from './bottom-bar'
import { Menu } from '#src/deprecated/menu'
import { Pattern } from '../drawer/__story__/Pattern'
import { StarIcon } from '#src/icons/star'
import { useRef } from 'react'

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
    scrollContainerRef: {
      control: false,
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  render: (args) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
      <div
        ref={ref}
        style={{
          overflow: 'auto',
          height: '300px',
          width: '100%',
          boxSizing: 'border-box',
          border: '1px solid #FA00FF',
        }}
      >
        <Pattern height="100vh" />
        <BottomBar {...args} scrollContainerRef={ref} />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomBar>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-label': 'Bottom navigation',
    children: 'Selected item',
    scrollContainerRef: { current: null },
  },
}

function buildMenu(type: 'No selected item' | 'Selected item' | 'With overflow menu') {
  return (
    <BottomBar.MenuList>
      <BottomBar.Item aria-current={type === 'Selected item' ? 'page' : false} icon={<StarIcon />} href={href}>
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
          <Menu.Item label="Menu item 5" />
          <Menu.Item label="Menu item 6" />
          <Menu.Item label="Menu item 6" />
        </BottomBar.MenuItem>
      ) : (
        <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
          Menu 5
        </BottomBar.Item>
      )}
    </BottomBar.MenuList>
  )
}
