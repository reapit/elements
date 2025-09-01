import { PaginationLinkBase } from '../link-base'
import { render, screen } from '@testing-library/react'

vi.mock('#src/icons/chevron-left', () => ({
  ChevronLeftIcon: () => <svg data-testid="chevron-left-icon" />,
}))
vi.mock('#src/icons/chevron-right', () => ({
  ChevronRightIcon: () => <svg data-testid="chevron-right-icon" />,
}))

test('renders a link element when `as="a"`', () => {
  render(<PaginationLinkBase as="a" href="https://fake.url" variant="next-page" />)
  expect(screen.getByRole('link')).toBeVisible()
})

test('renders a button element when `as="button"`', () => {
  render(<PaginationLinkBase as="button" variant="next-page" />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('displays the chevron right icon for the next-page variant', () => {
  render(<PaginationLinkBase as="a" href="https://fake.url" variant="next-page" />)
  expect(screen.getByTestId('chevron-right-icon')).toBeVisible()
  expect(screen.queryByTestId('chevron-left-icon')).not.toBeInTheDocument()
})

test('displays the chevron left icon for the previous-page variant', () => {
  render(<PaginationLinkBase as="a" href="https://fake.url" variant="previous-page" />)
  expect(screen.getByTestId('chevron-left-icon')).toBeVisible()
  expect(screen.queryByTestId('chevron-right-icon')).not.toBeInTheDocument()
})
