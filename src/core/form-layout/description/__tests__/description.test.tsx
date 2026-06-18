import { FormLayout } from '../../form-layout'
import { FormLayoutDescription } from '../description'
import { render, screen } from '@testing-library/react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <FormLayout aria-label="Test form layout">{children}</FormLayout>
}

test('renders a paragraph element', () => {
  const { container } = render(<FormLayoutDescription>content</FormLayoutDescription>, { wrapper: Wrapper })
  expect(container.querySelector('p')).toBeVisible()
})

test('renders children as the paragraph text', () => {
  render(<FormLayoutDescription>Form description text</FormLayoutDescription>, { wrapper: Wrapper })
  expect(screen.getByText('Form description text')).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutDescription data-testid="description">content</FormLayoutDescription>, { wrapper: Wrapper })
  expect(screen.getByTestId('description')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutDescription className="custom-class" data-testid="description">
      content
    </FormLayoutDescription>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('description')).toHaveClass('custom-class')
})

test('throws when rendered outside a FormLayout or FormLayout.Section', () => {
  expect(() => render(<FormLayoutDescription>Form description text</FormLayoutDescription>)).toThrow(
    'useFormLayoutContext requires a FormLayout or FormLayout.Section ancestor',
  )
})
