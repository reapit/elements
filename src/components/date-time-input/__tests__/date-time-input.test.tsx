import { render } from '@testing-library/react'
import { DateTimeInput } from '..'

describe('DateTimeInput component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DateTimeInput />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
