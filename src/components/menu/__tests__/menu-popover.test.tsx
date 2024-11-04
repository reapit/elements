import { fireEvent, render } from '@testing-library/react'
import { Menu } from '../menu'
import { menuButtonHandler, menuItemHandler } from '../menu-popover'

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
})

describe('keyboard interaction handler', () => {
  const menuItems = [
    {
      focus: jest.fn(),
      click: jest.fn(),
    },
    {
      focus: jest.fn(),
      click: jest.fn(),
    },
    {
      focus: jest.fn(),
      click: jest.fn(),
    },
  ] as any as NodeListOf<HTMLElement>

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('menuButtonHandler', () => {
    it('should focus the first menu item when ArrowDown is pressed', () => {
      menuButtonHandler(menuItems)(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      expect(menuItems[0].focus).toHaveBeenCalled()
    })

    it('should not focus any item if there are no menu items', () => {
      const emptyMenuItems = []
      menuButtonHandler(emptyMenuItems as any)(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      expect(menuItems[0].focus).not.toHaveBeenCalled()
    })
  })

  describe('menuItemHandler', () => {
    const closeMenu = jest.fn()
    const menuButton = {
      focus: jest.fn(),
    } as any as HTMLButtonElement

    it('should focus the next item or 1st item if the last item reached on ArrowDown key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      menuItemHandler(menuButton, menuItems, 0, closeMenu)(event)
      expect(menuItems[1].focus).toHaveBeenCalled()
      menuItemHandler(menuButton, menuItems, 2, closeMenu)(event)
      // focus back to first item
      expect(menuItems[0].focus).toHaveBeenCalled()
    })

    it('should focus the previous item or last item if at first item on ArrowUp key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      menuItemHandler(menuButton, menuItems, 1, closeMenu)(event)
      expect(menuItems[0].focus).toHaveBeenCalled()
      // focus to last item
      menuItemHandler(menuButton, menuItems, 0, closeMenu)(event)
      expect(menuItems[2].focus).toHaveBeenCalled()
    })

    it('should close the menu on Escape key press', () => {
      menuItemHandler(menuButton, menuItems, 0, closeMenu)(new KeyboardEvent('keydown', { key: 'Escape' }))
      expect(closeMenu).toHaveBeenCalled()
      expect(menuButton.focus).toHaveBeenCalled()
    })

    it('should click the item on Enter or Space key press', () => {
      let event = new KeyboardEvent('keydown', { key: 'Enter' })
      const handler = menuItemHandler(menuButton, menuItems, 0, closeMenu)
      handler(event)
      expect(menuItems[0].click).toHaveBeenCalled()

      event = new KeyboardEvent('keydown', { key: ' ' })
      handler(event)
      expect(menuItems[0].click).toHaveBeenCalled()
    })
  })
})
