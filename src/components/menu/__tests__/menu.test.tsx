import { render } from '@testing-library/react'
import { Menu, MenuItem, MenuItemGroupTitle } from '..'

describe('MenuItem', () => {
  it('renders a regular link correctly', () => {
    const { asFragment } = render(
      <MenuItem href="https://example.com" intent="secondary">
        External Link
      </MenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders a button correctly', () => {
    const handleClick = jest.fn()
    const { asFragment } = render(
      <MenuItem onClick={handleClick} intent="critical">
        Click Me
      </MenuItem>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('Menu and MenuItem components render correctly', () => {
  describe('Menu with react shorthand', () => {
    const groups = [
      {
        title: 'Group 1',
        items: [
          { label: 'Item 1', href: '/item1' },
          { label: 'Item 2', href: '/item2' },
        ],
      },
      {
        items: [
          { label: 'Item 3', href: '/item3' },
          { label: 'Item 4', href: '/item4' },
        ],
      },
    ]

    it('renders a menu with multiple groups correctly', () => {
      const { asFragment } = render(<Menu groups={groups} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  it('renders Menu correctly', () => {
    const { asFragment } = render(<Menu>Menu content</Menu>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders MenuItemGroupTitle correctly', () => {
    const { asFragment } = render(<MenuItemGroupTitle>Group title content</MenuItemGroupTitle>)
    expect(asFragment()).toMatchSnapshot()
  })
})
