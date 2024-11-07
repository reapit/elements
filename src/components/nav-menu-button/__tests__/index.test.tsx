import { render } from '@testing-library/react'
import { NavMenuButton, NavMenuButtonProps } from '../nav-menu-button'

jest.mock('../../icon', () => ({
  Icon: jest.fn(() => <div data-testid="icon" />),
}))

describe('NavMenuButton', () => {
  const defaultProps: NavMenuButtonProps = {
    isOpen: false,
    onClick: jest.fn(),
  }

  it('matches snapshot when collapsed', () => {
    const { asFragment } = render(<NavMenuButton {...defaultProps}>Test Button</NavMenuButton>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot when expanded', () => {
    const { asFragment } = render(
      <NavMenuButton {...defaultProps} isOpen={true}>
        Test Button
      </NavMenuButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
