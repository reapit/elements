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
    ...Example.args,
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

/**
 * If an item within the group has a notification badge, a badge can also be displayed on the group
 * summary when closed. The summary's badge will automatically hide when the group is expanded.
 */
export const Badge: Story = {
  args: {
    ...Example.args,
    children: (
      <TopBarMenuDrawerSubmenu>
        <TopBarMenuDrawerSubmenu.Item hasBadge href="/settings/profile" aria-current={false}>
          Profile
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.Item href="/settings/preferences" aria-current={false}>
          Preferences
        </TopBarMenuDrawerSubmenu.Item>
      </TopBarMenuDrawerSubmenu>
    ),
    summary: <TopBarMenuDrawerMenuGroupSummary hasBadge>Settings</TopBarMenuDrawerMenuGroupSummary>,
  },
}

/**
 * Menu groups should have concise labels. In cases where the label is too long, it will truncate.
 * Care should be taken to ensure this does not happen.
 */
export const Truncation: Story = {
  args: {
    ...Badge.args,
    summary: (
      <TopBarMenuDrawerMenuGroupSummary hasBadge>All your base are belong to me</TopBarMenuDrawerMenuGroupSummary>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
}
