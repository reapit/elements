import { render } from '@testing-library/react'
import { DeprecatedLabel } from '..'

describe('DeprecatedLabel component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedLabel />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
