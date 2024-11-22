import { render } from '@testing-library/react'
import { StatusIndicator } from '..'

describe('StatusIndicator component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="primary" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="pending" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="danger" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="success" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="warning" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="neutral" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="default" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
