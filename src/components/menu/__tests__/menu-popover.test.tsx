import { fireEvent, render } from '@testing-library/react'
import { Menu } from '../menu'
import { calculatePopoverPosition } from '../menu-popover'

describe('Menu Popover component', () => {
  const MockMenuPopoverComponent = () => {
    return (
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Item>Menu Item</Menu.Item>
            <Menu.Item closeMenu={false}>Non closing Menu Item</Menu.Item>
          </Menu.List>
        </Menu.Popover>
      </Menu>
    )
  }

  it('should render and close Popover based on any element with data-close-menu="true" click and match snapshot', () => {
    const { asFragment, getByText } = render(<MockMenuPopoverComponent />)

    fireEvent.click(getByText('Trigger'))
    const openedMenu = asFragment()
    expect(openedMenu).toMatchSnapshot()

    fireEvent.click(getByText('Menu Item'))
    const closedMenu = asFragment()
    expect(closedMenu).toMatchSnapshot()

    fireEvent.click(getByText('Trigger'))
    fireEvent.click(getByText('Non closing Menu Item'))
    expect(asFragment()).toEqual(openedMenu)
  })

  describe('calculatePopoverPosition', () => {
    let container
    let popover
    let mockSetPopoverStyle

    beforeEach(() => {
      container = document.createElement('div')
      container.innerHTML = '<button role="button">Trigger</button>'
      popover = document.createElement('div')
      popover.getBoundingClientRect = jest.fn(() => ({ height: 100 }))
      mockSetPopoverStyle = jest.fn()
    })

    it('should set popover position below the button if there is enough space', () => {
      const triggerBtn = container.querySelector('[role="button"]')
      triggerBtn.getBoundingClientRect = jest.fn(() => ({
        height: 50,
        bottom: 200,
      }))

      window.innerHeight = 400
      calculatePopoverPosition(container, popover, mockSetPopoverStyle)

      expect(mockSetPopoverStyle).toHaveBeenCalledWith({ top: 50 })
    })

    it('should set popover position above the button if there is not enough space below', () => {
      const triggerBtn = container.querySelector('[role="button"]')
      triggerBtn.getBoundingClientRect = jest.fn(() => ({
        height: 50,
        bottom: 380,
      }))

      window.innerHeight = 400
      calculatePopoverPosition(container, popover, mockSetPopoverStyle)

      expect(mockSetPopoverStyle).toHaveBeenCalledWith({ top: -100 })
    })

    it('should not set position if trigger button is not found', () => {
      container.innerHTML = ''
      calculatePopoverPosition(container, popover, mockSetPopoverStyle)
      expect(mockSetPopoverStyle).not.toHaveBeenCalled()
    })
  })
})
