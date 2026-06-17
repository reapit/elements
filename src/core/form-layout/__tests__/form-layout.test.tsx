import { FormLayout } from '../form-layout'
import { render, screen } from '@testing-library/react'

test('renders a section element', () => {
  render(
    <FormLayout aria-label="Test form layout" data-testid="form-layout">
      content
    </FormLayout>,
  )
  expect(screen.getByRole('region', { name: 'Test form layout' })).toBeVisible()
  expect(screen.getByTestId('form-layout').tagName).toBe('SECTION')
})

test('renders children', () => {
  render(<FormLayout>Test content</FormLayout>)
  expect(screen.getByText('Test content')).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(
    <FormLayout aria-label="Test form layout" data-testid="form-layout">
      content
    </FormLayout>,
  )
  expect(screen.getByTestId('form-layout')).toHaveAttribute('aria-label', 'Test form layout')
})

test('merges className with the default class', () => {
  render(
    <FormLayout className="custom-class" data-testid="form-layout">
      content
    </FormLayout>,
  )
  expect(screen.getByTestId('form-layout')).toHaveClass('custom-class')
})

test('wires aria-labelledby to FormLayout.Title automatically', () => {
  render(
    <FormLayout data-testid="form-layout">
      <FormLayout.Header>
        <FormLayout.Title>Contact details</FormLayout.Title>
      </FormLayout.Header>
    </FormLayout>,
  )
  const section = screen.getByTestId('form-layout')
  const heading = screen.getByRole('heading', { name: 'Contact details' })
  expect(section).toHaveAttribute('aria-labelledby', heading.id)
})

test('wires aria-describedby to FormLayout.Description automatically', () => {
  render(
    <FormLayout data-testid="form-layout">
      <FormLayout.Header>
        <FormLayout.Description>Add the primary contact information.</FormLayout.Description>
      </FormLayout.Header>
    </FormLayout>,
  )
  const section = screen.getByTestId('form-layout')
  const description = screen.getByText('Add the primary contact information.')
  expect(section).toHaveAttribute('aria-describedby', description.id)
})

test('aria-labelledby is not set when aria-label is provided', () => {
  render(
    <FormLayout aria-label="Contact details" data-testid="form-layout">
      content
    </FormLayout>,
  )
  expect(screen.getByTestId('form-layout')).not.toHaveAttribute('aria-labelledby')
})

test('consumer-supplied aria-labelledby overrides auto-wired value', () => {
  render(
    <FormLayout aria-labelledby="custom-id" data-testid="form-layout">
      content
    </FormLayout>,
  )
  expect(screen.getByTestId('form-layout')).toHaveAttribute('aria-labelledby', 'custom-id')
})

test('consumer-supplied id on FormLayout.Title overrides auto-wired titleId', () => {
  render(
    <FormLayout data-testid="form-layout">
      <FormLayout.Title id="custom-title-id">Contact details</FormLayout.Title>
    </FormLayout>,
  )
  expect(screen.getByRole('heading', { name: 'Contact details' })).toHaveAttribute('id', 'custom-title-id')
})

test('exposes FormLayout.Header', () => {
  expect(FormLayout.Header).toBeDefined()
})

test('exposes FormLayout.Title', () => {
  expect(FormLayout.Title).toBeDefined()
})

test('exposes FormLayout.Description', () => {
  expect(FormLayout.Description).toBeDefined()
})

test('exposes FormLayout.Footer', () => {
  expect(FormLayout.Footer).toBeDefined()
})
