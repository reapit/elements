import { render } from '@testing-library/react'
import { DeprecatedStatusIndicator } from '..'

describe('DeprecatedStatusIndicator component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="primary" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="pending" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="danger" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="success" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="warning" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="neutral" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedStatusIndicator intent="default" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
