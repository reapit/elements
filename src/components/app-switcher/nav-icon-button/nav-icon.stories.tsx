import type { Meta, StoryObj } from '@storybook/react'
import AppSwitcherNavIconButton from './nav-icon-button'

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherNavIconButton',
  component: AppSwitcherNavIconButton,
} satisfies Meta<typeof AppSwitcherNavIconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return <AppSwitcherNavIconButton />
  },
}

export const WhenTheNavIconButtonIsSelected: Story = {
  render: () => {
    return <AppSwitcherNavIconButton aria-expanded={true} />
  },
}
