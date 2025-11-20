import { ComboboxPopupDialog } from '../popup-dialog'
import { useCloseComboboxPopupOnClick } from '../use-close-on-click'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('../use-close-on-click')

beforeEach(() => {
  vi.mocked(useCloseComboboxPopupOnClick).mockImplementation((onClick) => (event) => onClick?.(event))
})

test('renders as a dialog element', () => {
  render(
    // In all these tests, we render the dialog with `open` so that it, and its content, are visible.
    <ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>,
  )
  expect(screen.getByRole('dialog')).toBeVisible()
})

test('renders its children', () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>)
  expect(screen.getByText('Content')).toBeVisible()
})

test('applies aria-labelledby attribute', () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>)
  expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'label-id')
})

test('applies id attribute', () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>)
  expect(screen.getByRole('dialog')).toHaveAttribute('id', 'popup-id')
})

test('applies auto variant by default', () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>)
  expect(screen.getByRole('dialog')).toHaveAttribute('data-variant', 'auto')
})

test('applies custom data-variant attribute', () => {
  render(
    <ComboboxPopupDialog {...defaultProps} variant="drawer">
      Content
    </ComboboxPopupDialog>,
  )
  expect(screen.getByRole('dialog')).toHaveAttribute('data-variant', 'drawer')
})

test('accepts maxHeight prop', () => {
  render(
    <ComboboxPopupDialog {...defaultProps} maxHeight="500px">
      Content
    </ComboboxPopupDialog>,
  )
  expect(screen.getByRole('dialog')).toHaveStyle('max-height: 500px')
})

test('accepts maxWidth prop', () => {
  render(
    <ComboboxPopupDialog {...defaultProps} maxWidth="500px">
      Content
    </ComboboxPopupDialog>,
  )
  expect(screen.getByRole('dialog')).toHaveStyle('max-width: 500px')
})

test('calls useCloseComboboxPopupOnClick with wrapped onClick handler', () => {
  const onClick = vi.fn()
  render(
    <ComboboxPopupDialog {...defaultProps} onClick={onClick}>
      Content
    </ComboboxPopupDialog>,
  )

  expect(useCloseComboboxPopupOnClick).toHaveBeenCalledWith(expect.any(Function))
})

test('calls useCloseComboboxPopupOnClick when no onClick provided', () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>)

  expect(useCloseComboboxPopupOnClick).toHaveBeenCalledWith(expect.any(Function))
})

test('uses handler returned by useCloseComboboxPopupOnClick', () => {
  const wrappedHandler = vi.fn()
  vi.mocked(useCloseComboboxPopupOnClick).mockReturnValue(wrappedHandler)

  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>)

  fireEvent.click(screen.getByRole('dialog'))
  expect(wrappedHandler).toHaveBeenCalledTimes(1)
})

test('forwards additional props to dialog', () => {
  render(
    <ComboboxPopupDialog {...defaultProps} data-testid="custom-dialog">
      Content
    </ComboboxPopupDialog>,
  )
  expect(screen.getByTestId('custom-dialog')).toBe(screen.getByRole('dialog'))
})

test('exposes open static method', () => {
  expect(ComboboxPopupDialog.open).toBeDefined()
})

test('exposes close static method', () => {
  expect(ComboboxPopupDialog.close).toBeDefined()
})

test('exposes Context', () => {
  expect(ComboboxPopupDialog.Context).toBeDefined()
})

test('exposes useContext', () => {
  expect(ComboboxPopupDialog.useContext).toBeDefined()
})

const defaultProps = {
  'aria-labelledby': 'label-id',
  id: 'popup-id',
  open: true,
} satisfies Partial<ComboboxPopupDialog.Props>
