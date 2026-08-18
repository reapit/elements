import preview from "#.storybook/preview";

import { TopBar } from "../top-bar";

const meta = preview.meta({
  title: "Navigation/TopBar/Menu",
  component: TopBar.Menu,
});

/**
 * ...
 */
export const Example = meta.story({
  render: () => {
    return (
      <>
        <TopBar.Menu>
          <TopBar.Menu.Content>
            <TopBar.Menu.MainNav>
              <TopBar.Menu.MenuGroup
                summary={<TopBar.Menu.MenuGroupSummary>Properties</TopBar.Menu.MenuGroupSummary>}
              >
                <TopBar.Menu.Submenu>
                  <TopBar.Menu.SubmenuItem href="#" aria-current={false}>
                    Residential
                  </TopBar.Menu.SubmenuItem>
                  <TopBar.Menu.SubmenuItem href="#" aria-current={false}>
                    Commercial
                  </TopBar.Menu.SubmenuItem>
                  <TopBar.Menu.SubmenuItem href="#" aria-current={false}>
                    Other
                  </TopBar.Menu.SubmenuItem>
                </TopBar.Menu.Submenu>
              </TopBar.Menu.MenuGroup>
              <TopBar.Menu.MenuItem href="#" aria-current={false}>
                Contacts
              </TopBar.Menu.MenuItem>
              <TopBar.Menu.MenuItem href="#" aria-current={false}>
                Settings
              </TopBar.Menu.MenuItem>
            </TopBar.Menu.MainNav>
            <TopBar.Menu.SecondaryNav>
              <TopBar.Menu.MenuItem href="#" aria-current={false}>
                Conversations
              </TopBar.Menu.MenuItem>
              <TopBar.Menu.MenuItem href="#" aria-current={false}>
                Notifications
              </TopBar.Menu.MenuItem>
            </TopBar.Menu.SecondaryNav>
            <TopBar.Menu.ProfileNav>
              <TopBar.Menu.MenuItem href="#" aria-current={false}>
                Profile
              </TopBar.Menu.MenuItem>
              <TopBar.Menu.MenuItemButton>Logout</TopBar.Menu.MenuItemButton>
            </TopBar.Menu.ProfileNav>
          </TopBar.Menu.Content>
        </TopBar.Menu>
      </>
    );
  },
});
