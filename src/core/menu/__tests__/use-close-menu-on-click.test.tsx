import { fireEvent, render, screen } from '@testing-library/react'
import { useCloseMenuOnClick } from '../use-close-menu-on-click'

import type { MouseEventHandler } from 'react'

test('calls hidePopover by default for menuitem click events', () => {
  const hidePopover = vi.fn()
  render(<TestComponent hidePopover={hidePopover} />)

  const element = screen.getByRole('menuitem', { name: 'Item 1' })
  fireEvent.click(element)

  expect(hidePopover).toHaveBeenCalled()
})

test('calls hidePopover by default for menuitem descendant click events', () => {
  const hidePopover = vi.fn()
  render(<TestComponent hidePopover={hidePopover} />)

  const element = screen.getByTestId('item-2-inner-span')
  fireEvent.click(element)

  expect(hidePopover).toHaveBeenCalled()
})

test('always calls onClick handler when provided', () => {
  const onClick = vi.fn()
  const hidePopover = vi.fn()
  render(<TestComponent hidePopover={hidePopover} onClick={onClick} />)

  const element = screen.getByRole('menuitem', { name: 'Item 1' })
  fireEvent.click(element)

  expect(onClick).toHaveBeenCalled()
})

test('does not call hidePopover when default action has been prevented by a menu item', () => {
  const hidePopover = vi.fn()
  render(<TestComponent hidePopover={hidePopover} />)

  const element = screen.getByRole('menuitem', { name: 'Item that will not close the menu' })
  fireEvent.click(element)

  expect(hidePopover).not.toHaveBeenCalled()
})

test('does not call hidePopover when default action has been prevented by the consumer onClick', () => {
  const onClick = vi.fn((event) => event.preventDefault())
  const hidePopover = vi.fn()
  render(<TestComponent hidePopover={hidePopover} onClick={onClick} />)

  const element = screen.getByRole('menuitem', { name: 'Item 1' })
  fireEvent.click(element)

  expect(hidePopover).not.toHaveBeenCalled()
})

test('does not call hidePopover when event target is not a menu item or menu item descendant', () => {
  const hidePopover = vi.fn()
  render(<TestComponent hidePopover={hidePopover} />)

  const element = screen.getByTestId('test-div')
  fireEvent.click(element)

  expect(hidePopover).not.toHaveBeenCalled()
})

interface TestComponentProps {
  onClick?: MouseEventHandler<HTMLDivElement>
  hidePopover?: () => void
}

function TestComponent({ onClick, hidePopover }: TestComponentProps) {
  const handleClick = useCloseMenuOnClick(onClick)

  // TODO: When Happy DOM supports the Popover API, we can remove this mock
  const divRef = (element: HTMLDivElement | null) => {
    if (element && hidePopover) {
      element.hidePopover = hidePopover
    }
  }

  return (
    // @ts-expect-error -- React 18 does not have types for the popover attributes.
    <div popover="auto" ref={divRef} onClick={handleClick} data-testid="test-div">
      <div role="menuitem">Item 1</div>
      <div role="menuitem">
        <span data-testid="item-2-inner-span">Item 2</span>
      </div>
      <div role="menuitem" onClick={(event) => event.preventDefault()}>
        Item that will not close the menu
      </div>
    </div>
  )
}
