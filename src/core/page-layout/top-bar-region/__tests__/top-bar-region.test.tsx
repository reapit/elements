import { PageLayoutTopBarRegion } from '../top-bar-region'
import { render, screen } from '@testing-library/react'

test('renders a div element', () => {
  const { container } = render(<PageLayoutTopBarRegion />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('forwards additional attributes to the div element', () => {
  const { container } = render(<PageLayoutTopBarRegion data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})
