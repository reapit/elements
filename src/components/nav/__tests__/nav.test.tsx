import { render } from '@testing-library/react'
import { Nav, NavItem, NavSubNavItem, NavSubNav } from '../nav'

describe('Nav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Nav />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('NavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<NavItem />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for a secondary item', () => {
    const wrapper = render(<NavItem isSecondary />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('NavSubNav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<NavSubNav />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('NavSubNavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<NavSubNavItem />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
