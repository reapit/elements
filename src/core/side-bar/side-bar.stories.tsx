import preview from '#.storybook/preview'
import { DashboardIcon } from '#src/icons/dashboard'
import { ContactIcon } from '#src/icons/contact'
import { PropertyIcon } from '#src/icons/property'
import { SettingsIcon } from '#src/icons/settings'
import { SideBar } from './side-bar'
import { useViewportHeightDecorator } from './__story__/use-viewport-height-decorator'

// Placeholder href for all menu items in this story.
const href = '#'

const meta = preview.meta({
  title: 'Core/SideBar',
  component: SideBar,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Menu Item 2 selected', 'Submenu Item 2 selected', 'Menu Item 4 active'],
      mapping: {
        'No selected item': buildMenu('No selected item'),
        'Menu Item 2 selected': buildMenu('Menu Item 2 selected'),
        'Submenu Item 2 selected': buildMenu('Submenu Item 2 selected'),
        'Menu Item 4 active': buildMenu('Menu Item 4 active'),
      },
    },
    footer: {
      control: false,
    },
  },
  decorators: [useViewportHeightDecorator],
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'No selected item',
    footer: <SideBar.CollapseButton />,
  },
})

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `SideBar.MenuItem`
 * documentation for details on how.
 */
export const SelectedItem = Example.extend({
  args: {
    children: 'Menu Item 2 selected',
  },
})

/**
 * Likewise, if a submenu item represents the current page, it should be marked as "selected". This will
 * automatically cause the parent `SideBar.MenuGroup` to be displayed as "selected" itself. See the
 * `SideBar.SubmenuItem` documentation for details on how.
 */
export const SelectedSubmenuItem = Example.extend({
  args: {
    children: 'Submenu Item 2 selected',
  },
})

/**
 * The side bar can be resized using the `width` prop. This size only applies when the side bar is expanded. Products
 * should set the width according the menu items they display within the side bar. The side bar cannot be sized smaller
 * than `--size-48` or larger than `--size-64`.
 *
 * By default, the side bar will size itself to `--size-64`.
 */
export const Sizing = SelectedItem.extend({
  args: {
    width: '--size-52',
  },
})

function buildMenu(
  type: 'No selected item' | 'Menu Item 2 selected' | 'Submenu Item 2 selected' | 'Menu Item 4 active',
) {
  return (
    <SideBar.MenuList>
      <SideBar.MenuItem aria-current={false} key="1" href={href} icon={<DashboardIcon />}>
        Menu item 1
      </SideBar.MenuItem>
      <SideBar.MenuItem
        key="2"
        aria-current={type === 'Menu Item 2 selected' ? 'page' : false}
        href={href}
        icon={<ContactIcon />}
      >
        Menu item 2
      </SideBar.MenuItem>
      <SideBar.MenuGroup
        key="3"
        summary={<SideBar.MenuGroupSummary icon={<PropertyIcon />}>Menu item 3</SideBar.MenuGroupSummary>}
      >
        <SideBar.Submenu>
          <SideBar.SubmenuItem aria-current={false} href={href}>
            Submenu item 1
          </SideBar.SubmenuItem>
          <SideBar.SubmenuItem aria-current={type === 'Submenu Item 2 selected' ? 'page' : false} href={href}>
            Submenu item 2
          </SideBar.SubmenuItem>
        </SideBar.Submenu>
      </SideBar.MenuGroup>
      <SideBar.MenuGroup
        key="4"
        isActive={type === 'Menu Item 4 active'}
        summary={<SideBar.MenuGroupSummary icon={<SettingsIcon />}>Menu item 4</SideBar.MenuGroupSummary>}
      >
        <SideBar.Submenu>
          <SideBar.SubmenuItem aria-current={false} href={href}>
            Submenu item 3
          </SideBar.SubmenuItem>
          <SideBar.SubmenuItem aria-current={false} href={href}>
            Submenu item 4
          </SideBar.SubmenuItem>
        </SideBar.Submenu>
      </SideBar.MenuGroup>
    </SideBar.MenuList>
  )
}
