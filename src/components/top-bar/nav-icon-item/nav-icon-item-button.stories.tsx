import { Icon } from '../../icon'
import { Menu } from '../../menu'
import { TopBarNavIconItemButton } from './nav-icon-item-button'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TopBar/NavIconItemButton',
  component: TopBarNavIconItemButton,
  argTypes: {
    icon: {
      control: 'radio',
      options: ['contact', 'help', 'notification', 'star'],
      mapping: {
        contact: <Icon icon="contact" />,
        help: <Icon icon="help" />,
        notification: <Icon icon="notification" />,
        star: <Icon icon="star" />,
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
    icon: <Icon icon="star" />,
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
    icon: <Icon icon="notification" />,
  },
}

/**
 * Nav icon items can also be rendered as a button. This is typically used to group a number of related items within a
 * dropdown menu. The code snippet below demonstrates how to use `TopBar.NavIconItem` with the `Menu` component.
 *
 * ```tsx
 * <Menu.Trigger>
 *  {({ getTriggerProps }) => (
 *    <TopBar.NavIconItem
 *      {...getTriggerProps()}
 *      as="button"
 *      aria-label="Help menu"
 *      icon={<Icon icon="help" />}
 *    />
 *  )}
 * </Menu.Trigger>
 * ```
 */
export const WithMenu: Story = {
  args: {
    'aria-label': 'Help menu',
    icon: <Icon icon="help" />,
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
