import { render } from '@testing-library/react'
import { SideBar } from '..'

describe('SideBar', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <SideBar>
        <SideBar.List>SideBar list content</SideBar.List>
      </SideBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
