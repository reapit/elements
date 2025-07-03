import { render, screen } from '@testing-library/react'
import { BreadcrumbLink } from '../link'

test('renders a link', () => {
  render(<BreadcrumbLink href="https://fake.url">Test Breadcrumb</BreadcrumbLink>)
  expect(screen.getByRole('link', { name: 'Test Breadcrumb' })).toBeVisible()
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://fake.url')
})

test('forwards additional props to the anchor element', () => {
  render(
    <BreadcrumbLink href="https://fake.url" data-testid="test-breadcrumb">
      Test Breadcrumb
    </BreadcrumbLink>,
  )
  expect(screen.getByTestId('test-breadcrumb')).toBeVisible()
})
