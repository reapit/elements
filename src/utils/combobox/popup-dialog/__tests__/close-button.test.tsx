import { ComboboxPopupDialogCloseButton } from '../close-button'
import { fireEvent, render, screen } from '@testing-library/react'

test('renders a button', () => {
  render(<ComboboxPopupDialogCloseButton />)
  const button = screen.getByRole('button', { name: 'Close' })
  expect(button).toBeVisible()
})

test('button will close a parent dialog', () => {
  render(
    <dialog open>
      <ComboboxPopupDialogCloseButton />
    </dialog>,
  )
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('dialog', { hidden: true })).not.toBeVisible()
})

test('button will not submit a parent form', () => {
  const onSubmit = vi.fn()
  render(
    <form onSubmit={onSubmit}>
      <ComboboxPopupDialogCloseButton />
    </form>,
  )
  fireEvent.click(screen.getByRole('button'))
  expect(onSubmit).not.toHaveBeenCalled()
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('button has the expected icon', () => {
  render(<ComboboxPopupDialogCloseButton />)
  const button = screen.getByRole('button')
  expect(button.querySelector('svg')).toBeInTheDocument()
})
