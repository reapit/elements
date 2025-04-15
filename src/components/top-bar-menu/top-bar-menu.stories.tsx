import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'

import { TopBarMenu, TopBarMenuProps } from './top-bar-menu'

const meta = {
  title: 'Components/Top Bar Menu',
  component: TopBarMenu,
  parameters: {
    layout: 'padded',
  },
  args: {
    isOpen: true,
    children: null,
  },
  render: ({}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOnClose = () => {
      setIsOpen(false)
    }

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>{isOpen ? 'Close' : 'Open'}</Button>
        <TopBarMenu isOpen={isOpen} onClose={handleOnClose}>
          <TopBarMenu.Header />
          <TopBarMenu.Body>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Main Nav Item 1" hasBadge>
                <TopBarMenu.Item label="Label" href="#item-1.1" />
                <TopBarMenu.Item label="Label" href="#item-1.2" />
                <TopBarMenu.Item label="Label" href="#item-1.3" />
                <TopBarMenu.Item label="Label" href="#item-1.4" />
                <TopBarMenu.Item label="Label" href="#item-1.5" />
              </TopBarMenu.Group>
              <TopBarMenu.Item label="Main Nav Item 2" href="#item-2" />
              <TopBarMenu.Item label="Main Nav Item 3" href="#item-3" />
              <TopBarMenu.Item label="Main Nav Item 4" href="#item-4" />
              <TopBarMenu.Item label="Main Nav Item 5" href="#item-5" />
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Secondary Nav Item 1" hasBadge isActive>
                <TopBarMenu.Item label="Label" href="#item-1.1" />
                <TopBarMenu.Item label="Label" href="#item-1.2" />
                <TopBarMenu.Item label="Label" href="#item-1.3" isActive />
                <TopBarMenu.Item label="Label" href="#item-1.4" hasBadge />
                <TopBarMenu.Item label="Label" href="#item-1.5" />
              </TopBarMenu.Group>
              <TopBarMenu.Item label="Secondary Nav Item 2" href="#item-2" />
              <TopBarMenu.Item label="Secondary Nav Item 3" href="#item-3" />
              <TopBarMenu.Item label="Secondary Nav Item 4" href="#item-4" />
              <TopBarMenu.Item label="Secondary Nav Item 5" href="#item-5" />
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item label="User Item 1" href="#item-1.1" />
              <TopBarMenu.Item label="User Item 2" href="#item-1.1" />
              <TopBarMenu.Item label="User Item 3" href="#item-1.1" />
              <TopBarMenu.Item label="User Item 4" href="#item-1.1" />
              <TopBarMenu.Item label="User Item 5" href="#item-1.1" />
            </TopBarMenu.List>
          </TopBarMenu.Body>
        </TopBarMenu>
      </>
    )
  },
} satisfies Meta<TopBarMenuProps>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}
