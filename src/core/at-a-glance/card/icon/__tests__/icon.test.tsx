import { AtAGlanceCardIcon } from '../icon'
import { render, screen } from '@testing-library/react'

test('renders a span element', () => {
  render(<AtAGlanceCardIcon>Icon</AtAGlanceCardIcon>)
  const icon = screen.getByText('Icon')
  expect(icon.tagName).toBe('SPAN')
})

test('renders children', () => {
  render(
    <AtAGlanceCardIcon>
      <svg data-testid="test-icon" />
    </AtAGlanceCardIcon>,
  )
  expect(screen.getByTestId('test-icon')).toBeVisible()
})

test('forwards additional props to the span', () => {
  render(<AtAGlanceCardIcon data-testid="custom-icon">Icon</AtAGlanceCardIcon>)
  expect(screen.getByTestId('custom-icon')).toBeVisible()
})

test('applies custom className', () => {
  render(<AtAGlanceCardIcon className="custom-class">Icon</AtAGlanceCardIcon>)
  expect(screen.getByText('Icon')).toHaveClass('custom-class')
})
