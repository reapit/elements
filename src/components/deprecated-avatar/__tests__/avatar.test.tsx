import { render } from '@testing-library/react'
import { DeprecatedAvatar } from '..'

describe('Avatar component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedAvatar>Some Content</DeprecatedAvatar>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for an image src', () => {
    const wrapper = render(<DeprecatedAvatar src="https://picsum.photos/200" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for an image type', () => {
    const wrapper = render(<DeprecatedAvatar type="image" src="https://picsum.photos/200" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
