import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { TopBarMenuItem } from '../top-bar-menu-item'
import { Button } from '../button'

import { TopBarMenuItemGroup } from './top-bar-menu-item-group'

const meta = {
  title: 'Components/Top Bar Menu Item Group',
  component: TopBarMenuItemGroup,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: '',
    children: null,
  },
} satisfies Meta<typeof TopBarMenuItemGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({}) => (
    <ul>
      <TopBarMenuItemGroup label="Report" aria-label="Options, opens a sub menu" hasBadge isActive>
        <TopBarMenuItem label="Create" href="#create" />
        <TopBarMenuItem label="Report" onClick={action('onClick')} hasBadge />
        <TopBarMenuItem label="Archive" href="#archive" target="_blank" aria-label="Archive, opens in a new window" />
      </TopBarMenuItemGroup>
    </ul>
  ),
}

export const Expandable: Story = {
  render: ({}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <>
        <Button onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? 'Close' : 'Open'}</Button>
        <ul>
          <TopBarMenuItemGroup label="Report" aria-label="Options, opens a sub menu" hasBadge isActive={isExpanded}>
            <TopBarMenuItem label="Create" href="#create" />
            <TopBarMenuItem label="Report" onClick={action('onClick')} hasBadge />
            <TopBarMenuItem
              label="Archive"
              href="#archive"
              target="_blank"
              aria-label="Archive, opens in a new window"
            />
          </TopBarMenuItemGroup>
        </ul>
      </>
    )
  },
}
