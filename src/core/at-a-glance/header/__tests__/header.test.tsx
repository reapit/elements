import { AtAGlanceHeader } from '../header'
import { render, screen } from '@testing-library/react'

test('renders a header element', () => {
  render(<AtAGlanceHeader>Test Title</AtAGlanceHeader>)
  expect(screen.getByRole('banner')).toBeVisible()
})

test('displays the header text', () => {
  render(<AtAGlanceHeader>Properties</AtAGlanceHeader>)
  expect(screen.getByRole('heading', { name: 'Properties' })).toBeVisible()
})

test('renders children as ReactNode', () => {
  render(
    <AtAGlanceHeader>
      <span data-testid="custom-title">Custom Title</span>
    </AtAGlanceHeader>,
  )
  expect(screen.getByTestId('custom-title')).toBeVisible()
  expect(screen.getByText('Custom Title')).toBeVisible()
})

test('does not render accessory when not provided', () => {
  const { container } = render(<AtAGlanceHeader>Test</AtAGlanceHeader>)
  const header = container.querySelector('header')
  expect(header?.children).toHaveLength(1)
})

test('renders accessory when provided', () => {
  render(<AtAGlanceHeader accessory={<button data-testid="accessory-button">View all</button>}>Test</AtAGlanceHeader>)
  expect(screen.getByTestId('accessory-button')).toBeVisible()
})

test('forwards additional props to the header element', () => {
  render(
    <AtAGlanceHeader data-testid="custom-header" className="custom-class">
      Test
    </AtAGlanceHeader>,
  )
  expect(screen.getByTestId('custom-header')).toBe(screen.getByRole('banner'))
  expect(screen.getByTestId('custom-header')).toHaveClass('custom-class')
})

test('applies custom styles', () => {
  render(<AtAGlanceHeader style={{ color: 'red' }}>Test</AtAGlanceHeader>)
  expect(screen.getByRole('banner')).toHaveStyle({ color: 'red' })
})
