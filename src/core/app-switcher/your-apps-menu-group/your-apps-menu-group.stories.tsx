import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherYourAppsMenuGroup } from './your-apps-menu-group'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF' }}>
      <Story />
    </div>
  )
}

const meta = {
  title: 'Core/AppSwitcher/YourAppsMenuGroup',
  component: AppSwitcherYourAppsMenuGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
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
        <AppSwitcher.ProductMenuItem href={globalThis.top?.location.href!} productId="agentBox" />
      </AppSwitcher.YourAppsMenuGroup>
    )
  },
}
