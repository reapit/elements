import { render, screen } from '@testing-library/react'
import { Link } from '../link'

test('renders a link with the correct text', () => {
  render(<Link href="https://fake.url">Test Link</Link>)
  expect(screen.getByRole('link', { name: 'Test Link' })).toBeVisible()
})

test('passes the `href` prop to the link element', () => {
  render(
    <Link href="https://fake.url" variant="secondary">
      Test Link
    </Link>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://fake.url')
})

test('applies the correct variant based on the `variant` prop', () => {
  render(
    <Link href="https://fake.url" variant="secondary">
      Test Link
    </Link>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('data-variant', 'secondary')
})

test('applies the correct size based on the `size` prop', () => {
  render(
    <Link href="https://fake.url" size="sm">
      Test Link
    </Link>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('data-size', 'sm')
})

test('applies the correct quiet state based on the `isQuiet` prop', () => {
  render(
    <Link href="https://fake.url" isQuiet>
      Test Link
    </Link>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('data-is-quiet', 'true')
})

test('forwards additional props to the anchor element', () => {
  render(
    <Link href="https://fake.url" data-testid="test-id">
      Test Link
    </Link>,
  )
  expect(screen.getByTestId('test-id')).toBeVisible()
})
