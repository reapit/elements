import { TopBarNavSearchIconItem } from './nav-search-icon-item'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/NavSearchIconItem',
  component: TopBarNavSearchIconItem,
  argTypes: {
    onClick: {
      control: false,
    },
  },
} satisfies Meta<typeof TopBarNavSearchIconItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    onClick: () => void 0,
  },
}
