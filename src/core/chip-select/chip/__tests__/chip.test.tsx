import { ChipSelectChip } from '../chip'
import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

test('renders as checkbox element', () => {
  render(
    <ChipSelectChip size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox')).toBeVisible()
})

test('checkbox is correctly labelled', () => {
  render(
    <ChipSelectChip size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox', { name: 'Label' })).toBeVisible()
})

test('applies readOnly attribute to checkbox when read-only', () => {
  render(
    <ChipSelectChip readOnly size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox')).toHaveAttribute('readonly')
})

test('checked state does not change when read-only', () => {
  render(
    <ChipSelectChip readOnly size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  fireEvent.click(screen.getByRole('checkbox'))
  expect(screen.getByRole('checkbox')).not.toBeChecked()
})

test('calls `onClick` when clicked', () => {
  const handleClick = vi.fn()
  render(
    <ChipSelectChip onClick={handleClick} readOnly size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  fireEvent.click(screen.getByText('Label'))
  expect(handleClick).toHaveBeenCalled()
})

test('calls `onChange` when clicked', () => {
  const onClick = vi.fn()
  const onChange = vi.fn()
  render(
    <ChipSelectChip onClick={onClick} onChange={onChange} size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  fireEvent.click(screen.getByRole('checkbox'))
  expect(onChange).toHaveBeenCalled()
})

test('does not call `onChange` when read-only', () => {
  const handleChange = vi.fn()
  render(
    <ChipSelectChip onChange={handleChange} readOnly size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  fireEvent.click(screen.getByText('Label'))
  expect(handleChange).not.toHaveBeenCalled()
})

test('checkbox has `type="checkbox"` attribute', () => {
  render(
    <ChipSelectChip size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox')
})

test('checkbox is unchecked by default', () => {
  render(
    <ChipSelectChip size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox')).not.toBeChecked()
})

test('checkbox is checked when `checked` prop is true', () => {
  render(
    <ChipSelectChip checked onChange={vi.fn()} size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox')).toBeChecked()
})

test('checkbox is disabled when `disabled` prop is true', () => {
  render(
    <ChipSelectChip disabled size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByRole('checkbox')).toBeDisabled()
})

test('disabled checkbox does not call `onChange`', () => {
  const handleChange = vi.fn()
  render(
    <ChipSelectChip disabled onChange={handleChange} size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  fireEvent.click(screen.getByRole('checkbox'))
  expect(handleChange).not.toHaveBeenCalled()
})

test('applies `aria-label` to the root element', () => {
  const { container } = render(<ChipSelectChip aria-label="Test label" size="small" value="foo" />)
  expect(container.firstElementChild).toHaveAttribute('aria-label', 'Test label')
})

test('applies `data-size` to the root element', () => {
  const { container } = render(<ChipSelectChip aria-label="Test label" size="large" value="foo" />)
  expect(container.firstElementChild).toHaveAttribute('data-size', 'large')
})

test('applies `data-exclusive` to the input element', () => {
  const { rerender } = render(<ChipSelectChip isExclusive size="large" value="foo" />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-exclusive', 'true')

  rerender(<ChipSelectChip size="large" value="foo" />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-exclusive', 'false')
})

test('applies `data-overflow="truncate"` to label text when `overflow="truncate"` is provided', () => {
  render(
    <ChipSelectChip overflow="truncate" size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByText('Label')).toHaveAttribute('data-overflow', 'truncate')
})

test('displays the icon when provided', () => {
  render(<ChipSelectChip icon="Fake icon" size="small" value="foo" />)
  expect(screen.getByText('Fake icon')).toBeVisible()
})

test('icon is `aria-hidden`', () => {
  render(<ChipSelectChip icon="Fake icon" size="small" value="foo" />)
  expect(screen.getByText('Fake icon')).toHaveAttribute('aria-hidden', 'true')
})

test('forwards ref to the checkbox input', () => {
  const ref = vi.fn()
  render(
    <ChipSelectChip ref={ref} size="small" value="foo">
      Label
    </ChipSelectChip>,
  )
  expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
})

test('forwards additional attributes to the checkbox', () => {
  render(
    <ChipSelectChip data-testid="custom-chip" name="test-name" size="small" value="test-value">
      Label
    </ChipSelectChip>,
  )
  expect(screen.getByTestId('custom-chip')).toBe(screen.getByRole('checkbox'))
})

test('prevents other chips being selected when `isExclusive`', () => {
  render(
    <form>
      <ChipSelectChip isExclusive name="test" size="small" value="foo">
        Foo
      </ChipSelectChip>
      <ChipSelectChip isExclusive name="test" size="small" value="bar">
        Bar
      </ChipSelectChip>
    </form>,
  )
  expect(screen.getByRole('checkbox', { name: 'Foo' })).not.toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Bar' })).not.toBeChecked()

  fireEvent.click(screen.getByRole('checkbox', { name: 'Foo' }))
  expect(screen.getByRole('checkbox', { name: 'Foo' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Bar' })).not.toBeChecked()

  fireEvent.click(screen.getByRole('checkbox', { name: 'Bar' }))
  expect(screen.getByRole('checkbox', { name: 'Foo' })).not.toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Bar' })).toBeChecked()
})

test('allows other chips to be selected when NOT `isExclusive`', () => {
  render(
    <form>
      <ChipSelectChip name="test" size="small" value="foo">
        Foo
      </ChipSelectChip>
      <ChipSelectChip name="test" size="small" value="bar">
        Bar
      </ChipSelectChip>
    </form>,
  )
  expect(screen.getByRole('checkbox', { name: 'Foo' })).not.toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Bar' })).not.toBeChecked()

  fireEvent.click(screen.getByRole('checkbox', { name: 'Foo' }))
  expect(screen.getByRole('checkbox', { name: 'Foo' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Bar' })).not.toBeChecked()

  fireEvent.click(screen.getByRole('checkbox', { name: 'Bar' }))
  expect(screen.getByRole('checkbox', { name: 'Foo' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Bar' })).toBeChecked()
})
