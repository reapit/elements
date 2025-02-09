import { ChipGroup } from '../chip-group'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

test('renders its children in a list', () => {
  render(<ChipGroup>Fake child</ChipGroup>)
  const list = screen.getByRole('list')

  expect(list).toBeVisible()
  expect(list).toHaveTextContent('Fake child')
})

test('chip group list has `data-overflow="wrap"` attribute, by default', () => {
  render(<ChipGroup>Fake child</ChipGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-overflow', 'wrap')
})

test('chip group list has `data-overflow="scroll"` attribute when specified', () => {
  render(<ChipGroup overflow="scroll">Fake child</ChipGroup>)
  expect(screen.getByRole('list')).toHaveAttribute('data-overflow', 'scroll')
})
