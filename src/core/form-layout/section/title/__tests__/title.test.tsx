import { FormLayoutSection } from '../../section'
import { FormLayoutSectionTitle } from '../title'
import { render, screen } from '@testing-library/react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <FormLayoutSection>{children}</FormLayoutSection>
}

test('renders an h2 element by default', () => {
  render(<FormLayoutSectionTitle>Section title</FormLayoutSectionTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { level: 2 })).toBeVisible()
})

test('renders children as the heading text', () => {
  render(<FormLayoutSectionTitle>Test title</FormLayoutSectionTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { name: 'Test title' })).toBeVisible()
})

test('renders as h1 when as="h1" is passed', () => {
  render(<FormLayoutSectionTitle as="h1">Section title</FormLayoutSectionTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
})

test('renders as h3 when as="h3" is passed', () => {
  render(<FormLayoutSectionTitle as="h3">Section title</FormLayoutSectionTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { level: 3 })).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<FormLayoutSectionTitle data-testid="title">content</FormLayoutSectionTitle>, { wrapper: Wrapper })
  expect(screen.getByTestId('title')).toBeVisible()
})

test('merges className with the default class', () => {
  render(
    <FormLayoutSectionTitle className="custom-class" data-testid="title">
      content
    </FormLayoutSectionTitle>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('title')).toHaveClass('custom-class')
})

test('wires id to the auto-generated titleId from context', () => {
  render(
    <FormLayoutSection data-testid="section">
      <FormLayoutSectionTitle>Section title</FormLayoutSectionTitle>
    </FormLayoutSection>,
  )
  const section = screen.getByTestId('section')
  const heading = screen.getByRole('heading', { name: 'Section title' })
  expect(section).toHaveAttribute('aria-labelledby', heading.id)
})

test('consumer-supplied id overrides the auto-wired titleId', () => {
  render(<FormLayoutSectionTitle id="custom-id">Section title</FormLayoutSectionTitle>, { wrapper: Wrapper })
  expect(screen.getByRole('heading', { name: 'Section title' })).toHaveAttribute('id', 'custom-id')
})

test('throws when rendered outside a FormLayout or FormLayout.Section', () => {
  expect(() => render(<FormLayoutSectionTitle>Section title</FormLayoutSectionTitle>)).toThrow(
    'useFormLayoutContext requires a FormLayout or FormLayout.Section ancestor',
  )
})
