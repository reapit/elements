import { render } from '@testing-library/react'
import { TextInput } from '..'

describe('TextInput component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<TextInput type="text" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
