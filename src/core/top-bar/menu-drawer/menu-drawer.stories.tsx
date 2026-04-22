import preview from '#.storybook/preview'
import { TopBarMenuDrawer } from './menu-drawer'
import { useState } from 'react'

const meta = preview.meta({
  title: 'Core/TopBar/MenuDrawer',
  component: TopBarMenuDrawer,
})

/**
 * At its simplest, you can open and close the menu drawer by controlling it's `isOpen` state. However,
 * you can also open and close it using the new
 * [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API).
 */
export const Example = meta.story({
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Show menu</button>

        <TopBarMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <TopBarMenuDrawer.Header />
          <TopBarMenuDrawer.Content>
            <TopBarMenuDrawer.MainNav>
              <TopBarMenuDrawer.MenuGroup
                summary={<TopBarMenuDrawer.MenuGroupSummary>Properties</TopBarMenuDrawer.MenuGroupSummary>}
              >
                <TopBarMenuDrawer.Submenu>
                  <TopBarMenuDrawer.SubmenuItem href="#" aria-current={false}>
                    Residential
                  </TopBarMenuDrawer.SubmenuItem>
                  <TopBarMenuDrawer.SubmenuItem href="#" aria-current={false}>
                    Commercial
                  </TopBarMenuDrawer.SubmenuItem>
                  <TopBarMenuDrawer.SubmenuItem href="#" aria-current={false}>
                    Other
                  </TopBarMenuDrawer.SubmenuItem>
                </TopBarMenuDrawer.Submenu>
              </TopBarMenuDrawer.MenuGroup>
              <TopBarMenuDrawer.MenuItem href="#" aria-current={false}>
                Contacts
              </TopBarMenuDrawer.MenuItem>
              <TopBarMenuDrawer.MenuItem href="#" aria-current={false}>
                Settings
              </TopBarMenuDrawer.MenuItem>
            </TopBarMenuDrawer.MainNav>
            <TopBarMenuDrawer.SecondaryNav>
              <TopBarMenuDrawer.MenuItem href="#" aria-current={false}>
                Conversations
              </TopBarMenuDrawer.MenuItem>
              <TopBarMenuDrawer.MenuItem href="#" aria-current={false}>
                Notifications
              </TopBarMenuDrawer.MenuItem>
            </TopBarMenuDrawer.SecondaryNav>
            <TopBarMenuDrawer.ProfileNav>
              <TopBarMenuDrawer.MenuItem href="#" aria-current={false}>
                Profile
              </TopBarMenuDrawer.MenuItem>
              <TopBarMenuDrawer.MenuItemButton>Logout</TopBarMenuDrawer.MenuItemButton>
            </TopBarMenuDrawer.ProfileNav>
          </TopBarMenuDrawer.Content>
        </TopBarMenuDrawer>
      </>
    )
  },
})

/**
 * If there are too many items in the drawer, it will scroll. The header will remain stuck to the top.
 */
export const Scrolling = meta.story({
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Show menu</button>

        <TopBarMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <TopBarMenuDrawer.Header />
          <TopBarMenuDrawer.Content>
            <TopBarMenuDrawer.MainNav>
              {new Array(10).fill(null).map((_, index) => (
                <TopBarMenuDrawer.MenuItem key={index} href="#" aria-current={false}>
                  Item {index + 1}
                </TopBarMenuDrawer.MenuItem>
              ))}
            </TopBarMenuDrawer.MainNav>
            <TopBarMenuDrawer.SecondaryNav>
              {new Array(10).fill(null).map((_, index) => (
                <TopBarMenuDrawer.MenuItem key={index} href="#" aria-current={false}>
                  Item {index + 1}
                </TopBarMenuDrawer.MenuItem>
              ))}
            </TopBarMenuDrawer.SecondaryNav>
            <TopBarMenuDrawer.ProfileNav>
              {new Array(10).fill(null).map((_, index) => (
                <TopBarMenuDrawer.MenuItem key={index} href="#" aria-current={false}>
                  Item {index + 1}
                </TopBarMenuDrawer.MenuItem>
              ))}
            </TopBarMenuDrawer.ProfileNav>
          </TopBarMenuDrawer.Content>
        </TopBarMenuDrawer>
      </>
    )
  },
})
