import { fireEvent, render } from '@testing-library/react'
import { Menu } from '../menu'

describe('Menu Popover component', () => {
  const MockMenuPopoverComponent = () => {
    return (
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
        <Menu.Popover>
          <div>Popover Content</div>
          <button type="button">Close</button>
        </Menu.Popover>
      </Menu>
    )
  }

  it('should render and close Popover based on button clicks and match snapshot', () => {
    const { asFragment, getByText } = render(<MockMenuPopoverComponent />)

    fireEvent.click(getByText('Trigger'))
    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(getByText('Close'))
    expect(asFragment()).toMatchSnapshot()
  })
})
