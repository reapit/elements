import React from 'react'
import { render } from '@testing-library/react'
import { NavMenuButtonContainer, NavMenuButtonMenuContainer, NavMenuButtonTogglerBase } from '..'

describe('NavMenuButton components', () => {
  it('should render MenuButtonContainer and match snapshot', () => {
    const { asFragment } = render(
      <NavMenuButtonContainer>
        <span>Menu Button</span>
      </NavMenuButtonContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render MenuButtonMenuContainer and match snapshot', () => {
    const { asFragment } = render(
      <NavMenuButtonMenuContainer top={50}>
        <span>Menu Item</span>
      </NavMenuButtonMenuContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render MenuButtonTogglerBase and match snapshot', () => {
    const { asFragment } = render(
      <NavMenuButtonTogglerBase>
        <span>Toggle Menu</span>
      </NavMenuButtonTogglerBase>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
