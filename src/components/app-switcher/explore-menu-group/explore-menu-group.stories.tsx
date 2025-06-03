import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherExploreMenuGroup } from './explore-menu-group'

const useParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF' }}>
      <Story />
    </div>
  )
}

const meta = {
  title: 'Components/AppSwitcher/ExploreMenuGroup',
  component: AppSwitcherExploreMenuGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
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
        <AppSwitcher.ProductMenuItem productId="ireWeb" url={globalThis.top?.location.href!} />
      </AppSwitcher.ExploreMenuGroup>
    )
  },
}
