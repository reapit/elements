import { Icon } from '../../icon'
import { Menu } from '../../menu'
import { TopBarNavIconItem } from './nav-icon-item'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TopBar/NavIconItem',
  component: TopBarNavIconItem,
  argTypes: {
    // NOTE: The descriptions for the following props are manually specified here because Storybook is unable to
    // extract them from the component's prop type due to the use of a discriminated union.
    'aria-current': {
      control: 'radio',
      description: 'Whether the nav item represents the current page. Only applicable when `as="a"`.',
      options: ['page', false],
      table: {
        type: { summary: '"page" | false' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The accessible name of the nav item.',
    },
    as: {
      control: 'radio',
      description: 'Whether the nav item is rendered as a button or a link. Defaults to `"a"`.',
      options: ['a', 'button'],
      table: {
        type: { summary: '"a" | "button"' },
      },
    },
    hasBadge: {
      control: 'boolean',
      description: 'Whether the nav item has a badge.',
    },
    href: {
      control: 'text',
      description: 'The URL to navigate to when the nav item is clicked. Only applicable when `as="a"`.',
    },
    icon: {
      control: false,
      description: "The nav item's icon.",
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof TopBarNavIconItem>

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
    icon: <Icon icon="star" />,
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
export const AsButton: Story = {
  args: {
    'aria-label': 'Help menu',
    as: 'button',
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
        <Menu.Trigger>{({ getTriggerProps }) => <TopBarNavIconItem {...args} {...getTriggerProps()} />}</Menu.Trigger>
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
