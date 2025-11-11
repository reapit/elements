import { render, screen } from '@testing-library/react'
import { focusInputOrListbox } from '../focus-input-or-listbox'

afterEach(() => {
  document.body.innerHTML = ''
})

test('focuses listbox child', () => {
  render(
    <div data-testid="parent">
      <div role="listbox" tabIndex={-1} />
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('listbox')).toHaveFocus()
})

test('focuses search input child', () => {
  render(
    <div data-testid="parent">
      <input type="search" />
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('searchbox')).toHaveFocus()
})

test('focuses text input child', () => {
  render(
    <div data-testid="parent">
      <input type="text" />
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('textbox')).toHaveFocus()
})

test('prioritizes input over listbox when both exist', () => {
  render(
    <div data-testid="parent">
      <input type="search" />
      <div role="listbox" tabIndex={-1} />
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('searchbox')).toHaveFocus()
  expect(screen.getByRole('listbox')).not.toHaveFocus()
})

test('does nothing when element has no children', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  expect(() => focusInputOrListbox(div)).not.toThrow()
})

test('does nothing when no matching child is found', () => {
  render(
    <div data-testid="parent">
      <button>Click me</button>
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('button')).not.toHaveFocus()
})

test('focuses nested input within children', () => {
  render(
    <div data-testid="parent">
      <div>
        <input type="search" />
      </div>
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('searchbox')).toHaveFocus()
})

test('focuses nested listbox within children', () => {
  render(
    <div data-testid="parent">
      <div>
        <div role="listbox" tabIndex={-1} />
      </div>
    </div>,
  )
  const parent = screen.getByTestId('parent')

  focusInputOrListbox(parent)

  expect(screen.getByRole('listbox')).toHaveFocus()
})
