import { ChipGroup } from '../chip-group'
import { ChipGroupItem } from '../chip-group-item'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

test('renders a chip with a list item ancestor', () => {
  render(
    <ChipGroup variant="filter">
      <ChipGroupItem>Label</ChipGroupItem>
    </ChipGroup>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })
  const listItem = screen.getByRole('listitem')

  expect(chip).toBeVisible()
  expect(listItem).toBeVisible()
  expect(chip.parentElement).toBe(listItem)
})

test('applies props from ChipGroupContext', () => {
  render(
    <ChipGroup aria-disabled disabled variant="selection">
      <ChipGroupItem>Label</ChipGroupItem>
    </ChipGroup>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })

  expect(chip).toHaveAttribute('aria-disabled', 'true')
  expect(chip).toBeDisabled()
  expect(chip).toHaveAttribute('data-variant', 'selection')
})

test('props from ChipGroupContext can be overridden', () => {
  render(
    <ChipGroup aria-disabled disabled variant="selection">
      <ChipGroupItem aria-disabled={false} disabled={false} variant="filter">
        Label
      </ChipGroupItem>
    </ChipGroup>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })

  expect(chip).toHaveAttribute('aria-disabled', 'false')
  expect(chip).not.toBeDisabled()
  expect(chip).toHaveAttribute('data-variant', 'filter')
})

test('throws error when used outside ChipGroup context', () => {
  expect(() => {
    render(<ChipGroupItem>Label</ChipGroupItem>)
  }).toThrow('useChipGroupContext requires a ChipGroup ancestor')
})
