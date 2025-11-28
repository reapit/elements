import { CompactSelect } from '../compact-select'
import { render, screen } from '@testing-library/react'

test('renders a combobox', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('renders with dialog', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders with listbox', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('listbox', { hidden: true })).toBeInTheDocument()
})

test('can be disabled', () => {
  render(
    <CompactSelect disabled>
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('supports small size', () => {
  const { container } = render(
    <CompactSelect size="small">
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(container.querySelector('[data-size="small"]')).toBeVisible()
})

test('supports medium size', () => {
  const { container } = render(
    <CompactSelect size="medium">
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(container.querySelector('[data-size="medium"]')).toBeVisible()
})

test('supports large size', () => {
  const { container } = render(
    <CompactSelect size="large">
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(container.querySelector('[data-size="large"]')).toBeVisible()
})

test('forwards additional props to underlying element', () => {
  render(
    <CompactSelect data-testid="my-CompactSelect" className="custom-class">
      <CompactSelect.Button />
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByTestId('my-CompactSelect')).toBeVisible()
  expect(screen.getByTestId('my-CompactSelect')).toHaveClass('custom-class')
})

test('exposes Button component', () => {
  expect(CompactSelect.Button).toBeDefined()
})

test('exposes Divider component', () => {
  expect(CompactSelect.Divider).toBeDefined()
})

test('exposes Listbox component', () => {
  expect(CompactSelect.Listbox).toBeDefined()
})

test('exposes Option component', () => {
  expect(CompactSelect.Option).toBeDefined()
})

test('exposes OptionAdditionalInfo component', () => {
  expect(CompactSelect.OptionAdditionalInfo).toBeDefined()
})

test('exposes Optgroup component', () => {
  expect(CompactSelect.Optgroup).toBeDefined()
})

test('exposes Popup component', () => {
  expect(CompactSelect.Popup).toBeDefined()
})

test('exposes getValue utility function', () => {
  expect(CompactSelect.getValue).toBeDefined()
})

test('exposes getListboxId utility function', () => {
  expect(CompactSelect.getListboxId).toBeDefined()
})

test('exposes getPopupId utility function', () => {
  expect(CompactSelect.getPopupId).toBeDefined()
})

test('exposes useState hook', () => {
  expect(CompactSelect.useState).toBeDefined()
})
