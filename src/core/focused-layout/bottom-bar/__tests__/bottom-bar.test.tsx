import { FocusedLayoutBottomBar } from '../bottom-bar'
import { render, screen } from '@testing-library/react'

test('renders a footer element', () => {
  const { container } = render(<FocusedLayoutBottomBar />)
  expect(container.firstElementChild?.tagName).toBe('FOOTER')
})

test('renders children (action buttons)', () => {
  render(
    <FocusedLayoutBottomBar>
      <button>Cancel</button>
      <button>Save</button>
    </FocusedLayoutBottomBar>,
  )
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Save' })).toBeVisible()
})

test('forwards additional attributes to the footer element', () => {
  render(<FocusedLayoutBottomBar data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

test('forwards className to the footer element', () => {
  const { container } = render(<FocusedLayoutBottomBar className="custom-class" />)
  expect(container.firstElementChild).toHaveClass('custom-class')
})
