import { AtAGlanceCard } from '../../card'
import { AtAGlanceGridItem } from '../grid-item'
import { render, screen } from '@testing-library/react'

test('renders a list item element', () => {
  render(<AtAGlanceGridItem>Content</AtAGlanceGridItem>)
  expect(screen.getByRole('listitem')).toBeVisible()
})

test('displays children', () => {
  render(<AtAGlanceGridItem>Test Content</AtAGlanceGridItem>)
  expect(screen.getByText('Test Content')).toBeVisible()
})

test('can wrap a Card component', () => {
  render(
    <AtAGlanceGridItem>
      <AtAGlanceCard label="Test" displayValue="Value" />
    </AtAGlanceGridItem>,
  )
  expect(screen.getByRole('listitem')).toBeVisible()
  expect(screen.getByRole('article')).toBeVisible()
  expect(screen.getByText('Test')).toBeVisible()
})

test('supports custom styles', () => {
  render(<AtAGlanceGridItem style={{ color: 'red' }}>Content</AtAGlanceGridItem>)
  expect(screen.getByRole('listitem')).toHaveStyle({ color: 'red' })
})

test('supports custom className', () => {
  render(<AtAGlanceGridItem className="custom-class">Content</AtAGlanceGridItem>)
  expect(screen.getByRole('listitem')).toHaveClass('custom-class')
})

test('forwards additional props to the list item', () => {
  render(<AtAGlanceGridItem data-testid="custom-item">Content</AtAGlanceGridItem>)
  expect(screen.getByTestId('custom-item')).toBe(screen.getByRole('listitem'))
})

test('has correct displayName', () => {
  expect(AtAGlanceGridItem.displayName).toBe('AtAGlance.GridItem')
})
