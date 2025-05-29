import type { Meta, StoryObj } from '@storybook/react'
import AppAvatar from './app-avatar'

const meta: Meta<typeof AppAvatar> = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  argTypes: {
    appName: {
      control: { type: 'select' },
      description: 'Visual style of the avatars',
      options: [
        'reapitPM',
        'reapitSales',
        'reapitLetting',
        'reapitForms',
        'reapitWebsites',
        'reapitProposals',
        'keyWhere',
        'autoResponder',
      ],
    },
  },
} satisfies Meta<typeof AppAvatar>

export default meta

type Story = StoryObj<typeof meta>

export const BasicUsageWhenTheAvatarIsAccessible: Story = {
  args: {
    appName: 'reapitPM',
    hasAccess: true,
  },
}

export const BasicUsageWhenTheAvatarIsInaccessible: Story = {
  args: {
    appName: 'reapitPM',
    hasAccess: false,
  },
}
