import { fireEvent, render, screen } from '@testing-library/react'
import { handleItemClick, handleOutsideClick, MenuButton } from '..'
import { MenuItemProps } from '../../menu/types'

describe('MenuButton', () => {
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

  it('should render the button with the correct label', () => {
    const { asFragment } = render(<MenuButton menuGroups={[]} label="MenuButton label" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render properly using menuGroups, optional icon, intent and hasBorder props', () => {
    const { asFragment } = render(
      <MenuButton menuGroups={menuGroups} icon="add" intent="primary" hasBorder label="MenuButton label" />,
    )

    const button = screen.getByText('MenuButton label')
    fireEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('handleOutsideClick', () => {
  let setIsExpanded: jest.Mock
  let mockHandleOutsideClick: (event: MouseEvent) => void

  beforeEach(() => {
    setIsExpanded = jest.fn()
    mockHandleOutsideClick = handleOutsideClick(setIsExpanded)
  })

  it('should collapse the menu if clicked outside the menu and toggler', () => {
    const mockEvent = {
      target: document.createElement('div'),
    } as unknown as MouseEvent

    mockHandleOutsideClick(mockEvent)

    expect(setIsExpanded).toHaveBeenCalledWith(false)
  })

  it('should not collapse the menu if clicked on the menu button toggler', () => {
    const togglerElement = document.createElement('div')
    togglerElement.id = 'menu-button-toggler'
    const mockEvent = {
      target: togglerElement,
    } as unknown as MouseEvent

    mockHandleOutsideClick(mockEvent)

    expect(setIsExpanded).not.toHaveBeenCalled()
  })

  it('should not collapse the menu if clicked on the menu', () => {
    const menuElement = document.createElement('div')
    menuElement.id = 'menu-button-menu'
    const mockEvent = {
      target: menuElement,
    } as unknown as MouseEvent

    mockHandleOutsideClick(mockEvent)

    expect(setIsExpanded).not.toHaveBeenCalled()
  })
})

describe('handleItemClick', () => {
  const setIsExpanded = jest.fn()
  const mockItemButtonClickHandler = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should set isExpanded to false and call the onClick prop of the item if it is defined', () => {
    handleItemClick(setIsExpanded, { onClick: mockItemButtonClickHandler } as MenuItemProps)()

    expect(setIsExpanded).toHaveBeenCalledWith(false)
    expect(setIsExpanded).toHaveBeenCalledTimes(1)
    expect(mockItemButtonClickHandler).toHaveBeenCalledTimes(1)
  })

  it('should not call the onClick prop of the item if it is not defined', () => {
    handleItemClick(setIsExpanded, {} as MenuItemProps)()

    expect(mockItemButtonClickHandler).not.toHaveBeenCalled()
  })
})
