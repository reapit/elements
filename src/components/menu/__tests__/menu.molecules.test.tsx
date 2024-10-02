import { fireEvent, render, screen } from '@testing-library/react'
import { Menu, useClickOutside } from '../menu.molecules'
import { useRef } from 'react'

describe('Menu component', () => {
  it('should render Menu and match snapshot', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.List>
          <Menu.Group title="Group Title">
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
          </Menu.Group>
        </Menu.List>
      </Menu>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('Menu Trigger component', () => {
  it('should render Trigger and match snapshot', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
      </Menu>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('Menu Popover component', () => {
  it('should render Popover when open and match snapshot', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
        <Menu.Popover>
          <div>Popover Content</div>
        </Menu.Popover>
      </Menu>,
    )

    fireEvent.click(screen.getByText('Trigger'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should close the Popover when button inside popover clicked and match snapshot', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
        <Menu.Popover>
          <div>Popover Content</div>
          <button type="button">Close</button>
        </Menu.Popover>
      </Menu>,
    )

    fireEvent.click(screen.getByText('Trigger'))
    fireEvent.click(screen.getByText('Close'))
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('Menu Item component', () => {
  it('should render Menu Item and match snapshot', () => {
    const { asFragment } = render(<Menu.Item>Menu Item</Menu.Item>)
    expect(asFragment()).toMatchSnapshot()
  })
})

const TestComponent = ({ onClickOutside }: { onClickOutside: VoidFunction }) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref as any, onClickOutside)

  return <div ref={ref}>Inside Element</div>
}

describe('useClickOutside', () => {
  it('should call onClickOutside when clicking outside the element', () => {
    const onClickOutside = jest.fn()

    const { getByText } = render(
      <>
        <TestComponent onClickOutside={onClickOutside} />
        <div>Outside Element</div>
      </>,
    )

    fireEvent.mouseDown(getByText('Outside Element'))

    expect(onClickOutside).toHaveBeenCalledTimes(1)
  })

  it('should not call onClickOutside when clicking inside the element', () => {
    const onClickOutside = jest.fn()

    const { getByText } = render(
      <>
        <TestComponent onClickOutside={onClickOutside} />
        <div>Outside Element</div>
      </>,
    )

    fireEvent.mouseDown(getByText('Inside Element'))

    expect(onClickOutside).not.toHaveBeenCalled()
  })
})
