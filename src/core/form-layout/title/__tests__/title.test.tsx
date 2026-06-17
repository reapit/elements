import { FormLayoutTitle } from '../title'
import { render, screen } from '@testing-library/react'

test('renders a heading element', () => {
  render(<FormLayoutTitle>Form title</FormLayoutTitle>)
  expect(screen.getByRole('heading', { level: 2 })).toBeVisible()
})

test('renders children as the heading text', () => {
  render(<FormLayoutTitle>Test title</FormLayoutTitle>)
  expect(screen.getByRole('heading', { name: 'Test title' })).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutTitle data-testid="title">content</FormLayoutTitle>)
  expect(screen.getByTestId('title')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutTitle className="custom-class" data-testid="title">
      content
    </FormLayoutTitle>,
  )
  expect(screen.getByTestId('title')).toHaveClass('custom-class')
})
