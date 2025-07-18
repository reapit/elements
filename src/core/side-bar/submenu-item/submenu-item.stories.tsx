import { SideBarSubmenuItem } from './submenu-item'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SideBar/SubmenuItem',
  component: SideBarSubmenuItem,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  decorators: [useSideBarContextDecorator],
} satisfies Meta<typeof SideBarSubmenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-current': false,
    children: 'Submenu Item',
    href: globalThis.top?.location.href!,
  },
}

/**
 * When the item represents the current page, `aria-current="page"` should be supplied to communicate to visual and
 * accessible users that the item is currently "selected".
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}

/**
 * When there is not enough space to display the full label, it will be truncated with an ellipsis. That said,
 * author's should typically ensure submenu item labels are short enough to fit within the available space in
 * the `SideBar`. Importantly, when the `SideBar` is collapsed, the submenu item's label will be available in
 * the accessibility tree despite not being fully visible.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: { width: '100px' },
  },
}

/**
 * When the `SideBar` is collapsed, the submenu item's label will be completely hidden. However, submenu's should not
 * generally be visible at all when the `SideBar` is collapsed because their parent menu group should be closed. Again
 * though, while the label is not visible, it is still available in the accessibility tree.
 */
export const Collapsed: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: { state: 'collapsed' },
  },
}
