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

test('does not set data-is-full-bleed by default', () => {
  const { container } = render(<FocusedLayoutContent />)
  expect(container.firstElementChild).not.toHaveAttribute('data-is-full-bleed')
})

test('sets data-is-full-bleed when isFullBleed is true', () => {
  const { container } = render(<FocusedLayoutContent isFullBleed />)
  expect(container.firstElementChild).toHaveAttribute('data-is-full-bleed', 'true')
})
