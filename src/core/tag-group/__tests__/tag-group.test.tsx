import { render, screen } from '@testing-library/react'
import { TagGroup } from '../tag-group'

test('renders as a list element', () => {
  render(<TagGroup>Test Tag</TagGroup>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('chip group list has `data-flow="wrap"` attribute, by default', () => {
  render(<TagGroup>Fake child</TagGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-flow', 'wrap')
})

test('chip group list has `data-overflow="visible"` attribute, by default', () => {
  render(<TagGroup>Fake child</TagGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-overflow', 'visible')
})

test('chip group list has `data-flow="nowrap"` attribute when specified', () => {
  render(<TagGroup flow="nowrap">Fake child</TagGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-flow', 'nowrap')
})

test('chip group list has `data-overflow="auto"` attribute when specified', () => {
  render(<TagGroup overflow="auto">Fake child</TagGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-overflow', 'auto')
})

test('forwards additional props to the list element', () => {
  render(<TagGroup data-testid="test-id">Test Tag</TagGroup>)
  expect(screen.getByTestId('test-id')).toBeVisible()
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('list'))
})
