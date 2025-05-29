import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherYourAppsMenuGroup } from './your-apps-menu-group'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <Story />
    </div>
  )
}

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherYourAppsMenuGroup',
  component: AppSwitcherYourAppsMenuGroup,
  decorators: [useParentDecorator],
} satisfies Meta<typeof AppSwitcherYourAppsMenuGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
  render: ({}) => {
    return (
      <AppSwitcher.YourAppsMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.YourAppsMenuGroup>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  args: {
    children: null,
  },
  render: () => {
    return (
      <AppSwitcher.YourAppsMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.YourAppsMenuGroup>
    )
  },
}
