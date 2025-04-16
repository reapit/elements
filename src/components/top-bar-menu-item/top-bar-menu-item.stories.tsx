import type { Meta, StoryObj } from '@storybook/react'

import { TopBarMenuItem } from './top-bar-menu-item'

const meta = {
  title: 'Components/Top Bar Menu Item',
  component: TopBarMenuItem,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: '',
    href: '',
    onClick: undefined,
  },
} satisfies Meta<typeof TopBarMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: ({}) => <TopBarMenuItem label="Report" href="#report" />,
}

export const Active: Story = {
  render: ({}) => <TopBarMenuItem label="Create" href="#create" isActive />,
}

export const WithBadge: Story = {
  render: ({}) => <TopBarMenuItem label="Archive" href="#archive" hasBadge />,
}
