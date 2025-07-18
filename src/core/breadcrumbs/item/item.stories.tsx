import { BreadcrumbItem } from './item'
import { BreadcrumbLink } from '../link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Breadcrumbs/Item',
  component: BreadcrumbItem,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof BreadcrumbItem>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: <BreadcrumbLink href={href}>Properties</BreadcrumbLink>,
  },
}

/**
 * When there are multiple sibling items, the separator will be displayed by all except the last item.
 */
export const Separator: Story = {
  args: {
    children: <BreadcrumbLink href={href}>Residential</BreadcrumbLink>,
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', display: 'inline-flex', margin: 0, padding: 0, width: 'fit-content' }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={href}>Properties</BreadcrumbLink>
        </BreadcrumbItem>
        <Story />
      </ul>
    ),
  ],
}

/**
 * Overflow should be avoided as much as possible. When space becomes limited, an item's text will truncate
 * with ellipses. Though not demonstrated here, the breadcrumb separators remain fully visible.
 */
export const Overflow: Story = {
  args: {
    children: <BreadcrumbLink href={href}>Long breadcrumb link</BreadcrumbLink>,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '100px' }}>
        <Story />
      </div>
    ),
  ],
}
