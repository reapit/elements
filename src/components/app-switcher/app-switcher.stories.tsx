import type { Meta, StoryObj } from '@storybook/react'
import AppAvatar, { appNames } from './app-avatar/app-avatar'
import { AppSwitcher } from './app-switcher'

const meta = {
  title: 'Components/AppSwitcher',
  component: AppSwitcher,
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
