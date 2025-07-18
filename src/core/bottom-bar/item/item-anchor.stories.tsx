import { BottomBarItemAnchor } from './item-anchor'
import { ContactIcon } from '#src/icons/contact'
import { HelpIcon } from '#src/icons/help'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/BottomBar/ItemAnchor',
  component: BottomBarItemAnchor,
  argTypes: {
    'aria-current': {
      control: 'radio',
      // NOTE: This is necessary because a `false` value in a Story will otherwise not correctly pre-select the
      // "false" option.
      options: ['page', false],
      mapping: {
        page: 'page',
        false: false,
      },
    },
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
} satisfies Meta<typeof BottomBarItemAnchor>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Items in the bottom bar will typically navigate users to another page in the product. The `aria-current`
 * attribute must be supplied to indicate visually and accessibly that the item represents the current page (or not).
 */
export const Example: Story = {
  args: {
    'aria-current': false,
    children: 'Label',
    hasBadge: false,
    href: globalThis.top?.location.href!,
    icon: 'Star',
  },
}

/**
 * When an item represents the current page, `aria-current="page"` should be supplied. This indicates to visual
 * and accessible users that the item represents the current page.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}

/**
 * Items may need to visually indicate that something new has occurred that the user should be aware of. When
 * this is the case, a badge can be displayed. A common example is a notification bell that shows a badge when one or
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
