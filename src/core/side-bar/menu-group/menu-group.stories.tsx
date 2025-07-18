import { PropertyIcon } from '#src/icons/property'
import { SideBarMenuGroup } from './menu-group'
import { SideBarSubmenu } from '../submenu'
import * as SideBarSubmenuItemStories from '../submenu-item/submenu-item.stories'
import { useArgs } from 'storybook/preview-api'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/SideBar/MenuGroup',
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
    isActive: false,
    summary: <SideBarMenuGroup.Summary icon={<PropertyIcon />}>Menu group</SideBarMenuGroup.Summary>,
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
  name: 'Selected and collapsed',
  args: {
    ...Collapsed.args,
    children: 'Selected item',
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    ...Collapsed.parameters,
  },
}

/**
 * When a menu group needs to be open and visually active but no submenu item within a group can be uniquely identified
 * as representing the current page, the group can be forced open via the `isActive` prop.
 */
export const ManuallyActive: Story = {
  args: {
    ...Example.args,
    isActive: true,
  },
}
