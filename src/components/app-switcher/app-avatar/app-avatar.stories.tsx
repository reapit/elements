import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import AppAvatar from './app-avatar'

const useAccessibleDecorator: Decorator = (Story, context) => {
  const hasAccess = context.args.hasAccess as boolean
  return (
    <AppMenuGroupHasAccessContext.Provider value={hasAccess}>
      <Story />
    </AppMenuGroupHasAccessContext.Provider>
  )
}

const meta: Meta<typeof AppAvatar> = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  decorators: [useAccessibleDecorator],
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
