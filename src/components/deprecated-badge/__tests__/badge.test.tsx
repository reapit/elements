import { render } from '@testing-library/react'
import { DeprecatedBadge, DeprecatedBadgeGroup } from '..'

describe('DeprecatedBadge component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedBadge>50%</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="primary">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="neutral">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="danger">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="success">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="warning">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="pending">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedBadge intent="default">Some Content</DeprecatedBadge>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedBadgeGroup component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <DeprecatedBadgeGroup>
        <DeprecatedBadge intent="default">Some Content</DeprecatedBadge>
        <DeprecatedBadge intent="primary">Some Content</DeprecatedBadge>
      </DeprecatedBadgeGroup>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
