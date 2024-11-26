import { render } from '@testing-library/react'
import { TopBar } from '../top-bar'
import { Icon } from '../../icon'
import { NavItem } from '../../nav'
import { ContainerQuery } from '../../container-query/container-query'
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
        <TopBar.MainNavigations
          style={{
            containerName: 'main-nav',
            containerType: 'inline-size',
          }}
        >
          <NavItem href="/">Button 1</NavItem>

          <ContainerQuery conditions={'(width < 1000px)'} containerName="main-nav">
            <NavItem href="/">Button 2</NavItem>
          </ContainerQuery>
          <ContainerQuery not conditions={'(width < 1000px)'} containerName="main-nav">
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
          </ContainerQuery>
        </TopBar.MainNavigations>
        <TopBar.SearchContainer>
          <NavIconItem icon={<Icon icon="search" />} aria-label="nav-icon-item-example" />
          <NavSearchButton />
        </TopBar.SearchContainer>

        <TopBar.SecondaryNavigations>
          <NavIconItem aria-label="example" icon={<Icon icon="star" />} />
        </TopBar.SecondaryNavigations>
        <TopBar.MenuButtonContainer>
          <NavIconItem aria-label="mobile secondary nav trigger" icon={<Icon icon="menu" />} />
        </TopBar.MenuButtonContainer>

        <AvatarButton className={elTopBarAvatar} label="AD" />
      </TopBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
