import { ListboxContext } from '../../context'
import { ListboxRenderContext } from '../../render-context'
import { ListboxOption } from '../option'
import { fireEvent, render, screen } from '@testing-library/react'
import { setListboxOptionSelectedState } from '../../dom-helpers'

vi.mock('../../dom-helpers')

beforeEach(() => {
  vi.mocked(setListboxOptionSelectedState).mockClear()
})

describe('in a "native" render context', () => {
  test('renders nothing when selected', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, selectValue: ['option-1'] }}>
        <ListboxRenderContext.Provider value="native">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.queryByRole('option', { name: 'Option 1' })).not.toBeInTheDocument()
  })

  test('renders as an option element when NOT selected', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="native">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    const group = screen.getByRole('option', { name: 'Option 1' })
    expect(group).toBeVisible()
    expect(group.tagName).toBe('OPTION')
  })

  test('forwards value to option element', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="native">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('value', 'option-1')
  })

  test('does NOT forward additional props to the option', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="native">
          <ListboxOption as={CustomTestOption} data-testid="test-id" value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.queryByTestId('test-id')).not.toBeInTheDocument()
  })
})

describe('in a "custom" render context', () => {
  test('renders as an option element', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeVisible()
  })

  test('is aria-checked when selected and multiple=true', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, multiple: true, selectValue: ['option-1'] }}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('aria-checked', 'true')
  })

  test('is aria-selected when selected and multiple=false', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, selectValue: ['option-1'] }}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })

  test('is disabled when the listbox is disabled', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, disabled: true }}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toBeDisabled()
  })

  test('has data-listbox-id attribute', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('data-listbox-id', defaultContext.listboxId)
  })

  test('has data-select-action attribute', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('data-select-action', defaultContext.selectAction)
  })

  test('calls consumer-supplied onClick when clicked', () => {
    const onClick = vi.fn()
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1" onClick={onClick}>
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    fireEvent.click(screen.getByRole('option'))
    expect(onClick).toHaveBeenCalled()
  })

  test('selects the option when clicked', () => {
    const onClick = vi.fn()
    render(
      <ListboxContext.Provider value={{ ...defaultContext }}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1" onClick={onClick}>
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    fireEvent.click(screen.getByRole('option'))
    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('my-listbox', 'option-1', expect.any(Function))
  })

  test('forwards value to button element', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('value', 'option-1')
  })

  test('forwards additional attributes to the option element', () => {
    render(
      <ListboxContext.Provider value={defaultContext}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} data-testid="test-id" value="option-1">
            Option 1
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByTestId('test-id')).toBe(screen.getByRole('option'))
  })
})

describe('empty value selection logic', () => {
  test('selects option with empty value when selectValue is empty', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, selectValue: [] }}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="">
            Empty Option
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })

  test('does not select option with empty value when selectValue has values', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, selectValue: ['other-value'] }}>
        <ListboxRenderContext.Provider value="custom">
          <ListboxOption as={CustomTestOption} value="">
            Empty Option
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false')
  })

  test('renders nothing in native context when empty value is selected', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, selectValue: [] }}>
        <ListboxRenderContext.Provider value="native">
          <ListboxOption as={CustomTestOption} value="">
            Empty Option
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  test('renders option element in native context when empty value is not selected', () => {
    render(
      <ListboxContext.Provider value={{ ...defaultContext, selectValue: ['other-value'] }}>
        <ListboxRenderContext.Provider value="native">
          <ListboxOption as={CustomTestOption} value="">
            Empty Option
          </ListboxOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>,
    )
    expect(screen.getByRole('option')).toBeInTheDocument()
  })
})

const defaultContext: ListboxContext.Value = {
  disabled: false,
  listboxId: 'my-listbox',
  multiple: false,
  selectAction: 'toggle',
  selectValue: [],
}

function CustomTestOption(props: ListboxOption.BaseProps) {
  return <button {...props} />
}
