import { render, waitFor } from '@testing-library/react'
import { useListboxSelectionObserver } from '../use-listbox-selection-observer'

import type { ReactNode } from 'react'

test('invokes callback with initial selection on mount', () => {
  const callback = vi.fn()

  render(
    <TestListboxObserver callback={callback}>
      <button role="option">Option 1</button>
      <button role="option">Option 2</button>
    </TestListboxObserver>,
  )

  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenCalledWith([])
})

test('invokes callback when aria-checked attribute changes', async () => {
  const callback = vi.fn()

  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <button role="option">Option 1</button>
    </TestListboxObserver>,
  )

  rerender(
    <TestListboxObserver callback={callback}>
      <button aria-checked role="option">
        Option 1
      </button>
    </TestListboxObserver>,
  )

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(2))
  expect(callback).toHaveBeenLastCalledWith([expect.any(HTMLButtonElement)])
})

test('invokes callback when aria-selected attribute changes', async () => {
  const callback = vi.fn()

  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <button role="option">Option 1</button>
    </TestListboxObserver>,
  )

  rerender(
    <TestListboxObserver callback={callback}>
      <button aria-selected role="option">
        Option 1
      </button>
    </TestListboxObserver>,
  )

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(2))
  expect(callback).toHaveBeenLastCalledWith([expect.any(HTMLButtonElement)])
})

test('does not invoke callback for other attribute changes', async () => {
  const callback = vi.fn()
  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <button role="option">Option 1</button>
    </TestListboxObserver>,
  )

  rerender(
    <TestListboxObserver callback={callback}>
      <button data-testid="test" role="option">
        Option 1
      </button>
    </TestListboxObserver>,
  )

  // Only call will be the initial one made on mount
  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1))
})

test('observes selection changes in subtree', async () => {
  const callback = vi.fn()
  const { rerender } = render(
    <TestListboxObserver callback={callback}>
      <div role="group">
        <button role="option">Option 1</button>
      </div>
    </TestListboxObserver>,
  )

  rerender(
    <TestListboxObserver callback={callback}>
      <div role="group">
        <button aria-checked role="option">
          Option 1
        </button>
      </div>
    </TestListboxObserver>,
  )

  await waitFor(() => expect(callback).toHaveBeenCalledTimes(2))
})

interface TestListboxObserverProps {
  listboxId?: string
  callback: (selectedOptions: HTMLButtonElement[]) => void
  children?: ReactNode
}

function TestListboxObserver({ listboxId = 'test-listbox', callback, children }: TestListboxObserverProps) {
  useListboxSelectionObserver(listboxId, callback)
  return (
    <div id={listboxId} role="listbox">
      {children}
    </div>
  )
}
