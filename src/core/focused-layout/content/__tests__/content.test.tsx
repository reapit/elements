import { FocusedLayoutContent } from '../content'
import { render, screen } from '@testing-library/react'

test('renders a main element', () => {
  const { container } = render(<FocusedLayoutContent />)
  expect(container.firstElementChild?.tagName).toBe('MAIN')
})

test('renders children', () => {
  render(
    <FocusedLayoutContent>
      <span>Test content</span>
    </FocusedLayoutContent>,
  )
  expect(screen.getByText('Test content')).toBeVisible()
})

test('forwards additional attributes to the main element', () => {
  render(<FocusedLayoutContent data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

test('forwards className to the main element', () => {
  const { container } = render(<FocusedLayoutContent className="custom-class" />)
  expect(container.firstElementChild).toHaveClass('custom-class')
})
