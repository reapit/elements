import { render } from '@testing-library/react'
import { NavItem } from '../nav-item'

describe('NavItem', () => {
  it('should render the component as HTMLAnchorElement with default state', () => {
    expect(render(<NavItem href="#">Label</NavItem>).asFragment()).toMatchSnapshot()
  })

  it('should render the component as HTMLAnchorElement with active state', () => {
    expect(
      render(
        <NavItem href="#" isActive>
          Label
        </NavItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with default state', () => {
    expect(
      render(
        <NavItem onClick={vi.fn()} isActive>
          Label
        </NavItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement with active state', () => {
    expect(
      render(
        <NavItem onClick={vi.fn()} isActive>
          Label
        </NavItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
