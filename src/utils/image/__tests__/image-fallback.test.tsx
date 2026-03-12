import { render, screen } from '@testing-library/react'
import { PropertyIcon } from '../../../icons'
import { ImageFallback } from '../image-fallback'

test('renders the default fallback message', () => {
  render(<ImageFallback />)

  expect(screen.getByText('The image could not be loaded')).toBeVisible()
})

test('renders custom fallback message content from children', () => {
  render(<ImageFallback>Custom fallback message</ImageFallback>)

  expect(screen.getByText('Custom fallback message')).toBeVisible()
})

test('does not render an icon by default', () => {
  const { container } = render(<ImageFallback />)

  expect(container.querySelector('svg')).toBeNull()
})

test('renders a custom icon when icon is provided', () => {
  const { container } = render(<ImageFallback icon={<PropertyIcon aria-hidden color="primary" size="lg" />} />)

  expect(container.querySelector('svg')).toBeTruthy()
})
