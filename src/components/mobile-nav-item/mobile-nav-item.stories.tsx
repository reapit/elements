import type { Meta, StoryObj } from '@storybook/react-vite'

import { MobileNavItem } from './mobile-nav-item'
import { action } from 'storybook/actions'

const meta = {
  title: 'Components/Mobile Nav Item',
  component: MobileNavItem,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Item 1',
    children: null,
  },
} satisfies Meta<typeof MobileNavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: ({}) => <MobileNavItem label="Item 1" href="#item-1" />,
}

export const Active: Story = {
  render: ({}) => <MobileNavItem label="Item 1" href="#item-1" isActive />,
}

export const WithBadge: Story = {
  render: ({}) => <MobileNavItem label="Item 1" href="#item-1" hasBadge />,
}

export const Expandable: Story = {
  render: ({}) => (
    <MobileNavItem label="Item 2" hasBadge>
      <MobileNavItem label="Sub Item 2.1" href="#item-2.1" />
      <MobileNavItem label="Sub Item 2.2" onClick={action('onClick')} hasBadge />
      <MobileNavItem label="Sub Item 2.3" href="#item-2.3" />
    </MobileNavItem>
  ),
}

export const DefaultExpanded: Story = {
  render: ({}) => (
    <MobileNavItem label="Item 3" isActive>
      <MobileNavItem label="Sub Item 3.1" href="#item-3.1" />
      <MobileNavItem label="Sub Item 3.2" onClick={action('onClick')} isActive />
      <MobileNavItem label="Sub Item 3.3" href="#item-3.3" />
    </MobileNavItem>
  ),
}
