import preview from '#.storybook/preview'
import { SideBar } from '../side-bar'
import * as SideBarSubmenuItemStories from '../submenu-item/submenu-item.stories'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

const meta = preview.meta({
  title: 'Navigation/SideBar/Submenu',
  component: SideBar.Submenu,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item'],
      mapping: {
        'No selected item': [
          <SideBar.Submenu.Item key="1" {...SideBarSubmenuItemStories.Example.composed.args}>
            Submenu item 1
          </SideBar.Submenu.Item>,
          <SideBar.Submenu.Item key="2" {...SideBarSubmenuItemStories.Example.composed.args}>
            Submenu item 2
          </SideBar.Submenu.Item>,
        ],
        'Selected item': [
          <SideBar.Submenu.Item key="1" {...SideBarSubmenuItemStories.Example.composed.args}>
            Submenu item 1
          </SideBar.Submenu.Item>,
          <SideBar.Submenu.Item key="2" {...SideBarSubmenuItemStories.Selected.composed.args}>
            Submenu item 2
          </SideBar.Submenu.Item>,
        ],
      },
    },
  },
  decorators: [useSideBarContextDecorator],
})

export const Example = meta.story({
  args: {
    children: 'No selected item',
  },
})

/**
 * There is no visual or accessible difference applied to the submenu itself when one of its items represents the
 * current page. It is just the specific item that will appear differently.
 */
export const Selected = meta.story({
  args: {
    children: 'Selected item',
  },
})

/**
 * The submenu simply fills it parent container. If that parent does not have enough space for the labels
 * of some or all of the submenu items, those labels will truncate as per the behaviour documented for the
 * `SideBar.SubmenuItem` component.
 */
export const Truncation = Example.extend({
  decorators: [useSideBarWidthDecorator],

  parameters: {
    sideBar: { width: '100px' },
  },
})
