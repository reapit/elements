import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from './app-switcher'

const meta = {
  title: 'Components/AppSwitcher',
  component: AppSwitcher,
} satisfies Meta<typeof AppSwitcher>

export default meta

type Story = StoryObj<typeof meta>

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ width: '400px', height: '400px' }}>
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
          <AppSwitcher.ReapitPMMenuItem url={'#'} />
        </AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.InaccessibleAppsMenuGroup>
          <AppSwitcher.ReapitLettingMenuItem url={'#'} />
          <AppSwitcher.KeyWhereMenuItem url={'#'} />
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
          <AppSwitcher.ReapitPMMenuItem url={'#'} />
        </AppSwitcher.AccessibleAppsMenuGroup>
        <AppSwitcher.InaccessibleAppsMenuGroup>
          <AppSwitcher.ReapitLettingMenuItem url={'#'} />
          <AppSwitcher.KeyWhereMenuItem url={'#'} />
        </AppSwitcher.InaccessibleAppsMenuGroup>
      </AppSwitcher>
    )
  },
}
