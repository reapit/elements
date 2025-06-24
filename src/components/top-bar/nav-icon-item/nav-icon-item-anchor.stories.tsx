import { DeprecatedIcon } from '../../deprecated-icon'
import { TopBarNavIconItemAnchor } from './nav-icon-item-anchor'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/TopBar/NavIconItemAnchor',
  component: TopBarNavIconItemAnchor,
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
      options: ['contact', 'help', 'notification', 'star'],
      mapping: {
        contact: <DeprecatedIcon icon="contact" />,
        help: <DeprecatedIcon icon="help" />,
        notification: <DeprecatedIcon icon="notification" />,
        star: <DeprecatedIcon icon="star" />,
      },
    },
  },
} satisfies Meta<typeof TopBarNavIconItemAnchor>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Most nav icon items will be used as a link to navigate users to another page in the product. When used as a link,
 * the `aria-current` attribute must be supplied to indicate visually and accessibly that the item represents the
 * current page (or not).
 */
export const Example: Story = {
  args: {
    'aria-current': false,
    'aria-label': 'Nav icon item',
    hasBadge: false,
    href: globalThis.top?.location.href!,
    icon: 'star',
  },
}

/**
 * When the nav item represents the current page, `aria-current="page"` should be supplied. This indicates to visual
 * and accessible users that the item represents the current page.
 *
 * **Note:** This is only applicable when the nav item is a link.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
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
    icon: <DeprecatedIcon icon="notification" />,
  },
}
