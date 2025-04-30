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
    label: 'Menu Group',
    children: null,
    hasBadge: false,
    isActive: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the menu group button',
    },
    hasBadge: {
      control: 'boolean',
      description: 'Whether to show a notification badge',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the menu group is expanded initially',
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof TopBarMenuItemGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ul>
      <TopBarMenuItemGroup {...args} aria-label="Options, opens a sub menu">
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
        <TopBarMenuItem onClick={action('onClick')}>Report</TopBarMenuItem>
        <TopBarMenuItem href="#archive" target="_blank" aria-label="Archive, opens in a new window">
          Archive
        </TopBarMenuItem>
      </TopBarMenuItemGroup>
    </ul>
  ),
}

export const WithBadge: Story = {
  args: {
    hasBadge: true,
  },
  render: (args) => (
    <ul>
      <TopBarMenuItemGroup {...args} label="Reports" aria-label="Reports menu, opens a sub menu">
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
        <TopBarMenuItem onClick={action('onClick')}>Report</TopBarMenuItem>
        <TopBarMenuItem href="#archive" target="_blank" aria-label="Archive, opens in a new window">
          Archive
        </TopBarMenuItem>
      </TopBarMenuItemGroup>
    </ul>
  ),
}

export const Initially_Expanded: Story = {
  args: {
    isActive: true,
  },
  render: (args) => (
    <ul>
      <TopBarMenuItemGroup {...args} label="Reports" aria-label="Reports menu, opens a sub menu">
        <TopBarMenuItem href="#create">Create</TopBarMenuItem>
        <TopBarMenuItem onClick={action('onClick')}>Report</TopBarMenuItem>
        <TopBarMenuItem href="#archive" target="_blank" aria-label="Archive, opens in a new window">
          Archive
        </TopBarMenuItem>
      </TopBarMenuItemGroup>
    </ul>
  ),
}

export const Expandable: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <>
        <Button onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? 'Close' : 'Open'}</Button>
        <ul>
          <TopBarMenuItemGroup label="Report" aria-label="Options, opens a sub menu" hasBadge isActive={isExpanded}>
            <TopBarMenuItem href="#create">Create</TopBarMenuItem>
            <TopBarMenuItem onClick={action('onClick')} hasBadge>
              Report
            </TopBarMenuItem>
            <TopBarMenuItem href="#archive" target="_blank" aria-label="Archive, opens in a new window">
              Archive
            </TopBarMenuItem>
          </TopBarMenuItemGroup>
        </ul>
      </>
    )
  },
}
