import { ContactIcon } from '#src/icons/contact'
import { HelpIcon } from '#src/icons/help'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'
import { Menu } from '#src/deprecated/menu'
import { TopBarNavIconItemButton } from './nav-icon-item-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/NavIconItemButton',
  component: TopBarNavIconItemButton,
  argTypes: {
    icon: {
      control: 'radio',
      options: ['contact', 'help', 'notification', 'star'],
      mapping: {
        contact: <ContactIcon />,
        help: <HelpIcon />,
        notification: <NotificationIcon />,
        star: <StarIcon />,
      },
    },
  },
} satisfies Meta<typeof TopBarNavIconItemButton>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Most nav icon items will be used as a link to navigate users to another page in the product. When used as a link,
 * the `aria-current` attribute must be supplied to indicate visually and accessibly that the item represents the
 * current page (or not).
 */
export const Example: Story = {
  args: {
    'aria-label': 'Nav icon item',
    hasBadge: false,
    icon: 'star',
    onClick: () => void 0,
  },
}

/**
 * Nav icon items may need to visually indicate that something new has occurred that the user should be aware of. When
 * this is the case, a badge can be displayed. A common exmaple is a notification bell that shows a badge when one or
 * more unread notifications are available.
 */
export const WithBadge: Story = {
  args: {
    ...Example.args,
    'aria-label': 'Notifications',
    hasBadge: true,
    icon: 'notification',
  },
}

/**
 * Button-based items are typically used to group a number of related items within a dropdown menu.
 */
export const WithMenu: Story = {
  args: {
    'aria-label': 'Help menu',
    icon: 'help',
    onClick: () => void 0,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    return (
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => <TopBarNavIconItemButton {...args} {...getTriggerProps()} />}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Item label="Menu Item 1" />
            <Menu.Item label="Menu Item 2" />
            <Menu.Item label="Menu Item 3" />
          </Menu.List>
        </Menu.Popover>
      </Menu>
    )
  },
}
