import { ChipGroup } from '../chip-group'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

test('renders its children in a list', () => {
  render(<ChipGroup>Fake child</ChipGroup>)
  const list = screen.getByRole('list')

  expect(list).toBeVisible()
  expect(list).toHaveTextContent('Fake child')
})

test('chip group list has `data-flow="wrap"` attribute, by default', () => {
  render(<ChipGroup>Fake child</ChipGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-flow', 'wrap')
})

test('chip group list has `data-overflow="visible"` attribute, by default', () => {
  render(<ChipGroup>Fake child</ChipGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-overflow', 'visible')
})

test('chip group list has `data-flow="nowrap"` attribute when specified', () => {
  render(<ChipGroup flow="nowrap">Fake child</ChipGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-flow', 'nowrap')
})

test('chip group list has `data-overflow="auto"` attribute when specified', () => {
  render(<ChipGroup overflow="auto">Fake child</ChipGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-overflow', 'auto')
})

test('forwards additional props to the list element', () => {
  render(<ChipGroup data-testid="test-id">Test Tag</ChipGroup>)
  expect(screen.getByTestId('test-id')).toBeVisible()
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('list'))
})
