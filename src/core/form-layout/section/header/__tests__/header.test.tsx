import { FormLayoutSectionHeader } from '../header'
import { render, screen } from '@testing-library/react'

test('renders a header element', () => {
  const { container } = render(<FormLayoutSectionHeader>content</FormLayoutSectionHeader>)
  expect(container.querySelector('header')).toBeVisible()
})

test('renders children', () => {
  render(<FormLayoutSectionHeader>Header content</FormLayoutSectionHeader>)
  expect(screen.getByText('Header content')).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutSectionHeader data-testid="section-header">content</FormLayoutSectionHeader>)
  expect(screen.getByTestId('section-header')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutSectionHeader className="custom-class" data-testid="section-header">
      content
    </FormLayoutSectionHeader>,
  )
  expect(screen.getByTestId('section-header')).toHaveClass('custom-class')
})
