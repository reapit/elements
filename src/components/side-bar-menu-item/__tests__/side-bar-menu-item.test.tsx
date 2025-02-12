import { render } from '@testing-library/react'
import { SideBarMenuItem } from '..'

describe('SideBarMenuItem', () => {
  it('should render item and match snapshot', () => {
    const { asFragment } = render(
      <SideBarMenuItem icon={<div />} href="#">
        a link
      </SideBarMenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render active item and match snapshot', () => {
    const { asFragment } = render(
      <SideBarMenuItem icon={<div />} isActive href="/#">
        a link
      </SideBarMenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
