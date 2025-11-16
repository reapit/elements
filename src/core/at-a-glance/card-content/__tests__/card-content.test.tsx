import { render, screen } from '@testing-library/react'
import { PropertyIcon } from '#src/icons/property'
import { AtAGlanceCardContent } from '../card-content'

test('renders card content with label and value', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" />)
  expect(screen.getByRole('heading', { name: 'Card label' })).toBeVisible()
  expect(screen.getByText('value')).toBeVisible()
})

test('renders description when provided', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" description="Description text" />)
  expect(screen.getByText('Description text')).toBeVisible()
})

test('does not render description when not provided', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" />)
  expect(screen.queryByText('Description')).not.toBeInTheDocument()
})

test('renders icon when provided', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" icon={<PropertyIcon data-testid="property-icon" />} />)
  expect(screen.getByTestId('property-icon')).toBeVisible()
})

test('does not render icon container when icon is not provided', () => {
  const { container } = render(<AtAGlanceCardContent label="Card label" value="value" />)
  const iconContainer = container.querySelector('[class*="ElAtAGlanceCardContentIcon"]')
  expect(iconContainer).not.toBeInTheDocument()
})

test('applies correct data attribute for vertical layout', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" layout="vertical" data-testid="card" />)
  expect(screen.getByTestId('card')).toHaveAttribute('data-layout', 'vertical')
})

test('applies correct data attribute for horizontal layout', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" layout="horizontal" data-testid="card" />)
  expect(screen.getByTestId('card')).toHaveAttribute('data-layout', 'horizontal')
})

test('applies correct data attribute for compact layout', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" layout="compact" data-testid="card" />)
  expect(screen.getByTestId('card')).toHaveAttribute('data-layout', 'compact')
})

test('uses vertical as default layout when not specified', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" data-testid="card" />)
  expect(screen.getByTestId('card')).toHaveAttribute('data-layout', 'vertical')
})

test('forwards additional props to the underlying element', () => {
  render(<AtAGlanceCardContent label="Card label" value="value" data-testid="my-card" className="custom-class" />)
  expect(screen.getByTestId('my-card')).toBeVisible()
  expect(screen.getByTestId('my-card')).toHaveClass('custom-class')
})

test('renders all content in vertical layout', () => {
  render(
    <AtAGlanceCardContent
      label="Total Properties"
      value="1,234"
      description="Active listings"
      icon={<PropertyIcon data-testid="icon" />}
      layout="vertical"
    />,
  )
  expect(screen.getByText('Total Properties')).toBeVisible()
  expect(screen.getByText('1,234')).toBeVisible()
  expect(screen.getByText('Active listings')).toBeVisible()
  expect(screen.getByTestId('icon')).toBeVisible()
})

test('renders all content in horizontal layout', () => {
  render(
    <AtAGlanceCardContent
      label="Total Properties"
      value="1,234"
      description="Active listings"
      icon={<PropertyIcon data-testid="icon" />}
      layout="horizontal"
    />,
  )
  expect(screen.getByText('Total Properties')).toBeVisible()
  expect(screen.getByText('1,234')).toBeVisible()
  expect(screen.getByText('Active listings')).toBeVisible()
  expect(screen.getByTestId('icon')).toBeVisible()
})

test('renders all content in compact layout', () => {
  render(
    <AtAGlanceCardContent
      label="Total Properties"
      value="1,234"
      description="Active listings"
      icon={<PropertyIcon data-testid="icon" />}
      layout="compact"
    />,
  )
  expect(screen.getByText('Total Properties')).toBeVisible()
  expect(screen.getByText('1,234')).toBeVisible()
  expect(screen.getByText('Active listings')).toBeVisible()
  expect(screen.getByTestId('icon')).toBeVisible()
})
