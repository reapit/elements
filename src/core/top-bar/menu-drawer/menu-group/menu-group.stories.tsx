import { TopBarMenuDrawerMenuGroup } from './menu-group'
import { TopBarMenuDrawerMenuGroupSummary } from './menu-group-summary'
import { TopBarMenuDrawerSubmenu } from '../submenu'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuGroup',
  component: TopBarMenuDrawerMenuGroup,
  argTypes: {
    children: {
      control: false,
    },
    summary: {
      control: false,
    },
  },
} satisfies Meta<typeof TopBarMenuDrawerMenuGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <TopBarMenuDrawerSubmenu>
        <TopBarMenuDrawerSubmenu.Item href="/settings/profile" aria-current={false}>
          Profile
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.Item href="/settings/preferences" aria-current={false}>
          Preferences
        </TopBarMenuDrawerSubmenu.Item>
      </TopBarMenuDrawerSubmenu>
    ),
    summary: <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>,
  },
}

/**
 * When a submenu item within the group represents the current page, it should have an `aria-current="page"`
 * attribute. This attribute is used by `TopBar.MenuGroup` and `TopBar.MenuGroupSummary` to visually communicate
 * the group has a "selected" item. For acccessible users, this should be communicated via the underlying `<details>`
 * element's `open` attribute.
 *
 * Importantly, a group with an submenu item representing the current page should not be closable.
 */
export const Selected: Story = {
  args: {
    summary: <TopBarMenuDrawerMenuGroupSummary>Settings</TopBarMenuDrawerMenuGroupSummary>,
    children: (
      <TopBarMenuDrawerSubmenu>
        <TopBarMenuDrawerSubmenu.Item href="/settings/profile" aria-current="page">
          Profile
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.Item href="/settings/preferences" aria-current={false}>
          Preferences
        </TopBarMenuDrawerSubmenu.Item>
      </TopBarMenuDrawerSubmenu>
    ),
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
