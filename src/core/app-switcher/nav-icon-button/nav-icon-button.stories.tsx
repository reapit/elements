import { AppSwitcherNavIconButton } from './nav-icon-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/AppSwitcher/NavIconButton',
  component: AppSwitcherNavIconButton,
  argTypes: {
    onClick: {
      control: false,
    },
  },
} satisfies Meta<typeof AppSwitcherNavIconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    onClick: () => void 0,
  },
  render: (args) => {
    return <AppSwitcherNavIconButton {...args} />
  },
}

export const Expanded: Story = {
  args: {
    onClick: () => void 0,
  },
  render: (args) => {
    return <AppSwitcherNavIconButton aria-expanded={true} {...args} />
  },
}
