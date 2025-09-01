import { PaginationLinkButton } from '../link-button'
import { render, screen } from '@testing-library/react'

test('renders as a button element', () => {
  render(<PaginationLinkButton variant="next-page" />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('type attribute defaults to button', () => {
  render(<PaginationLinkButton variant="next-page" />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('type attribute can be overridden', () => {
  render(<PaginationLinkButton type="submit" variant="next-page" />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
})
