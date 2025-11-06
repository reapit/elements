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

/**
 * Test component that renders a listbox with options
 */
function TestListbox() {
  return (
    <>
      <div role="listbox" tabIndex={0}>
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
}: {
  currentTarget: HTMLElement
  target: EventTarget
  relatedTarget: EventTarget | null
}): FocusEvent<HTMLElement> {
  return {
    currentTarget,
    target,
    relatedTarget,
    type: 'blur',
  } as FocusEvent<HTMLElement>
}
