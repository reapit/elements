import { render } from '@testing-library/react'
import { NavMenuButtonToggler } from '..'
import { IconNames } from '../../../../icon'

describe.skip('NavMenuButtonToggler', () => {
  it('should render the label and icon correctly and match snapshot', () => {
    const props = {
      label: 'Menu',
      isExpanded: false,
      onClick: jest.fn(),
    }

    const { asFragment } = render(<NavMenuButtonToggler {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should display "chevronUp" and match snapshot', () => {
    const props = {
      label: 'Menu',
      isExpanded: true,
      onClick: jest.fn(),
    }

    const { asFragment } = render(<NavMenuButtonToggler {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should display a custom icon if provided and match snapshot', () => {
    const props = {
      label: 'Menu',
      isExpanded: false,
      icon: 'add' as IconNames,
      onClick: jest.fn(),
    }

    const { asFragment } = render(<NavMenuButtonToggler {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
