import { useActiveDescendant } from '../use-active-descendant'
import { fireEvent, render, screen } from '@testing-library/react'

test('activates the first option on keyboard focus from outside the listbox', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  mockFocusVisible(listbox, true)

  fireEvent.focus(listbox, { relatedTarget: document.body })

  expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1')
})

test('does not activate an option on mouse focus (not focus-visible)', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  mockFocusVisible(listbox, false)

  fireEvent.focus(listbox, { relatedTarget: document.body })

  expect(listbox).not.toHaveAttribute('aria-activedescendant')
})

test('does not activate an option when focus moves within the listbox', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })
  mockFocusVisible(listbox, true)

  fireEvent.focus(listbox, { relatedTarget: option1 })

  expect(listbox).not.toHaveAttribute('aria-activedescendant')
})

test('sets aria-activedescendant on a separate owner element when activeDescendantOwnerId is provided', () => {
  render(<Harness activeDescendantOwnerId="owner-input" />)
  const listbox = screen.getByRole('listbox')
  mockFocusVisible(listbox, true)

  fireEvent.focus(listbox, { relatedTarget: document.body })

  expect(screen.getByLabelText('owner')).toHaveAttribute('aria-activedescendant', 'option-1')
  expect(listbox).not.toHaveAttribute('aria-activedescendant')
})

test('clicks the initial option on focus when selectionFollowsFocus is true and it is not already selected', () => {
  render(<Harness selectionFollowsFocus />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })
  const clickSpy = vi.spyOn(option1, 'click')
  mockFocusVisible(listbox, true)

  fireEvent.focus(listbox, { relatedTarget: document.body })

  expect(clickSpy).toHaveBeenCalledTimes(1)
})

test('does not click the initial option on focus when selectionFollowsFocus is false', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })
  const clickSpy = vi.spyOn(option1, 'click')
  mockFocusVisible(listbox, true)

  fireEvent.focus(listbox, { relatedTarget: document.body })

  expect(clickSpy).not.toHaveBeenCalled()
})

test('does not click the initial option on focus when it is already selected', () => {
  render(<Harness selectionFollowsFocus />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })
  option1.setAttribute('aria-selected', 'true')
  const clickSpy = vi.spyOn(option1, 'click')
  mockFocusVisible(listbox, true)

  fireEvent.focus(listbox, { relatedTarget: document.body })

  expect(clickSpy).not.toHaveBeenCalled()
  expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1')
})

test('clears the active descendant on blur when focus leaves the listbox', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })
  listbox.setAttribute('aria-activedescendant', option1.id)
  option1.dataset.isActive = 'true'

  fireEvent.blur(listbox, { relatedTarget: document.body })

  expect(listbox).not.toHaveAttribute('aria-activedescendant')
  expect(option1).not.toHaveAttribute('data-is-active')
})

test('does not clear the active descendant when focus moves within the listbox', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })
  const option2 = screen.getByRole('option', { name: 'Two' })
  listbox.setAttribute('aria-activedescendant', option1.id)
  option1.dataset.isActive = 'true'

  fireEvent.blur(listbox, { relatedTarget: option2 })

  expect(listbox).toHaveAttribute('aria-activedescendant', option1.id)
})

test('activates the clicked option', () => {
  render(<Harness />)
  const listbox = screen.getByRole('listbox')
  const option2 = screen.getByRole('option', { name: 'Two' })

  fireEvent.click(option2)

  expect(option2).toHaveAttribute('data-is-active', 'true')
  expect(listbox).toHaveAttribute('aria-activedescendant', option2.id)
})

test('retains DOM focus on the listbox container when clicking an option', () => {
  render(<Harness tabIndex={0} />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })

  fireEvent.mouseDown(option1)

  expect(document.activeElement).toBe(listbox)
})

test('does not move focus to the container on mousedown when its tabIndex is negative', () => {
  render(<Harness tabIndex={-1} />)
  const listbox = screen.getByRole('listbox')
  const option1 = screen.getByRole('option', { name: 'One' })

  fireEvent.mouseDown(option1)

  expect(document.activeElement).not.toBe(listbox)
})

test('calls the composed onKeyDown handler before internal keyboard navigation', () => {
  const onKeyDown = vi.fn()
  render(<Harness onKeyDown={onKeyDown} />)
  const listbox = screen.getByRole('listbox')

  fireEvent.keyDown(listbox, { key: 'ArrowDown' })

  expect(onKeyDown).toHaveBeenCalledTimes(1)
  expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1')
})

test('skips internal keyboard navigation when the composed onKeyDown calls preventDefault', () => {
  const onKeyDown: useActiveDescendant.Input['onKeyDown'] = (event) => event.preventDefault()
  render(<Harness onKeyDown={onKeyDown} />)
  const listbox = screen.getByRole('listbox')

  fireEvent.keyDown(listbox, { key: 'ArrowDown' })

  expect(listbox).not.toHaveAttribute('aria-activedescendant')
})

test('calls the composed onMouseDown handler before the internal focus-retention guard', () => {
  const onMouseDown = vi.fn()
  render(<Harness onMouseDown={onMouseDown} />)
  const option1 = screen.getByRole('option', { name: 'One' })

  fireEvent.mouseDown(option1)

  expect(onMouseDown).toHaveBeenCalledTimes(1)
})

function mockFocusVisible(element: HTMLElement, matches: boolean) {
  element.matches = vi.fn().mockReturnValue(matches) as unknown as typeof element.matches
}

interface HarnessProps extends useActiveDescendant.Input {
  selectionFollowsFocus?: boolean
  tabIndex?: number
}

function Harness({
  activeDescendantOwnerId,
  onKeyDown,
  onMouseDown,
  selectionFollowsFocus,
  tabIndex = 0,
}: HarnessProps) {
  const handlers = useActiveDescendant({ activeDescendantOwnerId, onKeyDown, onMouseDown })
  return (
    <div>
      {activeDescendantOwnerId && <input aria-label="owner" id={activeDescendantOwnerId} />}
      <div
        {...handlers}
        data-selection-follows-focus={selectionFollowsFocus}
        id="listbox"
        role="listbox"
        tabIndex={tabIndex}
      >
        <select />
        <button id="option-1" role="option">
          One
        </button>
        <button id="option-2" role="option">
          Two
        </button>
      </div>
    </div>
  )
}
