import { NavSearchIconItem } from './nav-search-icon-item'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TopBar/NavSearchIconItem',
  component: NavSearchIconItem,
} satisfies Meta<typeof NavSearchIconItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    onClick: () => void 0,
  },
}
