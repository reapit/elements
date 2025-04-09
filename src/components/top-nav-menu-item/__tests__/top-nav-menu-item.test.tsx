import { render } from '@testing-library/react'

import { TopNavMenuItem } from '../top-nav-menu-item'

describe('TopNavMenuItem', () => {
  it('should render Simple TopNavMenuItem', () => {
    expect(render(<TopNavMenuItem label="Item 1" href="#item-1" />).asFragment()).toMatchSnapshot()
  })

  it('should render Simple TopNavMenuItem with badge', () => {
    expect(render(<TopNavMenuItem label="Item 1" href="#item-1" hasBadge />).asFragment()).toMatchSnapshot()
  })

  it('should render Expandable TopNavMenuItem', () => {
    expect(
      render(
        <TopNavMenuItem label="Item 2" hasBadge isActive>
          <TopNavMenuItem label="Sub Item 2.1" href="#item-2.1" isActive />
          <TopNavMenuItem label="Sub Item 2.2" onClick={() => {}} hasBadge />
          <TopNavMenuItem label="Sub Item 2.3" href="#item-2.3" />
        </TopNavMenuItem>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
