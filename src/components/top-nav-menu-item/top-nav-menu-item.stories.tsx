import type { Meta, StoryObj } from '@storybook/react'

import { TopNavMenuItem } from './top-nav-menu-item'
import { action } from '@storybook/addon-actions'
import { Button } from '../button'
import { useState } from 'react'

const meta = {
  title: 'Components/Top Nav Menu Item',
  component: TopNavMenuItem,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Item 1',
    children: null,
  },
} satisfies Meta<typeof TopNavMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: ({}) => <TopNavMenuItem label="Report" href="#report" />,
}

export const Active: Story = {
  render: ({}) => <TopNavMenuItem label="Create" href="#create" isActive />,
}

export const WithBadge: Story = {
  render: ({}) => <TopNavMenuItem label="Archive" href="#archive" hasBadge />,
}

export const Expandable: Story = {
  render: ({}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
      <>
        <Button onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? 'Close' : 'Open'}</Button>
        <ul>
          <TopNavMenuItem isActive={isExpanded} label="Options" aria-label="Options, opens a sub menu" hasBadge>
            <TopNavMenuItem label="Create" href="#create" />
            <TopNavMenuItem label="Report" onClick={action('onClick')} hasBadge />
            <TopNavMenuItem
              label="Archive"
              href="#archive"
              target="_blank"
              aria-label="Archive, opens in a new window"
            />
          </TopNavMenuItem>
        </ul>
      </>
    )
  },
}

export const DefaultExpanded: Story = {
  render: ({}) => (
    <ul>
      <TopNavMenuItem label="Options" aria-label="Options, opens a sub menu" hasBadge isActive>
        <TopNavMenuItem label="Create" href="#create" />
        <TopNavMenuItem label="Report" onClick={action('onClick')} hasBadge />
        <TopNavMenuItem label="Archive" href="#archive" target="_blank" aria-label="Archive, opens in a new window" />
      </TopNavMenuItem>
    </ul>
  ),
}
