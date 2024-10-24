import { fireEvent, render } from '@testing-library/react'
import { Menu } from '../menu'

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
