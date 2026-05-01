import preview from '#.storybook/preview'
import type { Decorator } from '@storybook/react-vite'
import { AppSwitcher } from '../app-switcher'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF' }}>
      <Story />
    </div>
  )
}

const meta = preview.meta({
  title: 'Core/AppSwitcher/YourAppsMenuGroup',
  component: AppSwitcher.YourAppsMenuGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [useParentDecorator],
})

export const Default = meta.story({
  args: {
    children: null,
  },
  render: () => {
    return (
      <AppSwitcher.YourAppsMenuGroup>
        <AppSwitcher.ProductMenuItem href="#" productId="agentBox" />
      </AppSwitcher.YourAppsMenuGroup>
    )
  },
})
