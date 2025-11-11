import { fireEvent, render, screen } from '@testing-library/react'
import { useCloseComboboxPopupOnClick } from '../use-close-on-click'
import { hideComboboxPopup } from '../hide-popup'

import type { MouseEventHandler } from 'react'

vi.mock('../hide-popup')

// NOTE: useCloseOnClick does not respond to untrusted events, which is what fireEvent.click results
// in. This means we're can't verify this test case outside of a real browser.
test.skip('calls hidePopup by default for option click events', () => {
  render(<TestComponent />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(hideComboboxPopup).toHaveBeenCalled()
})

// NOTE: useCloseOnClick does not respond to untrusted events, which is what fireEvent.click results
// in. This means we're can't verify this test case outside of a real browser.
test.skip('calls hidePopup by default for option descendant click events', () => {
  render(<TestComponent />)

  const element = screen.getByTestId('item-2-inner-span')
  fireEvent.click(element)

  expect(hideComboboxPopup).toHaveBeenCalled()
})

test('always calls onClick handler when provided', () => {
  const onClick = vi.fn()
  render(<TestComponent onClick={onClick} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(onClick).toHaveBeenCalled()
})

test('does not call hidePopup when default action has been prevented by an option', () => {
  render(<TestComponent />)

  const element = screen.getByRole('option', { name: 'Item that will not close the listbox' })
  fireEvent.click(element)

  expect(hideComboboxPopup).not.toHaveBeenCalled()
})

test('does not call hidePopup when default action has been prevented by the consumer onClick', () => {
  const onClick = vi.fn((event) => event.preventDefault())
  render(<TestComponent onClick={onClick} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(hideComboboxPopup).not.toHaveBeenCalled()
})

test('does not call hidePopup when event target is not an option or option descendant', () => {
  render(<TestComponent />)

  const element = screen.getByTestId('test-div')
  fireEvent.click(element)

  expect(hideComboboxPopup).not.toHaveBeenCalled()
})

interface TestComponentProps {
  onClick?: MouseEventHandler<HTMLDivElement>
}

function TestComponent({ onClick }: TestComponentProps) {
  const handleClick = useCloseComboboxPopupOnClick(onClick)

  return (
    // @ts-expect-error - React 18 lacks popover attribute types
    <div popover="auto" onClick={handleClick} data-testid="test-div" role="listbox">
      <div role="option">Item 1</div>
      <div role="option">
        <span data-testid="item-2-inner-span">Item 2</span>
      </div>
      <div role="option" onClick={(event) => event.preventDefault()}>
        Item that will not close the listbox
      </div>
    </div>
  )
}
