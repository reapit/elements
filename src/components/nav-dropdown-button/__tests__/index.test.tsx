import { render } from '@testing-library/react'
import { NavDropdownButton, NavDropdownButtonProps } from '../nav-dropdown-button'

jest.mock('../../icon', () => ({
  Icon: jest.fn(() => <div data-testid="icon" />),
}))

describe('NavDropdownButton', () => {
  const defaultProps: NavDropdownButtonProps = {
    isOpen: false,
    onClick: jest.fn(),
  }

  it('matches snapshot when collapsed', () => {
    const { asFragment } = render(<NavDropdownButton {...defaultProps}>Test Button</NavDropdownButton>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot when expanded', () => {
    const { asFragment } = render(
      <NavDropdownButton {...defaultProps} isOpen={true}>
        Test Button
      </NavDropdownButton>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
