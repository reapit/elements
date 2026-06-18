import { FormLayout } from '../../form-layout'
import { FormLayoutTitle } from '../title'
import { render, screen } from '@testing-library/react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <FormLayout aria-label="Test form layout">{children}</FormLayout>
}

test('renders a heading element', () => {
  render(<FormLayoutTitle>Form title</FormLayoutTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { level: 2 })).toBeVisible()
})

test('renders children as the heading text', () => {
  render(<FormLayoutTitle>Test title</FormLayoutTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { name: 'Test title' })).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutTitle data-testid="title">content</FormLayoutTitle>, { wrapper: Wrapper })
  expect(screen.getByTestId('title')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutTitle className="custom-class" data-testid="title">
      content
    </FormLayoutTitle>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('title')).toHaveClass('custom-class')
})

test('renders as h1 when as="h1" is passed', () => {
  render(<FormLayoutTitle as="h1">Form title</FormLayoutTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
})

test('renders as h3 when as="h3" is passed', () => {
  render(<FormLayoutTitle as="h3">Form title</FormLayoutTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { level: 3 })).toBeVisible()
})

test('throws when rendered outside a FormLayout or FormLayout.Section', () => {
  expect(() => render(<FormLayoutTitle>Form title</FormLayoutTitle>)).toThrow(
    'useFormLayoutContext requires a FormLayout or FormLayout.Section ancestor',
  )
})
