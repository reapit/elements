import { render, screen, waitFor } from '@testing-library/react'
import { useSideBarController } from '../use-side-bar-controller'

import type { useSideBar } from '../use-side-bar'

test('only observes changes when the side bar is expanded', () => {
  const observeSpy = vi.spyOn(MutationObserver.prototype, 'observe')

  const { rerender } = render(<TestComponent sideBarState="collapsed" />)
  expect(observeSpy).not.toHaveBeenCalled()

  rerender(<TestComponent sideBarState="expanded" />)
  expect(observeSpy).toHaveBeenCalled()
})

test('collapses open menu groups when aria-current changes', async () => {
  const { rerender } = render(<TestComponent currentPage="none" />)
  rerender(<TestComponent currentPage="menu-item-1" />)

  await waitFor(() => expect(screen.getByTestId('menu-group-1')).not.toBeVisible())
  await waitFor(() => expect(screen.getByTestId('menu-group-2')).not.toBeVisible())
})

test('collapses open menu groups when data-is-active changes', async () => {
  const { rerender } = render(<TestComponent currentPage="none" />)
  rerender(<TestComponent activeGroup="menu-group-1" />)

  await waitFor(() => expect(screen.getByTestId('menu-group-1')).toBeVisible())
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
    useSideBarController('expanded')
    return null
  }

  expect(() => render(<TestComponentWithNullRef />)).not.toThrow()
})

interface TestComponentProps {
  activeGroup?: 'none' | 'menu-group-1'
  currentPage?: 'none' | 'menu-item-1'
  sideBarState?: useSideBar.State
}

function TestComponent({ activeGroup = 'none', currentPage = 'none', sideBarState = 'expanded' }: TestComponentProps) {
  const ref = useSideBarController(sideBarState)

  return (
    <div ref={ref}>
      <a href="#" aria-current={currentPage === 'menu-item-1' ? 'page' : undefined}>
        Menu Item 1
      </a>
      <details data-is-active={activeGroup === 'menu-group-1'} data-testid="menu-group-1" open>
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
