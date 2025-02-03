import { render } from '@testing-library/react'
import { SideBar } from '..'

describe('SideBar', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<SideBar>Sample content</SideBar>)
    expect(asFragment()).toMatchSnapshot()
  })
})
