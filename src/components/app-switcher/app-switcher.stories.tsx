import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from './app-switcher'
import { ElAppSwitcherSectionDivider } from './styles'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Story />
    </div>
  )
}

const meta = {
  title: 'Components/AppSwitcher',
  component: AppSwitcher,
  decorators: [useParentDecorator],
} satisfies Meta<typeof AppSwitcher>

export default meta

type Story = StoryObj<typeof meta>

// (AA-L)TODO: Get/share the args you need form the smaller components
// (AA-L)TODO: Write comments for these and other stories
// /**
//  * By default, a a group will grow to whatever width it's parent allows.
//  */
export const Default: Story = {
  render: () => {
    return (
      <AppSwitcher>
        <AppSwitcher.YourAppsMenuGroup>
          <AppSwitcher.ReapitPMMenuItem url={'#'} />
        </AppSwitcher.YourAppsMenuGroup>
        <ElAppSwitcherSectionDivider />
        <AppSwitcher.ExploreMenuGroup>
          <AppSwitcher.ReapitLettingMenuItem url={'#'} />
          <AppSwitcher.KeyWhereMenuItem url={'#'} />
        </AppSwitcher.ExploreMenuGroup>
      </AppSwitcher>
    )
  },
}
