import { fireEvent, render, screen } from '@testing-library/react'
import { handlePopoverPosition, Menu } from '../menu.molecules'
import { useRef } from 'react'

describe('Menu component', () => {
  it('should render Menu and match snapshot', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.List>
          <Menu.Group title="Radio Title">
            <Menu.RadioItem checked>Item 1</Menu.RadioItem>
            <Menu.RadioItem>Item 1</Menu.RadioItem>
          </Menu.Group>
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
  const MockMenuPopoverComponent = () => {
    const ref = useRef(null)
    return (
      <div ref={ref}>
        <Menu>
          <Menu.Trigger>{({ getTriggerProps }) => <button {...getTriggerProps()}>Trigger</button>}</Menu.Trigger>
          <Menu.Popover containerRef={ref}>
            <div>Popover Content</div>
            <button type="button">Close</button>
          </Menu.Popover>
        </Menu>
      </div>
    )
  }

  it('should render Popover when open and match snapshot', () => {
    const { asFragment } = render(<MockMenuPopoverComponent />)

    fireEvent.click(screen.getByText('Trigger'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should close the Popover when button inside popover clicked and match snapshot', () => {
    const { asFragment } = render(<MockMenuPopoverComponent />)

    fireEvent.click(screen.getByText('Trigger'))
    fireEvent.click(screen.getByText('Close'))
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('handlePopoverPosition', () => {
  let ref
  let getTriggerProps
  let getPopoverProps
  let setPopoverStyle
  let isOpen

  beforeEach(() => {
    ref = {
      current: document.createElement('div'),
    }

    const triggerBtn = document.createElement('button')
    triggerBtn.className = 'trigger-btn'
    ref.current.appendChild(triggerBtn)

    const popover = document.createElement('div')
    popover.className = 'popover'
    ref.current.appendChild(popover)

    getTriggerProps = () => ({ className: 'trigger-btn' })
    getPopoverProps = () => ({ className: 'popover' })
    setPopoverStyle = jest.fn()
    isOpen = true
  })

  it('sets popover position below the trigger button if space is available', () => {
    const triggerBtn = ref.current.querySelector('.trigger-btn')
    const popover = ref.current.querySelector('.popover')

    jest.spyOn(triggerBtn, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 150,
      height: 50,
      width: 100,
    } as DOMRect)

    jest.spyOn(popover, 'getBoundingClientRect').mockReturnValue({
      height: 200,
      width: 100,
    } as DOMRect)

    window.innerHeight = 600

    const repositionPopover = handlePopoverPosition(ref, isOpen, getTriggerProps, getPopoverProps, setPopoverStyle)
    repositionPopover()

    expect(setPopoverStyle).toHaveBeenCalledWith({ top: 53 }) // Button height (50) + gap (3)
  })

  it('sets popover position above the trigger button if there is not enough space below', () => {
    const triggerBtn = ref.current.querySelector('.trigger-btn')
    const popover = ref.current.querySelector('.popover')

    jest.spyOn(triggerBtn, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 150,
      height: 50,
      width: 100,
    } as DOMRect)

    jest.spyOn(popover, 'getBoundingClientRect').mockReturnValue({
      height: 500,
      width: 100,
    } as DOMRect)

    window.innerHeight = 400

    const repositionPopover = handlePopoverPosition(ref, isOpen, getTriggerProps, getPopoverProps, setPopoverStyle)
    repositionPopover()

    expect(setPopoverStyle).toHaveBeenCalledWith({ top: -503 }) // -Popover height (500) - gap (3)
  })

  it('does nothing if isOpen is false', () => {
    isOpen = false

    const repositionPopover = handlePopoverPosition(ref, isOpen, getTriggerProps, getPopoverProps, setPopoverStyle)
    repositionPopover()

    expect(setPopoverStyle).not.toHaveBeenCalled()
  })

  it('does nothing if ref.current is null', () => {
    ref.current = null

    const repositionPopover = handlePopoverPosition(ref, isOpen, getTriggerProps, getPopoverProps, setPopoverStyle)
    repositionPopover()

    expect(setPopoverStyle).not.toHaveBeenCalled()
  })
})
