import { ChipGroupItem } from '../chip-group-item'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

test('renders a chip with a list item ancestor', () => {
  render(<ChipGroupItem variant="filter">Label</ChipGroupItem>)
  const chip = screen.getByRole('button', { name: 'Label' })
  const listItem = screen.getByRole('listitem')

  expect(chip).toBeVisible()
  expect(listItem).toBeVisible()
  expect(chip.parentElement).toBe(listItem)
})
