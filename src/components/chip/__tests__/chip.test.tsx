import { Chip } from '../chip'
import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

test('renders as a <button> element', () => {
  render(<Chip variant="filter">Label</Chip>)
  expect(screen.getByRole('button', { name: 'Label' })).toBeVisible()
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

test('chip label has `data-will-truncate="true"` attribute when `willTruncateLabel` is provided', () => {
  render(
    <Chip willTruncateLabel variant="selection">
      Label
    </Chip>,
  )
  expect(screen.getByText('Label')).toHaveAttribute('data-will-truncate', 'true')
})

test('disabled chip has `aria-disabled="true"` attribute', () => {
  render(
    <Chip isDisabled variant="filter">
      Label
    </Chip>,
  )
  expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute('aria-disabled', 'true')
})

test('disabled chip does not call `onClick`', () => {
  const fakeClick = vi.fn()
  render(
    <Chip isDisabled onClick={fakeClick} variant="filter">
      Label
    </Chip>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })
  fireEvent.click(chip)

  expect(fakeClick).not.toHaveBeenCalled()
})

test('disabled chip prevents click events from propagating', () => {
  const parentClickHandler = vi.fn()
  render(
    <div onClick={parentClickHandler}>
      <Chip isDisabled variant="filter">
        Label
      </Chip>
    </div>,
  )
  const chip = screen.getByRole('button', { name: 'Label' })
  fireEvent.click(chip)

  expect(parentClickHandler).not.toHaveBeenCalled()
})
