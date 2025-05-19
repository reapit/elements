import { render } from '@testing-library/react'
import { MenuItem } from '../menu.molecules'

describe('MenuItem component', () => {
  it('should render with required props and match snapshot', () => {
    const { asFragment } = render(<MenuItem label="Test Menu Item" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
