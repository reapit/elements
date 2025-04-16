import { render } from '@testing-library/react'
import { DeprecatedNav, DeprecatedNavItem, DeprecatedNavSubNavItem, DeprecatedNavSubNav } from '../nav'

describe('Nav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedNav />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('NavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedNavItem />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for a secondary item', () => {
    const wrapper = render(<DeprecatedNavItem isSecondary />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('NavSubNav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedNavSubNav />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('NavSubNavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedNavSubNavItem />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
