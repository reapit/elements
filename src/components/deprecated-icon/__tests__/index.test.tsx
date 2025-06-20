import { render } from '@testing-library/react'
import { DeprecatedIcon } from '..'

describe('Icon component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedIcon icon="add" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when intent prop is supplied', () => {
    const wrapper = render(<DeprecatedIcon icon="add" intent="primary" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
