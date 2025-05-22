import type { Decorator, Meta, StoryObj } from '@storybook/react'
import AppAvatar, { appNames } from '../app-avatar/app-avatar'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherMenuItem } from './app-switcher-menu-item'

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherMenuItem',
  component: AppAvatar,
} satisfies Meta<typeof AppSwitcherMenuItem>

export default meta

type Story = StoryObj<typeof meta>

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <Story />
    </div>
  )
}

// (AA)TODO: Write comments for these stories
// /**
//  * By default, a a group will grow to whatever width it's parent allows.
//  */
export const Default: Story = {
  decorators: [useParentDecorator],

  render: () => {
    return (
      <AppSwitcher.MenuItem
        logo={<AppAvatar appName={appNames.reapitPM.name} />}
        appName={appNames.reapitPM.name}
        description={appNames.reapitPM.description}
        url={appNames.reapitPM.url}
      />
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  decorators: [useParentDecorator],

  render: () => {
    return (
      <AppSwitcher.MenuItem
        logo={<AppAvatar appName={appNames.reapitPM.name} />}
        appName={appNames.reapitPM.name}
        description={appNames.reapitPM.description}
        url={appNames.reapitPM.url}
      />
    )
  },
}
