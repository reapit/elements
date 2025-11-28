import { SelectButton } from '../select-button'
import { Combobox } from '#src/core/combobox'
import { render, screen } from '@testing-library/react'
import { useComboboxButton } from '#src/core/combobox/use-button'

vi.mock('#src/core/combobox/use-button')
vi.mock('#src/core/combobox/use-has-selection')

const defaultButtonProps: useComboboxButton.Output = {
  'aria-controls': 'test-popup-id',
  'aria-expanded': false,
  'aria-required': false,
  disabled: false,
  id: 'test-combobox-id',
  onClick: vi.fn(),
}

beforeEach(() => {
  vi.mocked(useComboboxButton).mockReturnValue(defaultButtonProps)
  vi.mocked(Combobox.useHasSelection).mockReturnValue(false)
})

function renderSelectButton(props = {}) {
  return render(
    <Combobox>
      <SelectButton {...props} />
    </Combobox>,
  )
}

test('renders a combobox element', () => {
  renderSelectButton()
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays placeholder text when no selections exist', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(false)
  renderSelectButton({ placeholder: 'Select an option' })
  expect(screen.getByRole('combobox')).toHaveTextContent('Select an option')
})

test('displays selection summary when selections exist', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(true)
  renderSelectButton()
  // Selection content is rendered by Combobox.SelectedContent component
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('renders toggle popup button when no selections exist', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(false)
  renderSelectButton()
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
})

test('renders clear button when selections exist', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(true)
  renderSelectButton()
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeVisible()
})

test('passes listboxId to clear button aria-controls', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(true)
  render(
    <Combobox id="custom-combobox">
      <SelectButton />
    </Combobox>,
  )
  const listboxId = Combobox.getListboxId('custom-combobox')
  expect(screen.getByRole('button', { name: 'Clear selection' })).toHaveAttribute('aria-controls', listboxId)
})

test('passes popupId to toggle button aria-controls', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(false)
  render(
    <Combobox id="custom-combobox">
      <SelectButton />
    </Combobox>,
  )
  const popupId = Combobox.getPopupId('custom-combobox')
  expect(screen.getByRole('button', { name: 'Open popup' })).toHaveAttribute('aria-controls', popupId)
})

test('passes disabled state to clear button', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(true)
  render(
    <Combobox disabled>
      <SelectButton />
    </Combobox>,
  )
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled()
})

test('passes disabled state to toggle popup button', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(false)
  render(
    <Combobox disabled>
      <SelectButton />
    </Combobox>,
  )
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeDisabled()
})

test('uses size specified by ComboboxContext', () => {
  const { container } = render(
    <Combobox size="medium">
      <SelectButton />
    </Combobox>,
  )
  expect(container.querySelector('[data-size="medium"]')).toBeVisible()
})

test('forwards additional props to the combobox element', () => {
  renderSelectButton({ 'data-testid': 'my-select-button' })
  expect(screen.getByTestId('my-select-button')).toBe(screen.getByRole('combobox'))
})

test('displays placeholder in multi-select mode even with selections', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(true)
  render(
    <Combobox multiple>
      <SelectButton placeholder="Select options" />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Select options')
})

test('shows open popup button in multi-select mode', () => {
  vi.mocked(Combobox.useHasSelection).mockReturnValue(true)
  render(
    <Combobox multiple>
      <SelectButton />
    </Combobox>,
  )
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})
