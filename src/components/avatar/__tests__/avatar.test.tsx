import { render } from '@testing-library/react'
import { Avatar } from '..'

describe('Avatar', () => {
  it('should render properly with default props and match snapshot', () => {
    const { asFragment } = render(<Avatar>Default Avatar</Avatar>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render properly with specified props and match snapshot', () => {
    const { asFragment } = render(
      <Avatar shape="square" size="small" intent="primary">
        Circle Avatar
      </Avatar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
