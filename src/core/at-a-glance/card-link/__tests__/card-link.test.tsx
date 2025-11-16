import { AtAGlanceCardLink } from '../card-link'
import { render, screen } from '@testing-library/react'

test('renders a link element', () => {
  render(<AtAGlanceCardLink href="https://fake.url">Hello</AtAGlanceCardLink>)
  expect(screen.getByRole('link')).toBeVisible()
})

test('applies href attribute', () => {
  render(<AtAGlanceCardLink href="https://example.com">Hello</AtAGlanceCardLink>)
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
})

test('forwards additional props to the link', () => {
  render(
    <AtAGlanceCardLink data-testid="card-link" href="https://fake.url">
      Hello
    </AtAGlanceCardLink>,
  )
  expect(screen.getByTestId('card-link')).toBe(screen.getByRole('link'))
})
