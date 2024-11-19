import { render } from '@testing-library/react'
import { Tab, TabsFooter, TabsItem, TabsLabel, TabsOptionsWrap, TabsWrap } from '../tabs.atoms'

describe('Tab', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(<Tab className="foo" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('Tab', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(<Tab className="foo" />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TabsWrap', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <TabsWrap className="foo">
        <div>Child</div>
      </TabsWrap>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TabsLabel', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <TabsLabel className="foo">
        <div>Child</div>
      </TabsLabel>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TabsFooter', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <TabsFooter className="foo">
        <div>Child</div>
      </TabsFooter>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TabsOptionsWrap', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <TabsOptionsWrap className="foo">
        <div>Child</div>
      </TabsOptionsWrap>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('TabsItem', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <TabsItem className="foo">
        <div>Child</div>
      </TabsItem>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
