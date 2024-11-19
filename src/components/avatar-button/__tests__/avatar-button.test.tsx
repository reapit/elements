import { render } from '@testing-library/react'
import { AvatarButton } from '../avatar-button'

describe('AvatarButton', () => {
  it('should render the component and match snapshot', () => {
    expect(
      render(<AvatarButton label="Test label" onClick={jest.fn()} data-custom="custom props" />).asFragment(),
    ).toMatchSnapshot()
  })
})
