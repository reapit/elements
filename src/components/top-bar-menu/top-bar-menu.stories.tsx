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
                <TopBarMenu.Item href="#item-1.1">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.2">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.3">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.4">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.5">Label</TopBarMenu.Item>
              </TopBarMenu.Group>
              <TopBarMenu.Item href="#item-2">Main Nav Item 2</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-3">Main Nav Item 3</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-4">Main Nav Item 4</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-5">Main Nav Item 5</TopBarMenu.Item>
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Secondary Nav Item 1" hasBadge isActive>
                <TopBarMenu.Item href="#item-1.1">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.2">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.3" isActive>
                  Label
                </TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.4" hasBadge>
                  Label
                </TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.5">Label</TopBarMenu.Item>
              </TopBarMenu.Group>
              <TopBarMenu.Item href="#item-2">Secondary Nav Item 2</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-3">Secondary Nav Item 3</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-4">Secondary Nav Item 4</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-5">Secondary Nav Item 5</TopBarMenu.Item>
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item href="#item-1.1">User Item 1</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 2</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 3</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 4</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 5</TopBarMenu.Item>
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
