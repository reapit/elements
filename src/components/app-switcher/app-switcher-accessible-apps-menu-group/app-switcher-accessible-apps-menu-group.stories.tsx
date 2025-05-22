import type { Decorator, Meta, StoryObj } from '@storybook/react'
import AppAvatar, { appNames } from '../app-avatar/app-avatar'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherAccessibleAppsMenuGroup } from './app-switcher-accessible-apps-menu-group'

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherAccessibleAppsMenuGroup',
  component: AppSwitcherAccessibleAppsMenuGroup,
  // args: {
  //   decorators: Decorator,
  //   render: () => JSX.Element,
  // },
} satisfies Meta<typeof AppSwitcherAccessibleAppsMenuGroup>

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
      <AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.MenuItem
          logo={<AppAvatar appName={appNames.reapitLetting.name} />}
          appName={appNames.reapitLetting.name}
          description={appNames.reapitLetting.description}
          url={appNames.reapitLetting.url}
        />
        <AppSwitcher.MenuItem
          logo={<AppAvatar appName={appNames.keyWhere.name} />}
          appName={appNames.keyWhere.name}
          description={appNames.keyWhere.description}
          url={appNames.keyWhere.url}
        />
      </AppSwitcher.AccessibleAppsMenuGroup>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  decorators: [useParentDecorator],

  render: () => {
    return (
      <AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.MenuItem
          logo={<AppAvatar appName={appNames.reapitLetting.name} />}
          appName={appNames.reapitLetting.name}
          description={appNames.reapitLetting.description}
          url={appNames.reapitLetting.url}
        />
        <AppSwitcher.MenuItem
          logo={<AppAvatar appName={appNames.keyWhere.name} />}
          appName={appNames.keyWhere.name}
          description={appNames.keyWhere.description}
          url={appNames.keyWhere.url}
        />
      </AppSwitcher.AccessibleAppsMenuGroup>
    )
  },
}
