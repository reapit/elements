import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherAccessibleAppsMenuGroup } from './accessible-apps-menu-group'

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherAccessibleAppsMenuGroup',
  component: AppSwitcherAccessibleAppsMenuGroup,
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
export const Default: Story = {
  decorators: [useParentDecorator],
  args: {
    children: null,
  },
  render: ({}) => {
    return (
      <AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.AccessibleAppsMenuGroup>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  decorators: [useParentDecorator],
  args: {
    children: null,
  },
  render: () => {
    return (
      <AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} isFocused />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.AccessibleAppsMenuGroup>
    )
  },
}
