import { render } from '@testing-library/react'
import { Icon } from '../../icon'
import { NavIconItem } from '../../nav-icon-item'
import { NavItem } from '../../nav-item'
import { NavSearchButton } from '../../nav-search-button/nav-search-button'
import { TopBar } from '../top-bar'

vi.mock('../../nav-item', () => ({
  NavItem: vi.fn(() => <div data-testid="nav-item" />),
}))

vi.mock('../../nav-icon-item', () => ({
  NavIconItem: vi.fn(() => <div data-testid="nav-icon-item" />),
}))

// TODO: update search-button index file
vi.mock('../../nav-search-button/nav-search-button', () => ({
  NavSearchButton: vi.fn(() => <div data-testid="nav-search-button" />),
}))

describe('TopBar Snapshot', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <TopBar>
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
      </TopBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
