import { FocusedLayoutTopBar } from '../top-bar'
import { render, screen } from '@testing-library/react'

test('renders a header element', () => {
  const { container } = render(<FocusedLayoutTopBar title="Test Title" />)
  expect(container.firstElementChild?.tagName).toBe('HEADER')
})

test('renders the title as an h1 element', () => {
  render(<FocusedLayoutTopBar title="Test Title" />)
  expect(screen.getByRole('heading', { level: 1, name: 'Test Title' })).toBeVisible()
})

test('renders the logo when provided', () => {
  render(<FocusedLayoutTopBar logo={<span data-testid="logo">Logo</span>} title="Test Title" />)
  expect(screen.getByTestId('logo')).toBeVisible()
})

test('does not render the logo container when logo is not provided', () => {
  const { container } = render(<FocusedLayoutTopBar title="Test Title" />)
  // Since we don't render the container at all when there's no logo, check the structure
  expect(container.querySelector('[data-testid="logo"]')).toBeNull()
})

test('renders children (action buttons)', () => {
  render(
    <FocusedLayoutTopBar title="Test Title">
      <button>Save</button>
    </FocusedLayoutTopBar>,
  )
  expect(screen.getByRole('button', { name: 'Save' })).toBeVisible()
})

test('forwards additional attributes to the header element', () => {
  render(<FocusedLayoutTopBar data-testid="test-id" title="Test Title" />)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

test('forwards className to the header element', () => {
  const { container } = render(<FocusedLayoutTopBar className="custom-class" title="Test Title" />)
  expect(container.firstElementChild).toHaveClass('custom-class')
})
