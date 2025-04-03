import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import { MobileNavMenu, MobileNavMenuProps } from './mobile-nav-menu'

const meta = {
  title: 'Components/Mobile Nav Menu',
  component: MobileNavMenu,
  parameters: {
    layout: 'fullscreen',
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
        <Button onClick={() => setIsOpen(true)}>{isOpen ? 'Close' : 'Open'} Mobile Nav Menu</Button>
        <MobileNavMenu isOpen={isOpen} onClose={handleOnClose}>
          <MobileNavMenu.Header onClose={handleOnClose} />
          <MobileNavMenu.Content>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="Main Nav Item 1" hasBadge>
                <MobileNavMenu.Item label="Label" href="#item-1.1" />
                <MobileNavMenu.Item label="Label" href="#item-1.2" />
                <MobileNavMenu.Item label="Label" href="#item-1.3" />
                <MobileNavMenu.Item label="Label" href="#item-1.4" />
                <MobileNavMenu.Item label="Label" href="#item-1.5" />
              </MobileNavMenu.Item>
              <MobileNavMenu.Item label="Main Nav Item 2" href="#item-2" />
              <MobileNavMenu.Item label="Main Nav Item 3" href="#item-3" />
              <MobileNavMenu.Item label="Main Nav Item 4" href="#item-4" />
              <MobileNavMenu.Item label="Main Nav Item 5" href="#item-5" />
            </MobileNavMenu.ItemGroup>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="Secondary Nav Item 1" hasBadge isActive>
                <MobileNavMenu.Item label="Label" href="#item-1.1" />
                <MobileNavMenu.Item label="Label" href="#item-1.2" />
                <MobileNavMenu.Item label="Label" href="#item-1.3" isActive />
                <MobileNavMenu.Item label="Label" href="#item-1.4" hasBadge />
                <MobileNavMenu.Item label="Label" href="#item-1.5" />
              </MobileNavMenu.Item>
              <MobileNavMenu.Item label="Secondary Nav Item 2" href="#item-2" />
              <MobileNavMenu.Item label="Secondary Nav Item 3" href="#item-3" />
              <MobileNavMenu.Item label="Secondary Nav Item 4" href="#item-4" />
              <MobileNavMenu.Item label="Secondary Nav Item 5" href="#item-5" />
            </MobileNavMenu.ItemGroup>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="User Item 1" href="#item-1.1" />
              <MobileNavMenu.Item label="User Item 2" href="#item-1.1" />
              <MobileNavMenu.Item label="User Item 3" href="#item-1.1" />
              <MobileNavMenu.Item label="User Item 4" href="#item-1.1" />
              <MobileNavMenu.Item label="User Item 5" href="#item-1.1" />
            </MobileNavMenu.ItemGroup>
          </MobileNavMenu.Content>
        </MobileNavMenu>
      </>
    )
  },
} satisfies Meta<MobileNavMenuProps>

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
