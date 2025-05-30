import { SideBarSubmenu } from './submenu'
import * as SideBarSubmenuItemStories from '../submenu-item/submenu-item.stories'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SideBar/Submenu',
  component: SideBarSubmenu,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item'],
      mapping: {
        'No selected item': [
          <SideBarSubmenu.Item key="1" {...SideBarSubmenuItemStories.Example.args}>
            Submenu item 1
          </SideBarSubmenu.Item>,
          <SideBarSubmenu.Item key="2" {...SideBarSubmenuItemStories.Example.args}>
            Submenu item 2
          </SideBarSubmenu.Item>,
        ],
        'Selected item': [
          <SideBarSubmenu.Item key="1" {...SideBarSubmenuItemStories.Example.args}>
            Submenu item 1
          </SideBarSubmenu.Item>,
          <SideBarSubmenu.Item key="2" {...SideBarSubmenuItemStories.Selected.args}>
            Submenu item 2
          </SideBarSubmenu.Item>,
        ],
      },
    },
  },
  decorators: [useSideBarContextDecorator],
} satisfies Meta<typeof SideBarSubmenu>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected item',
  },
}

/**
 * There is no visual or accessible difference applied to the submenu itself when one of its items represents the
 * current page. It is just the specific item that will appear differently.
 */
export const Selected: Story = {
  args: {
    children: 'Selected item',
  },
}

/**
 * The submenu simply fills it parent container. If that parent does not have enough space for the labels
 * of some or all of the submenu items, those labels will truncate as per the behaviour documented for the
 * `SideBar.SubmenuItem` component.
 */
export const Truncation = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: { width: '100px' },
  },
}
