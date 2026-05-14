import { render, screen } from '@testing-library/react'
import { PropertyIcon } from '../../../icons/property'
import { MediaFallback } from '../media-fallback'

test('renders no message when no children are provided', () => {
  const { container } = render(<MediaFallback />)

  expect(container.querySelector('p')).toBeNull()
})

test('renders custom fallback message content from children', () => {
  render(<MediaFallback>Custom fallback message</MediaFallback>)

  expect(screen.getByText('Custom fallback message')).toBeVisible()
})

test('does not render an icon by default', () => {
  const { container } = render(<MediaFallback />)

  expect(container.querySelector('svg')).toBeNull()
})

test('renders a custom icon when icon is provided', () => {
  const { container } = render(<MediaFallback icon={<PropertyIcon aria-hidden color="primary" size="lg" />} />)

  expect(container.querySelector('svg')).toBeTruthy()
})
