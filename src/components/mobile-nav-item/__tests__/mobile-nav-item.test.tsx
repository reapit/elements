import { render } from '@testing-library/react'

import { MobileNavItem } from '../mobile-nav-item'

describe('MobileNavItem', () => {
  it('should render Simple MobileNavItem', () => {
    expect(render(<MobileNavItem label="Item 1" href="#item-1" />).asFragment()).toMatchSnapshot()
  })

  it('should render Simple MobileNavItem with badge', () => {
    expect(render(<MobileNavItem label="Item 1" href="#item-1" hasBadge />).asFragment()).toMatchSnapshot()
  })

  it('should render Expandable MobileNavItem', () => {
    expect(
      render(
        <MobileNavItem label="Item 2" hasBadge isActive>
          <MobileNavItem label="Sub Item 2.1" href="#item-2.1" isActive />
          <MobileNavItem label="Sub Item 2.2" onClick={() => {}} hasBadge />
          <MobileNavItem label="Sub Item 2.3" href="#item-2.3" />
        </MobileNavItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
