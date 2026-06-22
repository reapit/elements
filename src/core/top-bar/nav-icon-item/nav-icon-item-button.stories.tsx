import preview from '#.storybook/preview'
import { ContactIcon } from '#src/icons/contact'
import { HelpIcon } from '#src/icons/help'
import { Menu } from '#src/core/menu'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'
import { TopBarNavIconItemButton } from './nav-icon-item-button'
import { useId } from 'react'

const meta = preview.meta({
  title: 'Navigation/TopBar/NavIconItemButton',
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
})

/**
 * Most nav icon items will be used as a link to navigate users to another page in the product. When used as a link,
 * the `aria-current` attribute must be supplied to indicate visually and accessibly that the item represents the
 * current page (or not).
 */
export const Example = meta.story({
  args: {
    'aria-label': 'Nav icon item',
    hasBadge: false,
    icon: 'star',
    onClick: () => void 0,
  },
})

/**
 * Nav icon items may need to visually indicate that something new has occurred that the user should be aware of. When
 * this is the case, a badge can be displayed. A common exmaple is a notification bell that shows a badge when one or
 * more unread notifications are available.
 */
export const WithBadge = Example.extend({
  args: {
    'aria-label': 'Notifications',
    hasBadge: true,
    icon: 'notification',
  },
})

/**
 * Button-based items are typically used to group a number of related items within a dropdown menu.
 */
export const WithMenu = meta.story({
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
    const triggerId = useId()
    const menuId = useId()
    return (
      <>
        <TopBarNavIconItemButton
          {...args}
          {...Menu.getTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
        />
        <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-end">
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
          <Menu.Item>Menu Item 3</Menu.Item>
        </Menu>
      </>
    )
  },
})
