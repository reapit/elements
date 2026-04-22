import preview from '#.storybook/preview'
import type { Decorator } from '@storybook/react-vite'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherExploreMenuGroup } from './explore-menu-group'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF' }}>
      <Story />
    </div>
  )
}

const meta = preview.meta({
  title: 'Core/AppSwitcher/ExploreMenuGroup',
  component: AppSwitcherExploreMenuGroup,
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
      <AppSwitcher.ExploreMenuGroup>
        <AppSwitcher.ProductMenuItem href="#" productId="ireWeb" />
      </AppSwitcher.ExploreMenuGroup>
    )
  },
})
