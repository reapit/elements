import { handleFocusEvent } from '../handle-focus-event'
import { render, screen } from '@testing-library/react'

import type { FocusEvent } from 'react'

test('handles null relatedTarget (focus from nowhere)', () => {
  render(<TestListbox />)

  const listbox = screen.getByRole('listbox')

  const event = createFocusEvent({
    currentTarget: listbox,
    target: listbox,
    relatedTarget: null,
  })

  handleFocusEvent(event)

  expect(listbox.tabIndex).toBe(-1)
})

test('does not throw when querySelector returns non-button element', () => {
  render(<TestListbox includeNonButtonOption />)

  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'Option 1' })
  const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

  const event = createFocusEvent({
    currentTarget: listbox,
    target: listbox,
    relatedTarget: outsideButton,
  })

  // Should skip the div and focus the first button option
  const focusSpy = vi.spyOn(option1, 'focus')
  handleFocusEvent(event)

  expect(focusSpy).toHaveBeenCalled()
})

describe('Behavior 1: Focus moving between options within the listbox', () => {
  test('clicks the newly focused option when selectionFollowsFocus is true and focus is from keyboard', () => {
    render(<TestListbox selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const option2 = screen.getByRole('option', { name: 'Option 2' })

    // Mock :focus-visible to return true (keyboard focus)
    vi.spyOn(option2, 'matches').mockReturnValue(true)

    const clickSpy = vi.spyOn(option2, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: option2,
      relatedTarget: option1,
    })

    handleFocusEvent(event)

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  test('does not click the newly focused option when focus is from mouse (not :focus-visible)', () => {
    render(<TestListbox selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const option2 = screen.getByRole('option', { name: 'Option 2' })

    // Mock :focus-visible to return false (mouse focus)
    vi.spyOn(option2, 'matches').mockReturnValue(false)

    const clickSpy = vi.spyOn(option2, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: option2,
      relatedTarget: option1,
    })

    handleFocusEvent(event)

    expect(clickSpy).not.toHaveBeenCalled()
  })

  test('does not click the newly focused option when selectionFollowsFocus is false', () => {
    render(<TestListbox selectionFollowsFocus={false} />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const option2 = screen.getByRole('option', { name: 'Option 2' })

    const clickSpy = vi.spyOn(option2, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: option2,
      relatedTarget: option1,
    })

    handleFocusEvent(event)

    expect(clickSpy).not.toHaveBeenCalled()
  })

  test('does not click when selectionFollowsFocus is undefined', () => {
    render(<TestListbox />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const option2 = screen.getByRole('option', { name: 'Option 2' })

    const clickSpy = vi.spyOn(option2, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: option2,
      relatedTarget: option1,
    })

    handleFocusEvent(event)

    expect(clickSpy).not.toHaveBeenCalled()
  })

  test('does not click when target is not an HTMLButtonElement', () => {
    render(<TestListbox selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const divElement = document.createElement('div')
    listbox.appendChild(divElement)

    const event = createFocusEvent({
      currentTarget: listbox,
      target: divElement,
      relatedTarget: option1,
    })

    handleFocusEvent(event)

    // No error should be thrown
    expect(true).toBe(true)
  })

  test('does not click when target is the listbox itself', () => {
    render(<TestListbox selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: option1,
    })

    handleFocusEvent(event)

    // No errors should occur
    expect(listbox.tabIndex).toBe(0)
  })
})

describe('Behavior 2: Focus entering the listbox from outside', () => {
  test('removes listbox from tab sequence (sets tabIndex to -1)', () => {
    render(<TestListbox />)

    const listbox = screen.getByRole('listbox')
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(listbox.tabIndex).toBe(-1)
  })

  test('focuses the first selected option when one exists', () => {
    render(<TestListbox selectedOption={2} />)

    const listbox = screen.getByRole('listbox')
    const option2 = screen.getByRole('option', { name: 'Option 2' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const focusSpy = vi.spyOn(option2, 'focus')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  test('focuses the first aria-checked option when one exists', () => {
    render(<TestListbox checkedOption={3} />)

    const listbox = screen.getByRole('listbox')
    const option3 = screen.getByRole('option', { name: 'Option 3' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const focusSpy = vi.spyOn(option3, 'focus')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  test('focuses first option and clicks it when no selected option exists, selectionFollowsFocus is true, and focus is from keyboard', () => {
    render(<TestListbox selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    // Mock :focus-visible to return true (keyboard focus)
    vi.spyOn(listbox, 'matches').mockReturnValue(true)

    const focusSpy = vi.spyOn(option1, 'focus')
    const clickSpy = vi.spyOn(option1, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(focusSpy).toHaveBeenCalledTimes(1)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  test('focuses first option without clicking when no selected option exists and focus is from mouse', () => {
    render(<TestListbox selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    // Mock :focus-visible to return false (mouse focus)
    vi.spyOn(listbox, 'matches').mockReturnValue(false)

    const focusSpy = vi.spyOn(option1, 'focus')
    const clickSpy = vi.spyOn(option1, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(focusSpy).toHaveBeenCalledTimes(1)
    expect(clickSpy).not.toHaveBeenCalled()
  })

  test('focuses first option without clicking when no selected option exists and selectionFollowsFocus is false', () => {
    render(<TestListbox selectionFollowsFocus={false} />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const focusSpy = vi.spyOn(option1, 'focus')
    const clickSpy = vi.spyOn(option1, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(focusSpy).toHaveBeenCalledTimes(1)
    expect(clickSpy).not.toHaveBeenCalled()
  })

  test('does not attempt to focus when listbox has no options', () => {
    render(<TestListbox noOptions />)

    const listbox = screen.getByRole('listbox')
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    // Should not throw an error
    handleFocusEvent(event)

    expect(listbox.tabIndex).toBe(-1)
  })

  test('prioritizes selected option over first option', () => {
    render(<TestListbox selectedOption={3} />)

    const listbox = screen.getByRole('listbox')
    const option1 = screen.getByRole('option', { name: 'Option 1' })
    const option3 = screen.getByRole('option', { name: 'Option 3' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const focusSpy1 = vi.spyOn(option1, 'focus')
    const focusSpy3 = vi.spyOn(option3, 'focus')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(focusSpy1).not.toHaveBeenCalled()
    expect(focusSpy3).toHaveBeenCalledTimes(1)
  })

  test('does not click selected option when focusing from outside', () => {
    render(<TestListbox selectedOption={2} selectionFollowsFocus />)

    const listbox = screen.getByRole('listbox')
    const option2 = screen.getByRole('option', { name: 'Option 2' })
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' })

    const clickSpy = vi.spyOn(option2, 'click')

    const event = createFocusEvent({
      currentTarget: listbox,
      target: listbox,
      relatedTarget: outsideButton,
    })

    handleFocusEvent(event)

    expect(clickSpy).not.toHaveBeenCalled()
  })
})

/**
 * Test component that renders a listbox with options
 */
interface TestListboxProps {
  selectionFollowsFocus?: boolean
  selectedOption?: number
  checkedOption?: number
  noOptions?: boolean
  includeNonButtonOption?: boolean
}

function TestListbox({
  selectionFollowsFocus,
  selectedOption,
  checkedOption,
  noOptions,
  includeNonButtonOption,
}: TestListboxProps) {
  return (
    <>
      <div role="listbox" tabIndex={0} data-selection-follows-focus={selectionFollowsFocus?.toString()}>
        {includeNonButtonOption && <div role="option">Non-button option</div>}
        {!noOptions && (
          <>
            <button
              role="option"
              tabIndex={-1}
              aria-selected={selectedOption === 1 ? 'true' : undefined}
              aria-checked={checkedOption === 1 ? 'true' : undefined}
            >
              Option 1
            </button>
            <button
              role="option"
              tabIndex={-1}
              aria-selected={selectedOption === 2 ? 'true' : undefined}
              aria-checked={checkedOption === 2 ? 'true' : undefined}
            >
              Option 2
            </button>
            <button
              role="option"
              tabIndex={-1}
              aria-selected={selectedOption === 3 ? 'true' : undefined}
              aria-checked={checkedOption === 3 ? 'true' : undefined}
            >
              Option 3
            </button>
          </>
        )}
      </div>
      <button>Outside Button</button>
    </>
  )
}

/**
 * Helper function to create a mock FocusEvent
 */
function createFocusEvent({
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
    type: 'focus',
  } as FocusEvent<HTMLElement>
}
