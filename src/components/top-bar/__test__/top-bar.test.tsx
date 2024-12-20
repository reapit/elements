import { render } from '@testing-library/react'
import { Icon } from '../../icon'
import { NavIconItem } from '../../nav-icon-item'
import { NavItem } from '../../nav-item'
import { NavSearchButton } from '../../nav-search-button'
import { TopBar } from '..'
import { AvatarButton } from '../../avatar-button'

vi.mock('../../avatar-button', () => ({
  AvatarButton: vi.fn(() => <div data-testid="avatar-button" />),
}))

vi.mock('../../nav-item', () => ({
  NavItem: vi.fn(() => <div data-testid="nav-item" />),
}))

vi.mock('../../nav-icon-item', () => ({
  NavIconItem: vi.fn(() => <div data-testid="nav-icon-item" />),
}))

vi.mock('../../nav-search-button', () => ({
  NavSearchButton: vi.fn(() => <div data-testid="nav-search-button" />),
}))

describe('TopBar Snapshot', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <TopBar>
        <TopBar.AppSwitcher>App-switcher</TopBar.AppSwitcher>
        <TopBar.Logo>
          <img data-testid="logo-img" />
        </TopBar.Logo>
        <TopBar.MainNav>
          <NavItem href="/">Button 1</NavItem>
        </TopBar.MainNav>
        <TopBar.Search>
          <NavSearchButton />
        </TopBar.Search>
        <TopBar.SecondaryNav>
          <NavIconItem aria-label="example" icon={<Icon icon="star" />} />
        </TopBar.SecondaryNav>
        <TopBar.MobileNav>
          <NavIconItem aria-label="mobile secondary nav trigger" icon={<Icon icon="menu" />} />
        </TopBar.MobileNav>
        <TopBar.Profile>
          <AvatarButton label="AD" />
        </TopBar.Profile>
      </TopBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
