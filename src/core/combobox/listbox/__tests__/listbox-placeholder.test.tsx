import { ComboboxContext } from '../../context'
import { ComboboxListboxPlaceholder } from '../listbox-placeholder'
import { ListboxRenderContext } from '#src/utils/listbox'
import { render, screen } from '@testing-library/react'

test('renders status element', () => {
  render(
    <ComboboxContext.Provider value={{ size: 'medium' } as ComboboxContext.Value}>
      <ListboxRenderContext.Provider value="custom">
        <ComboboxListboxPlaceholder>No options available</ComboboxListboxPlaceholder>
      </ListboxRenderContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('status')).toBeVisible()
})

test('renders placeholder text in custom render context', () => {
  render(
    <ComboboxContext.Provider value={{ size: 'medium' } as ComboboxContext.Value}>
      <ListboxRenderContext.Provider value="custom">
        <ComboboxListboxPlaceholder>No options available</ComboboxListboxPlaceholder>
      </ListboxRenderContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByText('No options available')).toBeVisible()
})

test('renders nothing in native render context', () => {
  render(
    <ComboboxContext.Provider value={{ size: 'medium' } as ComboboxContext.Value}>
      <ListboxRenderContext.Provider value="native">
        <ComboboxListboxPlaceholder>No results found</ComboboxListboxPlaceholder>
      </ListboxRenderContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.queryByRole('status')).toBeNull()
})

test('has aria-live="polite"', () => {
  render(
    <ComboboxContext.Provider value={{ size: 'medium' } as ComboboxContext.Value}>
      <ListboxRenderContext.Provider value="custom">
        <ComboboxListboxPlaceholder>No results found</ComboboxListboxPlaceholder>
      </ListboxRenderContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
})

test('applies size from ComboboxContext', () => {
  render(
    <ComboboxContext.Provider value={{ size: 'large' } as ComboboxContext.Value}>
      <ListboxRenderContext.Provider value="custom">
        <ComboboxListboxPlaceholder>No results found</ComboboxListboxPlaceholder>
      </ListboxRenderContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('status')).toHaveAttribute('data-size', 'large')
})

test('forwards additional attributes to the status element', () => {
  render(
    <ComboboxContext.Provider value={{ size: 'medium' } as ComboboxContext.Value}>
      <ListboxRenderContext.Provider value="custom">
        <ComboboxListboxPlaceholder data-testid="placeholder" className="custom-class">
          No results found
        </ComboboxListboxPlaceholder>
      </ListboxRenderContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByTestId('placeholder')).toBe(screen.getByRole('status'))
})
