import preview from '#.storybook/preview'
import { TopBarMenuDrawerMenuItemButton } from './menu-item-button'

const meta = preview.meta({
  title: 'Navigation/TopBar/MenuDrawer/MenuItemButton',
  component: TopBarMenuDrawerMenuItemButton,
})

export const Example = meta.story({
  args: {
    children: 'Sign Out',
  },
})

/**
 * A notification badge can be displayed using `hasBadge`.
 */
export const Badge = Example.extend({
  args: {
    hasBadge: true,
  },
})

/**
 * Menu items should have concise labels. In cases where the label is too long, it will truncate.
 * Care should be taken to ensure this does not happen.
 */
export const Truncation = Example.extend({
  args: {
    children: 'All your base are belong to me',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
})
