import type { Meta, StoryObj } from '@storybook/react'

import { action } from '@storybook/addon-actions'
import { useState } from 'react'
import { MobileNavItem } from './mobile-nav-item'
import { Button } from '../button'

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
  render: ({}) => <MobileNavItem label="Contact" href="#item-1" />,
}

export const Active: Story = {
  render: ({}) => <MobileNavItem label="Contact" href="#item-1" isActive />,
}

export const WithBadge: Story = {
  render: ({}) => <MobileNavItem label="Contact" href="#item-1" hasBadge />,
}

export const Expandable: Story = {
  render: ({}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? 'Close' : 'Open'}</Button>
        <ul>
          <MobileNavItem label="Contact" hasBadge isActive={isOpen}>
            <MobileNavItem label="Create" href="#create" />
            <MobileNavItem label="Report" onClick={action('onClick')} hasBadge />
            <MobileNavItem label="Archive" href="#archive" />
          </MobileNavItem>
        </ul>
      </>
    )
  },
}

export const DefaultExpanded: Story = {
  render: ({}) => (
    <ul>
      <MobileNavItem label="Contact" hasBadge isActive>
        <MobileNavItem label="Create" href="#create" />
        <MobileNavItem label="Report" onClick={action('onClick')} hasBadge />
        <MobileNavItem label="Archive" href="#archive" />
      </MobileNavItem>
    </ul>
  ),
}
