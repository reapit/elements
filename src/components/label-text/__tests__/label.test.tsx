import { render } from '@testing-library/react'
import { LabelText } from '..'

describe('Label component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<LabelText />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot if it required', () => {
    const wrapper = render(<LabelText isRequired />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
