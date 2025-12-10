import { handleBlurEvent } from '../handle-blur-event'
import { render, screen } from '@testing-library/react'
import type { FocusEvent } from 'react'

test('sets listbox tabIndex to 0 when blur moves outside the listbox', () => {
  render(<TestListbox />)

  const listbox = screen.getByRole('listbox')
  const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

  // Simulate listbox having been removed from tab sequence
  listbox.tabIndex = -1

  const event = createBlurEvent({
    currentTarget: listbox,
    target: listbox,
    relatedTarget: outsideButton,
  })

  handleBlurEvent(event)

  expect(listbox.tabIndex).toBe(0)
})

test('does not change tabIndex when blur moves between elements within the listbox', () => {
  render(<TestListbox />)

  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'Option 1' })
  const option2 = screen.getByRole('option', { name: 'Option 2' })

  listbox.tabIndex = -1

  const event = createBlurEvent({
    currentTarget: listbox,
    target: option1,
    relatedTarget: option2,
  })

  handleBlurEvent(event)

  expect(listbox.tabIndex).toBe(-1)
})

test('dispatches focusout event on select when blur moves outside (trusted event)', () => {
  render(<TestListbox />)

  const listbox = screen.getByRole('listbox')
  const outsideButton = screen.getByRole('button', { name: 'Outside Button' })
  const selectElement = listbox.querySelector('select') as HTMLSelectElement

  // Listen for the focusout event
  const focusoutListener = vi.fn()
  selectElement.addEventListener('focusout', focusoutListener)

  // Simulate listbox having been removed from tab sequence
  listbox.tabIndex = -1

  const event = createBlurEvent({
    currentTarget: listbox,
    target: listbox,
    relatedTarget: outsideButton,
    isTrusted: true,
  })

  handleBlurEvent(event)

  expect(focusoutListener).toHaveBeenCalledTimes(1)
  expect(focusoutListener).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'focusout',
      bubbles: true,
      cancelable: true,
      relatedTarget: outsideButton,
    }),
  )
})

test('does not dispatch focusout event on select when event is not trusted', () => {
  render(<TestListbox />)

  const listbox = screen.getByRole('listbox')
  const outsideButton = screen.getByRole('button', { name: 'Outside Button' })
  const selectElement = listbox.querySelector('select') as HTMLSelectElement

  // Listen for the focusout event
  const focusoutListener = vi.fn()
  selectElement.addEventListener('focusout', focusoutListener)

  // Simulate listbox having been removed from tab sequence
  listbox.tabIndex = -1

  const event = createBlurEvent({
    currentTarget: listbox,
    target: listbox,
    relatedTarget: outsideButton,
    isTrusted: false,
  })

  handleBlurEvent(event)

  expect(focusoutListener).not.toHaveBeenCalled()
})

test('does not dispatch focusout event when blur stays within listbox', () => {
  render(<TestListbox />)

  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'Option 1' })
  const option2 = screen.getByRole('option', { name: 'Option 2' })
  const selectElement = listbox.querySelector('select') as HTMLSelectElement

  // Listen for the focusout event
  const focusoutListener = vi.fn()
  selectElement.addEventListener('focusout', focusoutListener)

  listbox.tabIndex = -1

  const event = createBlurEvent({
    currentTarget: listbox,
    target: option1,
    relatedTarget: option2,
    isTrusted: true,
  })

  handleBlurEvent(event)

  expect(focusoutListener).not.toHaveBeenCalled()
})

/**
 * Test component that renders a listbox with options
 */
function TestListbox() {
  return (
    <>
      <div role="listbox" tabIndex={0}>
        <select style={{ display: 'none' }}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <button role="option" tabIndex={-1}>
          Option 1
        </button>
        <button role="option" tabIndex={-1}>
          Option 2
        </button>
        <button role="option" tabIndex={-1}>
          Option 3
        </button>
      </div>
      <button>Outside Button</button>
    </>
  )
}

/**
 * Helper function to create a mock BlurEvent
 */
function createBlurEvent({
  currentTarget,
  target,
  relatedTarget,
  isTrusted = false,
}: {
  currentTarget: HTMLElement
  target: EventTarget
  relatedTarget: EventTarget | null
  isTrusted?: boolean
}): FocusEvent<HTMLElement> {
  return {
    currentTarget,
    target,
    relatedTarget,
    type: 'blur',
    isTrusted,
  } as FocusEvent<HTMLElement>
}
