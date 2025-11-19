import { AtAGlanceGrid } from '../grid'
import { render, screen } from '@testing-library/react'

test('renders a list element by default', () => {
  render(<AtAGlanceGrid>Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('renders a div element when a custom role is specified', () => {
  render(<AtAGlanceGrid role="listbox">Content</AtAGlanceGrid>)
  expect(screen.getByRole('listbox')).toBeVisible()
  expect(screen.getByRole('listbox').tagName).toBe('DIV')
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

// NOTE: Skipped because the assertion doesn't currently work as expected. Unsure if it's happy-dom
// or @testing-library/jest-dom that owns the behaviour.
// See https://github.com/testing-library/jest-dom/issues/649
test.skip('applies default gap value', () => {
  render(<AtAGlanceGrid>Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toHaveStyle({ '--aag-grid-gap': 'var(--spacing-4)' })
})

// NOTE: Skipped because the assertion doesn't currently work as expected. Unsure if it's happy-dom
// or @testing-library/jest-dom that owns the behaviour.
// See https://github.com/testing-library/jest-dom/issues/649
test.skip('applies custom gap value', () => {
  render(<AtAGlanceGrid gap="--spacing-8">Content</AtAGlanceGrid>)
  expect(screen.getByRole('list')).toHaveStyle({ '--aag-grid-gap': 'var(--spacing-8)' })
})

test('renders a div when custom role is provided', () => {
  const { container } = render(<AtAGlanceGrid role="listbox">Content</AtAGlanceGrid>)
  const div = container.querySelector('div.el-at-aglance-grid')
  expect(div).toBeInTheDocument()
  expect(container.querySelector('ul')).toBeNull()
})

test('does not apply autoColumns styles when layout="template"', () => {
  render(
    <AtAGlanceGrid autoColumns="1fr" layout="template">
      Content
    </AtAGlanceGrid>,
  )
  const list = screen.getByRole('list')
  expect(list.style.gridAutoColumns).toBe('')
})

test('does not apply templateColumns styles when layout="auto"', () => {
  render(
    <AtAGlanceGrid templateColumns="1fr 1fr" layout="auto">
      Content
    </AtAGlanceGrid>,
  )
  const list = screen.getByRole('list')
  expect(list.style.gridTemplateColumns).toBe('')
})

test('forwards additional props to the list', () => {
  render(<AtAGlanceGrid data-testid="custom-card">Content</AtAGlanceGrid>)
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('list'))
})

test('exposes AtAGlanceGrid.Item', () => {
  expect(AtAGlanceGrid.Item).toBeDefined()
})
