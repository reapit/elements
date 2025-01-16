import { render } from '@testing-library/react'
import { Label } from '..'

describe('Label component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Label />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot if it required', () => {
    const wrapper = render(<Label isRequired />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
