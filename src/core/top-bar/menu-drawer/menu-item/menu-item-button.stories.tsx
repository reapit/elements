import { TopBarMenuDrawerMenuItemButton } from './menu-item-button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuItemButton',
  component: TopBarMenuDrawerMenuItemButton,
} satisfies Meta<typeof TopBarMenuDrawerMenuItemButton>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Sign Out',
  },
}

/**
 * A notification badge can be displayed using `hasBadge`.
 */
export const Badge: Story = {
  args: {
    ...Example.args,
    hasBadge: true,
  },
}

/**
 * Menu items should have concise labels. In cases where the label is too long, it will truncate.
 * Care should be taken to ensure this does not happen.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
    children: 'All your base are belong to me',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
}
