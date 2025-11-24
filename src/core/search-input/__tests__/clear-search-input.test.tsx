import { FormEventHandler } from 'react'
import { clearSearchInput } from '../clear-search-input'
import { render, screen } from '@testing-library/react'

test('clears the input value', () => {
  render(<input defaultValue="test value" type="text" />)
  const input = screen.getByRole('textbox') as HTMLInputElement

  clearSearchInput(input)

  expect(input).toHaveValue('')
})

test('dispatches an input event', () => {
  const handler = vi.fn()
  render(<input defaultValue="test value" onInput={handler} type="text" />)

  clearSearchInput(screen.getByRole('textbox'))

  expect(handler).toHaveBeenCalledTimes(1)
})

test('dispatches a bubbling input event', () => {
  const handler = vi.fn()
  render(
    <div onInput={handler}>
      <input defaultValue="test value" type="text" />
    </div>,
  )

  clearSearchInput(screen.getByRole('textbox'))

  expect(handler).toHaveBeenCalledTimes(1)
})

test('dispatches a cancelable input event', () => {
  expect.assertions(2)

  const handler = vi.fn<FormEventHandler<HTMLDivElement>>((event) => {
    expect(event.cancelable).toBe(true)
  })
  render(<input defaultValue="test value" onInput={handler} type="text" />)

  clearSearchInput(screen.getByRole('textbox'))

  expect(handler).toHaveBeenCalledTimes(1)
})
