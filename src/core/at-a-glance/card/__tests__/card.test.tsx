import { AtAGlanceCard } from '../card'
import { AtAGlanceCardIcon } from '../icon'
import { AtAGlanceCardLabel } from '../label'
import { AtAGlanceCardDescription } from '../description'
import { AtAGlanceCardValue } from '../value'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '@testing-library/react'

test('renders an article element by default', () => {
  render(
    <AtAGlanceCard>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toBeVisible()
})

test('displays label as heading when as="article"', () => {
  render(
    <AtAGlanceCard>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('heading', { level: 1, name: 'Test Label' })).toBeVisible()
})

test('displays value', () => {
  render(
    <AtAGlanceCard>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>$12,345</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByText('$12,345')).toBeVisible()
})

test('displays description when provided', () => {
  render(
    <AtAGlanceCard>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardDescription>Test Description</AtAGlanceCardDescription>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByText('Test Description')).toBeVisible()
})

test('displays icon when provided', () => {
  render(
    <AtAGlanceCard>
      <AtAGlanceCardIcon>
        <svg data-testid="test-icon" />
      </AtAGlanceCardIcon>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByTestId('test-icon')).toBeVisible()
})

test('applies grid style when specified', () => {
  render(
    <AtAGlanceCard grid="'icon label' 'icon value' / min-content 1fr">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toHaveStyle({ grid: "'icon label' 'icon value' / min-content 1fr" })
})

test('applies max-width when specified', () => {
  render(
    <AtAGlanceCard maxWidth="300px">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toHaveStyle({ maxWidth: '300px' })
})

test('applies min-width when specified', () => {
  render(
    <AtAGlanceCard minWidth="200px">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toHaveStyle({ minWidth: '200px' })
})

test('applies custom styles', () => {
  render(
    <AtAGlanceCard style={{ color: 'red' }}>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the article', () => {
  render(
    <AtAGlanceCard data-testid="custom-card">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('article'))
})

test('renders as anchor when as="a"', () => {
  render(
    <AtAGlanceCard as="a" href="/test">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('link')).toBeVisible()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
})

test('renders label as span when as="a"', () => {
  render(
    <AtAGlanceCard as="a" href="/test">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  const label = screen.getByText('Test Label')
  expect(label.tagName).toBe('SPAN')
})

test('renders as button when as="button"', () => {
  render(
    <AtAGlanceCard as="button">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('button')).toBeVisible()
})

test('button defaults to type="button"', () => {
  render(
    <AtAGlanceCard as="button">
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('button calls onClick when clicked', () => {
  const onClick = vi.fn()
  render(
    <AtAGlanceCard as="button" onClick={onClick}>
      <AtAGlanceCardLabel>Test Label</AtAGlanceCardLabel>
      <AtAGlanceCardValue>Test Value</AtAGlanceCardValue>
    </AtAGlanceCard>,
  )
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})
