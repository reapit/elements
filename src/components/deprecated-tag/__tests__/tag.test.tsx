import { render } from '@testing-library/react'
import { DeprecatedTag, DeprecatedTagGroup } from '..'

describe('Tag component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedTag>Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="primary">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="neutral">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="danger">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="success">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="warning">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="pending">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<DeprecatedTag intent="default">Some Content</DeprecatedTag>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TagGroup component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <DeprecatedTagGroup>
        <DeprecatedTag intent="default">Some Content</DeprecatedTag>
        <DeprecatedTag intent="primary">Some Content</DeprecatedTag>
      </DeprecatedTagGroup>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
