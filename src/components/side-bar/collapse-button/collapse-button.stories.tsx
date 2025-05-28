import { SideBarCollapseButton } from './collapse-button'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SideBar/CollapseButton',
  component: SideBarCollapseButton,
  decorators: [useSideBarContextDecorator],
} satisfies Meta<typeof SideBarCollapseButton>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {}

/**
 * When the `SideBar` is collapsed, the collapse button's label will be completely hidden. Importantly though, its
 * label will still be available in the accessibility tree and will be "Expand", not "Collapse".
 */
export const Collapsed = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: { state: 'collapsed' },
  },
}
