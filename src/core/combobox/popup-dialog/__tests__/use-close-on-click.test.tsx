import { closeComboboxPopup } from '../close-popup'
import { fireEvent, render, screen } from '@testing-library/react'
import { useCloseComboboxPopupOnClick } from '../use-close-on-click'

import type { MouseEventHandler } from 'react'

vi.mock('../close-popup')

beforeEach(() => {
  if (!('isTrusted' in MouseEvent.prototype)) {
    Object.defineProperty(MouseEvent.prototype, 'isTrusted', { value: true })
  }
})

test('calls the provided onClick handler', () => {
  const onClick = vi.fn()
  render(<TestComponent onClick={onClick} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(onClick).toHaveBeenCalled()
})

test('respects preventDefault from option click handler', () => {
  render(<TestComponent />)

  const element = screen.getByRole('option', { name: 'Item that prevents default' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('respects preventDefault from consumer onClick handler', () => {
  const onClick = vi.fn((event) => event.preventDefault())
  render(<TestComponent onClick={onClick} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('ignores clicks on non-option elements', () => {
  render(<TestComponent />)

  const element = screen.getByTestId('non-option-element')
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('ignores invalid closeOnSelection values', () => {
  // @ts-expect-error -- we're deliberately testing an invalid value to
  // simulate an invalid value being in the DOM.
  render(<TestComponent closeOnSelection="invalid" />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('closeOnSelection "never" prevents popup close on option click', () => {
  render(<TestComponent closeOnSelection="never" />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('closeOnSelection "never" prevents popup close on option descendant click', () => {
  render(<TestComponent closeOnSelection="never" />)

  const element = screen.getByTestId('item-2-inner-span')
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('closeOnSelection "always" closes popup for single-select listbox', async () => {
  render(<TestComponent closeOnSelection="always" multiSelectable={false} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).toHaveBeenCalled()
})

test('closeOnSelection "always" closes popup for multi-select listbox', () => {
  render(<TestComponent closeOnSelection="always" multiSelectable={true} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).toHaveBeenCalled()
})

test('closeOnSelection "always" closes popup on option descendant click', () => {
  render(<TestComponent closeOnSelection="always" />)

  const element = screen.getByTestId('item-2-inner-span')
  fireEvent.click(element)

  expect(closeComboboxPopup).toHaveBeenCalled()
})

test('closeOnSelection "always" closes popup without listbox element', () => {
  render(<TestComponent closeOnSelection="always" includeListboxId={false} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).toHaveBeenCalled()
})

test('closeOnSelection "auto" closes popup for single-select listbox', () => {
  render(<TestComponent closeOnSelection="auto" multiSelectable={false} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).toHaveBeenCalled()
})

test('closeOnSelection "auto" prevents close for multi-select listbox', () => {
  render(<TestComponent closeOnSelection="auto" multiSelectable={true} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('closeOnSelection "auto" closes popup on option descendant click in single-select listbox', () => {
  render(<TestComponent closeOnSelection="auto" multiSelectable={false} />)

  const element = screen.getByTestId('item-2-inner-span')
  fireEvent.click(element)

  expect(closeComboboxPopup).toHaveBeenCalled()
})

test('closeOnSelection "auto" prevents close without listbox element', () => {
  render(<TestComponent closeOnSelection="auto" includeListboxId={false} />)

  const element = screen.getByRole('option', { name: 'Item 1' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

test('closeOnSelection "auto" prevents close without listboxId in option dataset', () => {
  render(<TestComponent closeOnSelection="auto" multiSelectable={false} />)

  const element = screen.getByRole('option', { name: 'Item without listbox ID' })
  fireEvent.click(element)

  expect(closeComboboxPopup).not.toHaveBeenCalled()
})

interface TestComponentProps {
  closeOnSelection?: 'always' | 'never' | 'auto'
  includeListboxId?: boolean
  multiSelectable?: boolean
  onClick?: MouseEventHandler<HTMLDialogElement>
}

function TestComponent({
  closeOnSelection = 'auto',
  includeListboxId = true,
  multiSelectable = false,
  onClick,
}: TestComponentProps) {
  const handleClick = useCloseComboboxPopupOnClick(onClick)

  return (
    <dialog data-close-on-selection={closeOnSelection} data-testid="test-dialog" onClick={handleClick} open>
      <div aria-multiselectable={multiSelectable} data-testid="listbox" id="test-listbox" role="listbox">
        <div data-listbox-id={includeListboxId ? 'test-listbox' : undefined} role="option">
          Item 1
        </div>
        <div data-listbox-id={includeListboxId ? 'test-listbox' : undefined} role="option">
          <span data-testid="item-2-inner-span">Item 2</span>
        </div>
        <div
          data-listbox-id={includeListboxId ? 'test-listbox' : undefined}
          onClick={(event) => event.preventDefault()}
          role="option"
        >
          Item that prevents default
        </div>
        <div role="option">Item without listbox ID</div>
      </div>
      <div data-testid="non-option-element">Not an option</div>
    </dialog>
  )
}
