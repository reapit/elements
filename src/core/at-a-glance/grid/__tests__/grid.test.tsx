import { AtAGlanceGrid } from '../grid'
import { render, screen } from '@testing-library/react'

test('renders a list element', () => {
  render(<AtAGlanceGrid>Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('displays children', () => {
  render(<AtAGlanceGrid>Content</AtAGlanceGrid>)
  expect(screen.getByText('Content')).toBeVisible()
})

test('has data-layout="template" by default', () => {
  render(<AtAGlanceGrid>Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toHaveAttribute('data-layout', 'template')
})

test('applies data-layout="auto" when specified', () => {
  render(<AtAGlanceGrid layout="auto">Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toHaveAttribute('data-layout', 'auto')
})

test('applies gridAutoColumns styles when specified and layout="auto"', () => {
  render(
    <AtAGlanceGrid autoColumns="1fr" layout="auto">
      Content
    </AtAGlanceGrid>,
  )
  expect(screen.getByRole('list')).toHaveStyle({ gridAutoColumns: '1fr' })
})

test('applies gridTemplateColumns styles when specified and layout="template"', () => {
  render(<AtAGlanceGrid templateColumns="1fr 1fr">Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toHaveStyle({ gridTemplateColumns: '1fr 1fr' })
})

test('applies default templateColumns when not specified', () => {
  render(<AtAGlanceGrid>Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toHaveStyle({ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' })
})

test('merges custom styles with grid styles', () => {
  render(
    <AtAGlanceGrid style={{ backgroundColor: 'red' }} templateColumns="1fr 1fr">
      Content
    </AtAGlanceGrid>,
  )
  const list = screen.getByRole('list')
  expect(list).toHaveStyle({ backgroundColor: 'red', gridTemplateColumns: '1fr 1fr' })
})

test('forwards additional props to the list', () => {
  render(<AtAGlanceGrid data-testid="custom-card">Content</AtAGlanceGrid>)
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('list'))
})

test('exposes AtAGlanceGrid.Item', () => {
  expect(AtAGlanceGrid.Item).toBeDefined()
})
