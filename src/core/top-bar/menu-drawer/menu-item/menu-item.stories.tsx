import preview from '#.storybook/preview'
import { TopBarMenuDrawerMenuItem } from './menu-item'

const meta = preview.meta({
  title: 'Core/TopBar/MenuDrawer/MenuItem',
  component: TopBarMenuDrawerMenuItem,
})

export const Example = meta.story({
  args: {
    children: 'Dashboard',
    href: '/dashboard',
    'aria-current': false,
  },
})

/**
 * If the menu item represents the current page, `aria-current` should be provided.
 */
export const Selected = Example.extend({
  args: {
    'aria-current': 'page',
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
