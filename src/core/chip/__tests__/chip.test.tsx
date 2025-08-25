import { Chip } from '../chip'
import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

test('renders as a <button> element', () => {
  render(<Chip variant="filter">Label</Chip>)
  expect(screen.getByRole('button', { name: 'Label' })).toBeVisible()
})

test('calls `onClick`', () => {
  const handleClick = vi.fn()
  render(
    <Chip onClick={handleClick} variant="filter">
      Label
    </Chip>,
  )
  fireEvent.click(screen.getByRole('button', { name: 'Label' }))
  expect(handleClick).toHaveBeenCalled()
})

test('filter chip has `data-variant="filter"` attribute', () => {
  render(<Chip variant="filter">Label</Chip>)
  expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute('data-variant', 'filter')
})

test('selection chip has `data-variant="selection"` attribute', () => {
  render(<Chip variant="selection">Label</Chip>)
  expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute('data-variant', 'selection')
})

test('chip has `type="button"` attribute', () => {
  render(<Chip variant="selection">Label</Chip>)
  expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute('type', 'button')
})

test('chip has no `aria-disabled` attribute when enabled', () => {
  render(<Chip variant="selection">Label</Chip>)
  expect(screen.getByRole('button', { name: 'Label' })).not.toHaveAttribute('aria-disabled')
})

test('chip label has `data-overflow="truncate"` attribute when `overflow="truncate"` is provided', () => {
  render(
    <Chip overflow="truncate" variant="selection">
      Label
    </Chip>,
  )
  expect(screen.getByText('Label')).toHaveAttribute('data-overflow', 'truncate')
})

test('ARIA disabled chip does not call `onClick`', () => {
  const fakeClick = vi.fn()
  render(
    <Chip aria-disabled="true" onClick={fakeClick} variant="filter">
      Label
    </Chip>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })
  fireEvent.click(chip)

  expect(fakeClick).not.toHaveBeenCalled()
})

test('ARIA disabled chip prevents click events from propagating', () => {
  const parentClickHandler = vi.fn()
  render(
    <div onClick={parentClickHandler}>
      <Chip aria-disabled="true" variant="filter">
        Label
      </Chip>
    </div>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })
  fireEvent.click(chip)

  expect(parentClickHandler).not.toHaveBeenCalled()
})
