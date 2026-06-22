import { render, screen } from '@testing-library/react'
import { GridItem } from '../grid-item'

test('renders a div element by default', () => {
  render(<GridItem data-testid="item">Content</GridItem>)
  expect(screen.getByTestId('item').tagName).toBe('DIV')
})

test('renders the element specified by as', () => {
  render(
    <GridItem as="li" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item').tagName).toBe('LI')
})

test('displays children', () => {
  render(<GridItem>Content</GridItem>)
  expect(screen.getByText('Content')).toBeVisible()
})

test('applies column as inline style', () => {
  render(
    <GridItem column="1 / 3" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ gridColumn: '1 / 3' })
})

test('applies row as inline style', () => {
  render(
    <GridItem data-testid="item" row="2 / 4">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ gridRow: '2 / 4' })
})

test('applies area as inline style', () => {
  render(
    <GridItem area="header" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ gridArea: 'header' })
})

test('applies alignSelf as inline style', () => {
  render(
    <GridItem alignSelf="center" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ alignSelf: 'center' })
})

test('applies alignSelf auto as inline style', () => {
  render(
    <GridItem alignSelf="auto" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ alignSelf: 'auto' })
})

test('applies alignSelf normal as inline style', () => {
  render(
    <GridItem alignSelf="normal" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ alignSelf: 'normal' })
})

test('applies justifySelf as inline style', () => {
  render(
    <GridItem data-testid="item" justifySelf="end">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ justifySelf: 'end' })
})

test('applies justifySelf auto as inline style', () => {
  render(
    <GridItem data-testid="item" justifySelf="auto">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ justifySelf: 'auto' })
})

test('applies justifySelf normal as inline style', () => {
  render(
    <GridItem data-testid="item" justifySelf="normal">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ justifySelf: 'normal' })
})

test('forwards extra HTML attributes', () => {
  render(
    <GridItem aria-label="grid item" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveAttribute('aria-label', 'grid item')
})

test('applies additional className alongside the base class', () => {
  render(
    <GridItem className="custom-class" data-testid="item">
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveClass('custom-class')
})

test('merges caller style prop with inline styles', () => {
  render(
    <GridItem column="1 / 2" data-testid="item" style={{ color: 'red' }}>
      Content
    </GridItem>,
  )
  expect(screen.getByTestId('item')).toHaveStyle({ color: 'red', gridColumn: '1 / 2' })
})

test('does not apply inline styles for unset props', () => {
  render(<GridItem data-testid="item">Content</GridItem>)
  const item = screen.getByTestId('item')
  expect(item.style.gridColumn).toBe('')
  expect(item.style.gridArea).toBe('')
})
