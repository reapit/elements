import { FormLayoutFooter } from '../footer'
import { render, screen } from '@testing-library/react'

test('renders a footer element', () => {
  render(<FormLayoutFooter>content</FormLayoutFooter>)
  expect(screen.getByRole('contentinfo')).toBeVisible()
})

test('renders children', () => {
  render(<FormLayoutFooter>Footer content</FormLayoutFooter>)
  expect(screen.getByText('Footer content')).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutFooter data-testid="footer">content</FormLayoutFooter>)
  expect(screen.getByTestId('footer')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutFooter className="custom-class" data-testid="footer">
      content
    </FormLayoutFooter>,
  )
  expect(screen.getByTestId('footer')).toHaveClass('custom-class')
})
