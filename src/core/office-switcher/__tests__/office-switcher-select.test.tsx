import { OfficeSwitcher } from '../office-switcher'
import { OfficeSwitcherSelect } from '../office-switcher-select'
import { render, screen } from '@testing-library/react'

test('renders a combobox', () => {
  render(
    <OfficeSwitcherSelect>
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('renders with dialog', () => {
  render(
    <OfficeSwitcherSelect>
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders with tree listbox', () => {
  render(
    <OfficeSwitcherSelect>
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(screen.getByRole('tree', { hidden: true })).toBeInTheDocument()
})

test('can be disabled', () => {
  render(
    <OfficeSwitcherSelect disabled>
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('supports small size', () => {
  const { container } = render(
    <OfficeSwitcherSelect size="small">
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(container.querySelector('[data-size="small"]')).toBeVisible()
})

test('supports medium size', () => {
  const { container } = render(
    <OfficeSwitcherSelect size="medium">
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(container.querySelector('[data-size="medium"]')).toBeVisible()
})

test('supports large size', () => {
  const { container } = render(
    <OfficeSwitcherSelect size="large">
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(container.querySelector('[data-size="large"]')).toBeVisible()
})

test('forwards additional props to underlying element', () => {
  render(
    <OfficeSwitcherSelect data-testid="my-OfficeSwitcherSelect" className="custom-class">
      <OfficeSwitcher.Button />
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcherSelect>,
  )
  expect(screen.getByTestId('my-OfficeSwitcherSelect')).toBeVisible()
  expect(screen.getByTestId('my-OfficeSwitcherSelect')).toHaveClass('custom-class')
})

test('exposes Button component', () => {
  expect(OfficeSwitcher.Button).toBeDefined()
})

test('exposes Divider component', () => {
  expect(OfficeSwitcher.Divider).toBeDefined()
})

test('exposes Listbox component', () => {
  expect(OfficeSwitcher.Listbox).toBeDefined()
})

test('exposes Option component', () => {
  expect(OfficeSwitcher.Option).toBeDefined()
})

test('exposes Optgroup component', () => {
  expect(OfficeSwitcher.Optgroup).toBeDefined()
})

test('exposes Popup component', () => {
  expect(OfficeSwitcher.Popup).toBeDefined()
})

test('exposes SearchInput component', () => {
  expect(OfficeSwitcher.SearchInput).toBeDefined()
})

test('exposes getValue utility function', () => {
  expect(OfficeSwitcher.getValue).toBeDefined()
})

test('exposes getListboxId utility function', () => {
  expect(OfficeSwitcher.getListboxId).toBeDefined()
})

test('exposes getPopupId utility function', () => {
  expect(OfficeSwitcher.getPopupId).toBeDefined()
})

test('exposes useState hook', () => {
  expect(OfficeSwitcher.useState).toBeDefined()
})
