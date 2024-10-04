import React from 'react'
import { render } from '@testing-library/react'
import { MenuContainer, MenuItemGroup, MenuItemGroupTitle } from '..'

describe('MenuContainer component', () => {
  it('should render MenuContainer and match snapshot', () => {
    const { asFragment } = render(
      <MenuContainer>
        <div>Menu Content</div>
      </MenuContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('MenuItemGroupTitle component', () => {
  it('should render MenuItemGroupTitle and match snapshot', () => {
    const { asFragment } = render(<MenuItemGroupTitle>Group Title</MenuItemGroupTitle>)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('MenuItemGroup component', () => {
  it('should render MenuItemGroup with title and match snapshot', () => {
    const { asFragment } = render(
      <MenuItemGroup title="Group Title">
        <div>Group Item 1</div>
      </MenuItemGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render MenuItemGroup without title and match snapshot', () => {
    const { asFragment } = render(
      <MenuItemGroup>
        <div>Group Item 1</div>
      </MenuItemGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
