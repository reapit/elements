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
  tags: ['autodocs'],
  args: {
    isOpen: false,
    children: null,
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the menu is visible',
    },
    onClose: {
      description: 'Callback function when the menu is closed',
    },
  },
} satisfies Meta<TopBarMenuProps>

export default meta
type Story = StoryObj<typeof meta>

// Basic template for reuse across stories
const Template = ({ initialOpen = false, activeSection = 'dashboard', hasBadges = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const handleOnClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{isOpen ? 'Menu Open (Click to re-open)' : 'Open Menu'}</Button>
      <TopBarMenu isOpen={isOpen} onClose={handleOnClose}>
        <TopBarMenu.Header />
        <TopBarMenu.Body>
          <TopBarMenu.List>
            <TopBarMenu.Item href="#dashboard" isActive={activeSection === 'dashboard'}>
              Dashboard
            </TopBarMenu.Item>

            <TopBarMenu.Group
              label="Properties"
              hasBadge={hasBadges}
              isActive={['properties', 'property-search', 'saved-properties'].includes(activeSection)}
            >
              <TopBarMenu.Item href="#properties" isActive={activeSection === 'properties'}>
                All Properties
              </TopBarMenu.Item>
              <TopBarMenu.Item href="#property-search" isActive={activeSection === 'property-search'}>
                Property Search
              </TopBarMenu.Item>
              <TopBarMenu.Item
                href="#saved-properties"
                isActive={activeSection === 'saved-properties'}
                hasBadge={hasBadges}
              >
                Saved Properties
              </TopBarMenu.Item>
            </TopBarMenu.Group>

            <TopBarMenu.Group label="Clients" isActive={['clients', 'client-search'].includes(activeSection)}>
              <TopBarMenu.Item href="#clients" isActive={activeSection === 'clients'}>
                All Clients
              </TopBarMenu.Item>
              <TopBarMenu.Item href="#client-search" isActive={activeSection === 'client-search'}>
                Client Search
              </TopBarMenu.Item>
            </TopBarMenu.Group>

            <TopBarMenu.Item href="#calendar" isActive={activeSection === 'calendar'}>
              Calendar
            </TopBarMenu.Item>

            <TopBarMenu.Item href="#reports" isActive={activeSection === 'reports'}>
              Reports
            </TopBarMenu.Item>
          </TopBarMenu.List>
          <TopBarMenu.List>
            <TopBarMenu.Group
              label="Settings"
              isActive={['account-settings', 'company-settings', 'user-preferences'].includes(activeSection)}
            >
              <TopBarMenu.Item href="#account-settings" isActive={activeSection === 'account-settings'}>
                Account Settings
              </TopBarMenu.Item>
              <TopBarMenu.Item href="#company-settings" isActive={activeSection === 'company-settings'}>
                Company Settings
              </TopBarMenu.Item>
              <TopBarMenu.Item href="#user-preferences" isActive={activeSection === 'user-preferences'}>
                User Preferences
              </TopBarMenu.Item>
            </TopBarMenu.Group>

            <TopBarMenu.Item href="#help" isActive={activeSection === 'help'}>
              Help & Support
            </TopBarMenu.Item>
          </TopBarMenu.List>

          <TopBarMenu.List>
            <TopBarMenu.Item href="#profile" isActive={activeSection === 'profile'}>
              My Profile
            </TopBarMenu.Item>
            <TopBarMenu.Item href="#notifications" isActive={activeSection === 'notifications'} hasBadge={hasBadges}>
              Notifications
            </TopBarMenu.Item>
            <TopBarMenu.Item onClick={() => console.log('Logging out')}>Sign Out</TopBarMenu.Item>
          </TopBarMenu.List>
        </TopBarMenu.Body>
      </TopBarMenu>
    </>
  )
}

export const Default: Story = {
  render: () => <Template />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const InitiallyOpen: Story = {
  render: () => <Template initialOpen={true} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const WithActiveItem: Story = {
  render: () => <Template activeSection="properties" />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const WithNotificationBadges: Story = {
  render: () => <Template hasBadges={true} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const MobileView: Story = {
  render: () => <Template />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}
