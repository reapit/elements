import { TopBarMenu } from './menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/Menu',
  component: TopBarMenu,
} satisfies Meta<typeof TopBarMenu>

export default meta

type Story = StoryObj<typeof TopBarMenu>

/**
 * ...
 */
export const Example: Story = {
  render: () => {
    return (
      <>
        <TopBarMenu>
          <TopBarMenu.Content>
            <TopBarMenu.MainNav>
              <TopBarMenu.MenuGroup summary={<TopBarMenu.MenuGroupSummary>Properties</TopBarMenu.MenuGroupSummary>}>
                <TopBarMenu.Submenu>
                  <TopBarMenu.SubmenuItem href="#" aria-current={false}>
                    Residential
                  </TopBarMenu.SubmenuItem>
                  <TopBarMenu.SubmenuItem href="#" aria-current={false}>
                    Commercial
                  </TopBarMenu.SubmenuItem>
                  <TopBarMenu.SubmenuItem href="#" aria-current={false}>
                    Other
                  </TopBarMenu.SubmenuItem>
                </TopBarMenu.Submenu>
              </TopBarMenu.MenuGroup>
              <TopBarMenu.MenuItem href="#" aria-current={false}>
                Contacts
              </TopBarMenu.MenuItem>
              <TopBarMenu.MenuItem href="#" aria-current={false}>
                Settings
              </TopBarMenu.MenuItem>
            </TopBarMenu.MainNav>
            <TopBarMenu.SecondaryNav>
              <TopBarMenu.MenuItem href="#" aria-current={false}>
                Conversations
              </TopBarMenu.MenuItem>
              <TopBarMenu.MenuItem href="#" aria-current={false}>
                Notifications
              </TopBarMenu.MenuItem>
            </TopBarMenu.SecondaryNav>
            <TopBarMenu.ProfileNav>
              <TopBarMenu.MenuItem href="#" aria-current={false}>
                Profile
              </TopBarMenu.MenuItem>
              <TopBarMenu.MenuItemButton>Logout</TopBarMenu.MenuItemButton>
            </TopBarMenu.ProfileNav>
          </TopBarMenu.Content>
        </TopBarMenu>
      </>
    )
  },
}
