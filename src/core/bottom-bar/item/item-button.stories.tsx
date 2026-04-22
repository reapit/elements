import preview from '#.storybook/preview'
import { BottomBarItemButton } from './item-button'
import { ContactIcon } from '#src/icons/contact'
import { HelpIcon } from '#src/icons/help'
import { Menu } from '#src/core/menu'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'

const meta = preview.meta({
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
})

/**
 * Button-based items are typically used to group a number of related items within a dropdown menu. Unlike link-based
 * items, button-based items do not have the concept of representing the current page.
 */
export const Example = meta.story({
  args: {
    children: 'Label',
    hasBadge: false,
    icon: 'Star',
    onClick: () => void 0,
  },
})

/**
 * Items may need to visually indicate that something new has occurred that the user should be aware of. When
 * this is the case, a badge can be displayed. A common exmaple is a notification bell that shows a badge when one or
 * more unread notifications are available.
 */
export const WithBadge = Example.extend({
  args: {
    children: 'Notifications',
    hasBadge: true,
    icon: 'Notification',
  },
})

/**
 * Button-based items are typically used to group a number of related items within a dropdown menu.
 */
export const WithMenu = meta.story({
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
      <>
        <BottomBarItemButton
          {...args}
          {...Menu.getTriggerProps({ id: 'trigger', popoverTarget: 'menu', popoverTargetAction: 'toggle' })}
        />
        <Menu aria-labelledby="trigger" id="menu" placement="top-end">
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
          <Menu.Item>Menu Item 3</Menu.Item>
        </Menu>
      </>
    )
  },
})
