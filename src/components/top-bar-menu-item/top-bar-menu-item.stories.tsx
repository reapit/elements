import type { Meta, StoryObj } from '@storybook/react'

import { TopBarMenuItem } from './top-bar-menu-item'

const meta = {
  title: 'Components/Top Bar Menu Item',
  component: TopBarMenuItem,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Report',
    href: '',
    onClick: undefined,
  },
} satisfies Meta<typeof TopBarMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: ({}) => <TopBarMenuItem href="#report">Report</TopBarMenuItem>,
}

export const Active: Story = {
  render: ({}) => (
    <TopBarMenuItem href="#create" isActive>
      Create
    </TopBarMenuItem>
  ),
}

export const WithBadge: Story = {
  render: ({}) => (
    <TopBarMenuItem aria-label="Open Archive in new tab" target="_blank" href="#archive" hasBadge>
      Archive
    </TopBarMenuItem>
  ),
}
