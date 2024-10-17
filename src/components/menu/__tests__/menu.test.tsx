import { fireEvent, render, screen } from '@testing-library/react'
import { Menu } from '../menu'
import { useRef } from 'react'

const renderMenu = (content) =>
  render(
    <Menu>
      <Menu.List>
        <Menu.Group title="Group Title">{content}</Menu.Group>
      </Menu.List>
    </Menu>,
  )

describe('Menu components', () => {
  it('should render Menu and Trigger components and match snapshots', () => {
    const { asFragment } = renderMenu(
      <>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('Menu Popover component', () => {
  const MockMenuPopoverComponent = () => {
    const ref = useRef(null)
    return (
      <div ref={ref}>
        <Menu>
          <Menu.Trigger>{({ triggerProps }) => <button {...triggerProps}>Trigger</button>}</Menu.Trigger>
          <Menu.Popover containerRef={ref}>
            <div>Popover Content</div>
            <button type="button">Close</button>
          </Menu.Popover>
        </Menu>
      </div>
    )
  }

  it('should render and close Popover based on button clicks and match snapshot', () => {
    const { asFragment } = render(<MockMenuPopoverComponent />)

    fireEvent.click(screen.getByText('Trigger'))
    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText('Close'))
    expect(asFragment()).toMatchSnapshot()
  })
})
