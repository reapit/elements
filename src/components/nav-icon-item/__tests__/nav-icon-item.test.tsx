import { render } from '@testing-library/react'
import { NavIconItem } from '../nav-icon-item'

describe('NavIconItem', () => {
  it('should render the component as HTMLAnchorElement', () => {
    expect(render(<NavIconItem href="#" icon={<span>test</span>} />).asFragment()).toMatchSnapshot()
  })

  it('should render the component as HTMLButtonElement', () => {
    expect(render(<NavIconItem onClick={() => {}} icon={<span>test</span>} />).asFragment()).toMatchSnapshot()
  })
})
