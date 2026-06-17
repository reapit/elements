import { FormLayoutDescription } from '../description'
import { render, screen } from '@testing-library/react'

test('renders a paragraph element', () => {
  const { container } = render(<FormLayoutDescription>content</FormLayoutDescription>)
  expect(container.querySelector('p')).toBeVisible()
})

test('renders children as the paragraph text', () => {
  render(<FormLayoutDescription>Form description text</FormLayoutDescription>)
  expect(screen.getByText('Form description text')).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutDescription data-testid="description">content</FormLayoutDescription>)
  expect(screen.getByTestId('description')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutDescription className="custom-class" data-testid="description">
      content
    </FormLayoutDescription>,
  )
  expect(screen.getByTestId('description')).toHaveClass('custom-class')
})
