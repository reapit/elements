import { Icon } from '../../icon'
import { SideBarMenuGroup } from './menu-group'
import { SideBarSubmenu } from '../submenu'
import { useArgs } from '@storybook/preview-api'
import * as SideBarSubmenuItemStories from '../submenu-item/submenu-item.stories'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SideBar/MenuGroup',
  component: SideBarMenuGroup,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item'],
      mapping: {
        'No selected item': (
          <SideBarSubmenu>
            <SideBarSubmenu.Item {...SideBarSubmenuItemStories.Example.args} />
            <SideBarSubmenu.Item {...SideBarSubmenuItemStories.Example.args} />
          </SideBarSubmenu>
        ),
        'Selected item': (
          <SideBarSubmenu>
            <SideBarSubmenu.Item {...SideBarSubmenuItemStories.Example.args} />
            <SideBarSubmenu.Item {...SideBarSubmenuItemStories.Selected.args} />
          </SideBarSubmenu>
        ),
      },
    },
    summary: {
      control: false,
    },
  },
  decorators: [useSideBarContextDecorator],
  // NOTE: because we are controlling the `open` state of the group, we need to use the `useArgs` hook to update the
  // `open` arg value if the group's state changes outside of the Storybook controls.
  render: (args) => {
    const [, updateArgs] = useArgs()
    const updateOpenArg = (event) => {
      updateArgs({ open: event.currentTarget.open })
    }
    return (
      <SideBarMenuGroup {...args} onToggle={updateOpenArg}>
        {args.children}
      </SideBarMenuGroup>
    )
  },
} satisfies Meta<typeof SideBarMenuGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected item',
    summary: <SideBarMenuGroup.Summary icon={<Icon icon="property" />}>Menu group</SideBarMenuGroup.Summary>,
    open: false,
  },
}

/**
 * When a submenu item within the group represents the current page, it should have an `aria-current="page"`
 * attribute. This attribute is used by `SideBar.MenuGroup` and `SideBar.MenuGroupSummary` to visually communicate
 * the group has a "selected" item. For acccessible users, this should be communicated via the underlying `<details>`
 * element's `open` attribute.
 *
 * Importantly, if the `SideBar` is not collapsed, a group with an submenu item representing the current page should
 * not be closable.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    children: 'Selected item',
    open: true,
  },
}

/**
 * When the `SideBar` is collapsed, the menu group's main label will be completely hidden. Importantly, the menu
 * group's label will still be available in the accessibility tree despite not being visible.
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

/**
 * Also, when the `SideBar` is collapsed, the menu group can still be selected, but it will not be expanded. Again,
 * the label will still be available in the accessibility tree. Clicking on the group will cause the `SideBar` to
 * expand, and the group to open, though this behaviour is handled by the `SideBar` component itself, not the group.
 */
export const SelectedAndCollapsed = {
  args: {
    ...Collapsed.args,
    children: 'Selected item',
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    ...Collapsed.parameters,
  },
  storyName: 'Selected and collapsed',
}
