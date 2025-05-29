import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherExploreMenuGroup } from './explore-menu-group'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <Story />
    </div>
  )
}

const meta = {
  title: 'Components/AppSwitcher/AppSwitcherExploreAppsMenuGroup',
  component: AppSwitcherExploreMenuGroup,
  decorators: [useParentDecorator],
} satisfies Meta<typeof AppSwitcherExploreMenuGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
  render: ({}) => {
    return (
      <AppSwitcher.ExploreMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.ExploreMenuGroup>
    )
  },
}

export const WhenAMenuItemIsFocused: Story = {
  args: {
    children: null,
  },
  render: ({}) => {
    return (
      <AppSwitcher.ExploreMenuGroup>
        <AppSwitcher.ReapitPMMenuItem url={'#'} />
        <AppSwitcher.ReapitSalesMenuItem url={'#'} />
        <AppSwitcher.KeyWhereMenuItem url={'#'} />
      </AppSwitcher.ExploreMenuGroup>
    )
  },
}
