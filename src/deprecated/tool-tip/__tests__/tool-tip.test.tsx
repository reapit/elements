import { render } from '@testing-library/react'
import { DeprecatedToolTip } from '../tool-tip'

describe('DeprecatedToolTip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <DeprecatedToolTip tip="hello there" defaultActive>
        Hover here
      </DeprecatedToolTip>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
