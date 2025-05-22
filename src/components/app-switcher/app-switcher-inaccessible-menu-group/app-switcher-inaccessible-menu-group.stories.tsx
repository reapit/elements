import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherInaccessibleAppsMenuGroup } from './app-switcher-inaccessible-menu-group'

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherInaccessibleAppsMenuGroup',
  component: AppSwitcherInaccessibleAppsMenuGroup,
} satisfies Meta<typeof AppSwitcherInaccessibleAppsMenuGroup>

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
export const Default: Story = {
  decorators: [useParentDecorator],
  args: {
    children: null,
  },
  render: ({}) => {
    return (
      <AppSwitcher.InaccessibleAppsMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.InaccessibleAppsMenuGroup>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  decorators: [useParentDecorator],
  args: {
    children: null,
  },
  render: ({}) => {
    return (
      <AppSwitcher.InaccessibleAppsMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} isFocused />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.InaccessibleAppsMenuGroup>
    )
  },
}
