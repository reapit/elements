import { BottomBarItemButton } from './item-button'
import { ContactIcon } from '#src/icons/contact'
import { HelpIcon } from '#src/icons/help'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'
import { DeprecatedMenu } from '#src/deprecated/menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/BottomBar/ItemButton',
  component: BottomBarItemButton,
  argTypes: {
    icon: {
      control: 'radio',
      options: ['Contact', 'Help', 'Notification', 'Star'],
      mapping: {
        Contact: <ContactIcon />,
        Help: <HelpIcon />,
        Notification: <NotificationIcon />,
        Star: <StarIcon />,
      },
    },
  },
} satisfies Meta<typeof BottomBarItemButton>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Button-based items are typically used to group a number of related items within a dropdown menu. Unlike link-based
 * items, button-based items do not have the concept of representing the current page.
 */
export const Example: Story = {
  args: {
    children: 'Label',
    hasBadge: false,
    icon: 'Star',
    onClick: () => void 0,
  },
}

/**
 * Items may need to visually indicate that something new has occurred that the user should be aware of. When
 * this is the case, a badge can be displayed. A common exmaple is a notification bell that shows a badge when one or
 * more unread notifications are available.
 */
export const WithBadge: Story = {
  args: {
    ...Example.args,
    children: 'Notifications',
    hasBadge: true,
    icon: 'Notification',
  },
}

/**
 * Button-based items are typically used to group a number of related items within a dropdown menu.
 */
export const WithMenu: Story = {
  args: {
    children: 'Help menu',
    icon: 'Help',
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
      <DeprecatedMenu>
        <DeprecatedMenu.Trigger>
          {({ getTriggerProps }) => <BottomBarItemButton {...args} {...getTriggerProps()} />}
        </DeprecatedMenu.Trigger>
        <DeprecatedMenu.Popover>
          <DeprecatedMenu.List>
            <DeprecatedMenu.Item label="Menu Item 1" />
            <DeprecatedMenu.Item label="Menu Item 2" />
            <DeprecatedMenu.Item label="Menu Item 3" />
          </DeprecatedMenu.List>
        </DeprecatedMenu.Popover>
      </DeprecatedMenu>
    )
  },
}
