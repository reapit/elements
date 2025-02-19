import { render } from '@testing-library/react'
import { SideBar } from '..'

describe('SideBar', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <SideBar>
        <SideBar.MenuList>SideBar list content</SideBar.MenuList>
      </SideBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
