import { render } from '@testing-library/react'
import { DeprecatedSelect } from '..'

describe('Select component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedSelect />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
