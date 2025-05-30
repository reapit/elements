import type { Meta, StoryObj } from '@storybook/react'
import { AppName } from '../appNames'
import AppAvatar from './app-avatar'

const appNames: AppName[] = [
  'reapitPM',
  'reapitSales',
  'reapitLetting',
  'reapitForms',
  'reapitWebsites',
  'reapitProposals',
  'keyWhere',
  'autoResponder',
] as const

const meta: Meta<typeof AppAvatar> = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  argTypes: {
    appName: {
      control: { type: 'select' },
      description: 'Visual style of the avatars',
      options: appNames,
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
