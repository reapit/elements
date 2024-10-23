import { fireEvent, render } from '@testing-library/react'
import { Menu } from '../menu'

describe('Menu Popover component', () => {
  const MockMenuPopoverComponent = () => {
    return (
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
        <Menu.Popover>
          <div>Popover Content</div>
          <button type="button">Close with button</button>
          <div role="button">Close with div</div>
        </Menu.Popover>
      </Menu>
    )
  }

  it('should render and close Popover based on button or any element with role=button click and match snapshot', () => {
    const { asFragment, getByText } = render(<MockMenuPopoverComponent />)

    fireEvent.click(getByText('Trigger'))
    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(getByText('Close with button'))
    const closedMenu = asFragment()
    expect(closedMenu).toMatchSnapshot()

    fireEvent.click(getByText('Trigger'))
    fireEvent.click(getByText('Close with div'))
    expect(asFragment()).toEqual(closedMenu)
  })
})
