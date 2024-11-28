import { render } from '@testing-library/react'
import { TopBar } from '../top-bar'
import { Icon } from '../../icon'
import { NavItem } from '../../nav'
import { CSSContainerQuery } from '../../container-query/container-query'
import { Menu } from '../../menu'
import { NavDropdownButton } from '../../nav-dropdown-button'
import { NavIconItem } from '../../nav-icon-item'
import { NavSearchButton } from '../../nav-search-button/nav-search-button'
import { AvatarButton } from '../../avatar-button'
import { elTopBarAvatar } from '../styles'

vi.mock('../../icon', () => ({
  Icon: vi.fn(() => <div data-testid="icon" />),
}))

describe('TopBar Snapshot', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <TopBar>
        <TopBar.MainNav>
          <NavItem href="/">Button 1</NavItem>

          <CSSContainerQuery condition={'(width < 1000px)'}>
            <NavItem href="/">Button 2</NavItem>
          </CSSContainerQuery>
          <CSSContainerQuery condition={'not (width < 1000px)'}>
            <Menu>
              <Menu.Trigger>
                {({ getTriggerProps }) => <NavDropdownButton {...getTriggerProps()}>More</NavDropdownButton>}
              </Menu.Trigger>
              <Menu.Popover>
                <Menu.List>
                  <Menu.Item href="/">Button 2</Menu.Item>
                </Menu.List>
              </Menu.Popover>
            </Menu>
          </CSSContainerQuery>
        </TopBar.MainNav>
        <TopBar.Search>
          <NavIconItem icon={<Icon icon="search" />} aria-label="nav-icon-item-example" />
          <NavSearchButton />
        </TopBar.Search>

        <TopBar.SecondaryNav>
          <NavIconItem aria-label="example" icon={<Icon icon="star" />} />
        </TopBar.SecondaryNav>
        <TopBar.MobileNav>
          <NavIconItem aria-label="mobile secondary nav trigger" icon={<Icon icon="menu" />} />
        </TopBar.MobileNav>

        <AvatarButton className={elTopBarAvatar} label="AD" />
      </TopBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
