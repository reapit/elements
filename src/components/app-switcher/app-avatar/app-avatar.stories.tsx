import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppMenuGroupContext } from '../app-switcher-menu-group-context'
import AppAvatar, { appNames } from './app-avatar'

const meta = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  argTypes: {
    appName: {
      control: { type: 'select' },
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
      description: 'Visual style of the avatars',
    },
  },
  // decorators: [
  //   (Story, context) => {
  //     const hasAccess = true

  //     return (
  //       <AppMenuGroupContext.Provider value={hasAccess}>
  //         <Story />
  //       </AppMenuGroupContext.Provider>
  //     )
  //   },
  // ],
} satisfies Meta<typeof AppAvatar>

export default meta

type Story = StoryObj<typeof meta>

const useAccessibleDecorator: Decorator = (Story) => {
  const hasAccess = true
  return (
    <AppMenuGroupContext.Provider value={hasAccess}>
      <Story />
    </AppMenuGroupContext.Provider>
  )
}

const useInaccessibleDecorator: Decorator = (Story) => {
  const hasAccess = false
  return (
    <AppMenuGroupContext.Provider value={hasAccess}>
      <Story />
    </AppMenuGroupContext.Provider>
  )
}

// (AA)TODO: Write comments for these stories
// /**
//  * By default, a a group will grow to whatever width it's parent allows.
//  */
export const BasicUsageWhenAccessible: Story = {
  decorators: [useAccessibleDecorator],
  args: {
    appName: appNames.reapitPM.name,
  },
}

export const BasicUsageWhenInaccessible: Story = {
  decorators: [useInaccessibleDecorator],
  args: {
    appName: appNames.reapitPM.name,
  },
}
