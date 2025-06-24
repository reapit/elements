import { render, screen, waitFor } from '@testing-library/react'
import { useRef } from 'react'
import { useSideBarController } from '../use-side-bar-controller'

test('collapses open menu groups when aria-current changes', async () => {
  const { rerender } = render(<TestComponent currentPage="none" />)
  rerender(<TestComponent currentPage="menu-item-1" />)

  await waitFor(() => expect(screen.getByTestId('menu-group-1')).not.toBeVisible())
  await waitFor(() => expect(screen.getByTestId('menu-group-2')).not.toBeVisible())
})

test('cleans up observer on unmount', () => {
  const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const { unmount } = render(<TestComponent />)
  unmount()

  expect(disconnectSpy).toHaveBeenCalled()
})

test('handles null ref gracefully', () => {
  const TestComponentWithNullRef = () => {
    const ref = useRef<HTMLDivElement>(null)
    useSideBarController(ref)
    return <div>Test</div>
  }

  expect(() => render(<TestComponentWithNullRef />)).not.toThrow()
})

interface TestComponentProps {
  currentPage?: 'none' | 'menu-item-1'
}

function TestComponent({ currentPage = 'none' }: TestComponentProps) {
  const ref = useRef<HTMLDivElement>(null)
  useSideBarController(ref)

  return (
    <div ref={ref}>
      <a href="#" aria-current={currentPage === 'menu-item-1' ? 'page' : undefined}>
        Menu Item 1
      </a>
      <details data-testid="menu-group-1" open>
        <summary>Menu Group 1</summary>
        <a href="#" aria-current={false}>
          Menu Item 2
        </a>
      </details>
      <details data-testid="menu-group-2" open>
        <summary>Menu Group 2</summary>
        <a href="#" aria-current={false}>
          Menu Item 3
        </a>
      </details>
    </div>
  )
}
