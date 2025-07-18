import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useBottomBarObserver } from '../use-bottom-bar-observer'
import { useRef } from 'react'

test('returns true initially', () => {
  render(<TestComponent />)
  expect(screen.getByText('true')).toBeInTheDocument()
})

test('returns true when scrolling up', async () => {
  render(<TestComponent />)

  // Decreasing scrollTop = scrolling up
  fireEvent.scroll(screen.getByTestId('scroll-container'), { target: { scrollTop: 100 } })
  fireEvent.scroll(screen.getByTestId('scroll-container'), { target: { scrollTop: 50 } })

  await waitFor(() => {
    expect(screen.getByText('true')).toBeInTheDocument()
  })
})

test('returns false when scrolling down', async () => {
  render(<TestComponent />)

  // Increasing scrollTop = scrolling down
  fireEvent.scroll(screen.getByTestId('scroll-container'), { target: { scrollTop: 100 } })
  fireEvent.scroll(screen.getByTestId('scroll-container'), { target: { scrollTop: 150 } })

  await waitFor(() => {
    expect(screen.getByText('false')).toBeInTheDocument()
  })
})

test('handles null ref gracefully', () => {
  function TestComponent() {
    // NOTE: ref is not attached to a DOM element.
    const ref = useRef<HTMLDivElement>(null)
    const isOpen = useBottomBarObserver(ref)
    return <div>{isOpen ? 'true' : 'false'}</div>
  }

  render(<TestComponent />)
  expect(screen.queryByText('true')).toBeInTheDocument()
})

test('cleans up event listener on unmount', () => {
  const abortSpy = vi.spyOn(AbortController.prototype, 'abort')
  const { unmount } = render(<TestComponent />)
  unmount()

  expect(abortSpy).toHaveBeenCalled()
})

function TestComponent() {
  const ref = useRef<HTMLDivElement>(null)
  const isOpen = useBottomBarObserver(ref)
  return (
    <div data-testid="scroll-container" ref={ref}>
      {isOpen ? 'true' : 'false'}
    </div>
  )
}
