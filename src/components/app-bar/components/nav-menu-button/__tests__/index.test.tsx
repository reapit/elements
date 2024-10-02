import { fireEvent, render, screen } from '@testing-library/react'
import { NavMenuButton, NavMenuButtonToggler } from '..'
import { IconNames } from '../../../../icon'

describe('NavMenuButton', () => {
  const mockOnClick = jest.fn()
  const menuGroups = [
    { title: 'Group title', items: [{ children: 'This is a Link 1', href: '/' }] },
    {
      title: 'Group title',
      items: [
        {
          children: 'This is a Button 1',
          onClick: mockOnClick,
        },
      ],
    },
  ]

  it('should render the button with the correct label and match snapshot', () => {
    const { asFragment } = render(<NavMenuButton menuGroups={[]} label="NavMenuButton label" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render properly using menuGroups, optional icon, top, and alignment props and match snapshot', () => {
    const { asFragment } = render(
      <NavMenuButton menuGroups={menuGroups} icon="add" alignment="right" label="NavMenuButton label" />,
    )

    const button = screen.getByText('NavMenuButton label')
    fireEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('NavMenuButtonToggler', () => {
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
