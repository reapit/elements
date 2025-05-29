import type { Meta, StoryObj } from '@storybook/react'
import { apps } from '../appNames'
import AppAvatar from './app-avatar'

const meta: Meta<typeof AppAvatar> = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  argTypes: {
    appName: {
      control: { type: 'select' },
      description: 'Visual style of the avatars',
      options: [
        apps.reapitPM.name,
        apps.reapitSales.name,
        apps.reapitLetting.name,
        apps.reapitForms.name,
        apps.reapitWebsites.name,
        apps.reapitProposals.name,
        apps.keyWhere.name,
        apps.autoResponder.name,
      ],
    },
  },
} satisfies Meta<typeof AppAvatar>

export default meta

type Story = StoryObj<typeof meta>

export const BasicUsageWhenTheAvatarIsAccessible: Story = {
  args: {
    appName: apps.reapitPM.name,
    hasAccess: true,
  },
}

export const BasicUsageWhenTheAvatarIsInaccessible: Story = {
  args: {
    appName: apps.reapitPM.name,
    hasAccess: false,
  },
}
