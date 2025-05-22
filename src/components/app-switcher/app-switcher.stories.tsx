import type { Decorator, Meta, StoryObj } from '@storybook/react'
import AppAvatar, { appNames } from './app-avatar/app-avatar'
import { AppSwitcher } from './app-switcher'

const meta = {
  title: 'Components/AppSwitcher',
  component: AppSwitcher,
} satisfies Meta<typeof AppSwitcher>

export default meta

type Story = StoryObj<typeof meta>

// (AA)TODO: Should you change the name of this?
const useParentDecorator: Decorator = (Story) => {
  return (
    <div
      style={{
        width: '400px',
        height: '400px',
      }}
    >
      <Story />
    </div>
  )
}

// (AA)TODO: Get/share the args you need form the smaller components
// (AA)TODO: Write comments for these stories
// /**
//  * By default, a a group will grow to whatever width it's parent allows.
//  */
export const Default: Story = {
  decorators: [useParentDecorator],
  render: () => {
    return (
      <AppSwitcher>
        <AppSwitcher.AccessibleAppsMenuGroup>
          <AppSwitcher.MenuItem
            logo={<AppAvatar appName={appNames.reapitPM.name} />}
            appName={appNames.reapitPM.name}
            description={appNames.reapitPM.description}
            url={appNames.reapitPM.url}
          />
        </AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.InaccessibleAppsMenuGroup>
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
        </AppSwitcher.InaccessibleAppsMenuGroup>
      </AppSwitcher>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  decorators: [useParentDecorator],
  render: () => {
    return (
      <AppSwitcher>
        <AppSwitcher.AccessibleAppsMenuGroup>
          <AppSwitcher.MenuItem
            logo={<AppAvatar appName={appNames.reapitPM.name} />}
            appName={appNames.reapitPM.name}
            description={appNames.reapitPM.description}
            url={appNames.reapitPM.url}
            isFocused={true}
          />
        </AppSwitcher.AccessibleAppsMenuGroup>

        <AppSwitcher.InaccessibleAppsMenuGroup>
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
        </AppSwitcher.InaccessibleAppsMenuGroup>
      </AppSwitcher>
    )
  },
}
