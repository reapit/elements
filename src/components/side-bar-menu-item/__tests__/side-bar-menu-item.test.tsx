import { render } from '@testing-library/react'
import { SideBarMenuItem } from '..'

describe('SideBarMenuItem', () => {
  it('should render anchor item and match snapshot', () => {
    const { asFragment } = render(
      <SideBarMenuItem icon={<div />} href="#">
        a link
      </SideBarMenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render button item with isActive props and match snapshot', () => {
    const { asFragment } = render(
      <SideBarMenuItem icon={<div />} onClick={vi.fn()} isActive>
        a button
      </SideBarMenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
