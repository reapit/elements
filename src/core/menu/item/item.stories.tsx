import { AnchorMenuItem } from './anchor-item'
import { Badge } from '#src/core/badge'
import { ExportIcon } from '#src/icons/export'
import { MenuItem } from './item'
import { PropertyIcon } from '#src/icons/property'
import { StarIcon } from '#src/icons/star'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Menu/Item',
  component: MenuItem,
  subcomponents: { AnchorMenuItem },
  argTypes: {
    'aria-checked': {
      control: 'boolean',
    },
    'aria-disabled': {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    badge: {
      control: 'radio',
      options: ['None', 'New'],
      mapping: {
        None: null,
        New: (
          <Badge colour="success" variant="reversed">
            New
          </Badge>
        ),
      },
    },
    iconLeft: {
      control: 'select',
      options: ['None', 'Export', 'Property', 'Star'],
      mapping: {
        None: undefined,
        Export: <ExportIcon />,
        Property: <PropertyIcon />,
        Star: <StarIcon />,
      },
    },
    iconRight: {
      control: 'select',
      options: ['None', 'Export', 'Property', 'Star'],
      mapping: {
        None: undefined,
        Export: <ExportIcon />,
        Property: <PropertyIcon />,
        Star: <StarIcon />,
      },
    },
    supplementaryInfo: {
      control: 'text',
    },
  },
} satisfies Meta<typeof MenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-checked': false,
    'aria-disabled': false,
    children: 'Menu item',
    disabled: false,
  },
}

/**
 * A badge can be placed next to the menu item's label. The badge's content will be used for the accessible
 * description of the menu item.
 */
export const Badges: Story = {
  args: {
    ...Example.args,
    badge: 'New',
  },
}

/**
 * Supplementary info can be included to provide further information about the menu item.
 */
export const SupplementaryInfo: Story = {
  args: {
    ...Example.args,
    supplementaryInfo: 'Supplementary info',
  },
}

/**
 * Icons can be placed on the left or right side of the menu item, or both.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    iconLeft: 'Property',
    iconRight: 'Export',
  },
}

/**
 * Badges, supplementary info and icons can all be used together for detail-rich menu items.
 */
export const Everything: Story = {
  args: {
    ...Badges.args,
    ...SupplementaryInfo.args,
    ...Icons.args,
  },
}

/**
 * Menu items can be in a selected state to indicate the current active item.
 */
export const Selected: Story = {
  args: {
    ...Everything.args,
    'aria-checked': true,
  },
}

/**
 * Menu items can be disabled using `aria-disabled` or `disabled`.
 */
export const Disabled: Story = {
  args: {
    ...Everything.args,
    disabled: true,
  },
}

/**
 * Menu items should generally have short and concise content, but the text will flow to multiple lines
 * if it cannot fit in the available space.
 */
export const Overflow: Story = {
  args: {
    ...Everything.args,
    children: 'Menu item long label that won’t fit in one line',
    badge: <Badge colour="neutral">Badge with long label</Badge>,
    supplementaryInfo: 'Secondary info long description that won’t fit in one line',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '277px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * `Menu.AnchorItem` is identical to `Menu.Item`, except it renders as an `<a>` element for navigation.
 *
 * Importantly, anchor elements do not support the `disabled` prop; to disable an anchor-based menu item,
 * use `aria-disabled="true"` instead.
 */
export const Anchors: StoryObj<typeof AnchorMenuItem> = {
  args: {
    'aria-current': false,
    'aria-disabled': false,
    badge: 'New',
    children: 'Agentbox',
    href: '#',
    iconLeft: 'Property',
    iconRight: 'Export',
    supplementaryInfo: 'Property sales and more',
  },
  argTypes: {
    'aria-current': {
      control: 'radio',
      options: ['page', false],
    },
  },
  render: (args) => <AnchorMenuItem {...args} />,
}
