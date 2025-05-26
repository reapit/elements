import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppMenuGroupContext } from '../menu-group-context'
import { appNames } from '../appNames'
import AppAvatar from './app-avatar'

interface ExtendedAppAvatarProps extends React.ComponentProps<typeof AppAvatar> {
  hasAccess?: boolean
}

const meta: Meta<ExtendedAppAvatarProps> = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  argTypes: {
    appName: {
      control: { type: 'select' },
      description: 'Visual style of the avatars',
      options: [
        appNames.reapitPM.name,
        appNames.reapitSales.name,
        appNames.reapitLetting.name,
        appNames.reapitForms.name,
        appNames.reapitWebsites.name,
        appNames.reapitProposals.name,
        appNames.keyWhere.name,
        appNames.autoResponder.name,
      ],
    },
  },
} satisfies Meta<typeof AppAvatar>

export default meta

type Story = StoryObj<typeof meta>

const useAccessibleDecorator: Decorator = (Story, context) => {
  const hasAccess = context.args.hasAccess as boolean
  return (
    <AppMenuGroupContext.Provider value={hasAccess}>
      <Story />
    </AppMenuGroupContext.Provider>
  )
}

const useInaccessibleDecorator: Decorator = (Story, context) => {
  const hasAccess = context.args.hasAccess as boolean
  return (
    <AppMenuGroupContext.Provider value={hasAccess}>
      <Story />
    </AppMenuGroupContext.Provider>
  )
}

export const BasicUsageWhenTheAvatarIsAccessible: Story = {
  decorators: [useAccessibleDecorator],
  args: {
    appName: appNames.reapitPM.name,
    hasAccess: true,
  },
}

export const BasicUsageWhenTheAvatarIsInaccessible: Story = {
  decorators: [useInaccessibleDecorator],
  args: {
    appName: appNames.reapitPM.name,
    hasAccess: false,
  },
}
