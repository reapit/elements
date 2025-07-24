import { render } from '@testing-library/react'
import { DeprecatedMenuItem } from '../menu.molecules'

describe('MenuItem component', () => {
  it('should render with required props and match snapshot', () => {
    const { asFragment } = render(<DeprecatedMenuItem label="Test Menu Item" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with complete features enabled and match snapshot', () => {
    const { asFragment } = render(
      <DeprecatedMenuItem
        label="Test Menu Item"
        supplementaryInfo="Test Supplementary Info"
        badge={<span>badge</span>}
        leftIcon={<span>Left Icon</span>}
        rightIcon={<span>Right Icon</span>}
        closeMenu={false}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
