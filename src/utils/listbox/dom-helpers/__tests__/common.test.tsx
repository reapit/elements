import { getListboxSelectElement, getSelectOptionByValue, dispatchInputEvent } from '../common'
import { render, screen } from '@testing-library/react'

describe('getListboxSelectElement', () => {
  test('returns the select element when it is the first child of the listbox', () => {
    render(
      <div id="test-listbox">
        <select multiple>
          <option value="option1">Option 1</option>
        </select>
      </div>,
    )

    const result = getListboxSelectElement('test-listbox')

    expect(result).toBeInstanceOf(HTMLSelectElement)
    expect(result).toBe(screen.getByRole('listbox'))
  })

  test('throws error when listbox element does not exist', () => {
    expect(() => {
      getListboxSelectElement('non-existent-listbox')
    }).toThrow('Listbox with id "non-existent-listbox" does not exist in the document')
  })

  test('throws error when listbox exists but has no children', () => {
    render(<select id="empty-listbox" />)

    expect(() => {
      getListboxSelectElement('empty-listbox')
    }).toThrow('Listbox "empty-listbox" does not contain a select element as its first child. Found: null')
  })

  test('throws error when first child is not a select element', () => {
    render(
      <div id="invalid-listbox">
        <div>Not a select</div>
      </div>,
    )

    expect(() => {
      getListboxSelectElement('invalid-listbox')
    }).toThrow('Listbox "invalid-listbox" does not contain a select element as its first child. Found: HTMLDivElement')
  })
})

describe('getSelectOptionByValue', () => {
  test('returns the option element with matching value', () => {
    render(
      <select multiple>
        <option value="value1">Option 1</option>
        <option value="value2">Option 2</option>
        <option value="value3">Option 3</option>
      </select>,
    )

    const select = screen.getByRole('listbox') as HTMLSelectElement
    const result = getSelectOptionByValue(select, 'value2')

    expect(result).toBeInstanceOf(HTMLOptionElement)
    expect(result.value).toBe('value2')
    expect(result).toBe(screen.getByRole('option', { name: 'Option 2' }))
  })

  test('returns first matching option when multiple options have same value', () => {
    render(
      <select multiple>
        <option value="duplicate">First</option>
        <option value="duplicate">Second</option>
      </select>,
    )
    const select = screen.getByRole('listbox') as HTMLSelectElement
    const option1 = screen.getByRole('option', { name: 'First' })

    expect(getSelectOptionByValue(select, 'duplicate')).toBe(option1)
  })

  test('throws error when option with value does not exist', () => {
    render(
      <select multiple>
        <option value="existing">Existing Option</option>
      </select>,
    )

    const select = screen.getByRole('listbox') as HTMLSelectElement

    expect(() => {
      getSelectOptionByValue(select, 'non-existent')
    }).toThrow('Option with value "non-existent" does not exist')
  })

  test('throws error when select element has no options', () => {
    const select = document.createElement('select')

    expect(() => {
      getSelectOptionByValue(select, 'any-value')
    }).toThrow('Option with value "any-value" does not exist')
  })
})

describe('dispatchInputEvent', () => {
  test('dispatches an input event on the select element', () => {
    const handleInput = vi.fn()

    render(
      <select multiple onInput={handleInput}>
        <option value="option1">Option 1</option>
      </select>,
    )

    const select = screen.getByRole('listbox') as HTMLSelectElement
    dispatchInputEvent(select)

    expect(handleInput).toHaveBeenCalledTimes(1)
  })

  test('dispatches bubbling input event', () => {
    const handleInput = vi.fn()

    render(
      <div onInput={handleInput}>
        <select multiple>
          <option value="option1">Option 1</option>
        </select>
      </div>,
    )

    const select = screen.getByRole('listbox') as HTMLSelectElement
    dispatchInputEvent(select)

    expect(handleInput).toHaveBeenCalledTimes(1)
  })

  test('dispatches cancelable input event', () => {
    expect.assertions(2)

    const handleInput = vi.fn((event) => {
      expect(event).not.toBeNull()
      expect(event.cancelable).toBe(true)
    })

    render(
      <select multiple onInput={handleInput}>
        <option value="option1">Option 1</option>
      </select>,
    )

    const select = screen.getByRole('listbox') as HTMLSelectElement
    dispatchInputEvent(select)
  })
})
