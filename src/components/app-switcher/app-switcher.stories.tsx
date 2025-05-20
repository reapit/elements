import type { Meta, StoryObj } from '@storybook/react'
import AppAvatar, { appNames } from './app-avatar/app-avatar'
import { AppSwitcher } from './app-switcher'

const meta = {
  title: 'Components/AppSwitcher',
  component: AppSwitcher,
  // argTypes: {
  //   children: {
  //     control: 'text',
  //   },
  //   variant: {
  //     control: 'radio',
  //     options: ['filter', 'selection'],
  //   },
  // },
} satisfies Meta<typeof AppSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div style={{ height: '300px' }}>
        <AppSwitcher>
          <AppSwitcher.AccessibleAppsMenuGroup>
            <AppSwitcher.MenuItem
              logo={<AppAvatar appName={appNames.reapitPM.name} hasAccess={true} />}
              appName={appNames.reapitPM.name}
              description={appNames.reapitPM.description}
            />
          </AppSwitcher.AccessibleAppsMenuGroup>

          <AppSwitcher.InaccessibleAppsMenuGroup>
            <AppSwitcher.MenuItem
              logo={<AppAvatar appName={appNames.reapitLetting.name} hasAccess={false} />}
              appName={appNames.reapitLetting.name}
              description={appNames.reapitLetting.description}
            />
            <AppSwitcher.MenuItem
              logo={<AppAvatar appName={appNames.keyWhere.name} hasAccess={false} />}
              appName={appNames.keyWhere.name}
              description={appNames.keyWhere.description}
            />
          </AppSwitcher.InaccessibleAppsMenuGroup>
        </AppSwitcher>
      </div>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  render: () => {
    return (
      <AppSwitcher>
        <AppSwitcher.AccessibleAppsMenuGroup>
          <AppSwitcher.MenuItem
            logo={<AppAvatar appName={appNames.reapitPM.name} hasAccess={true} />}
            appName={appNames.reapitPM.name}
            description={appNames.reapitPM.description}
            isFocused={true}
          />
        </AppSwitcher.AccessibleAppsMenuGroup>

        <AppSwitcher.InaccessibleAppsMenuGroup>
          <AppSwitcher.MenuItem
            logo={<AppAvatar appName={appNames.reapitLetting.name} hasAccess={false} />}
            appName={appNames.reapitLetting.name}
            description={appNames.reapitLetting.description}
          />
          <AppSwitcher.MenuItem
            logo={<AppAvatar appName={appNames.keyWhere.name} hasAccess={false} />}
            appName={appNames.keyWhere.name}
            description={appNames.keyWhere.description}
          />
        </AppSwitcher.InaccessibleAppsMenuGroup>
      </AppSwitcher>
    )
  },
}
