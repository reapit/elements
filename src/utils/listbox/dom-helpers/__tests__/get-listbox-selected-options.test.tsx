import { render } from '@testing-library/react'
import { getListboxSelectedOptions } from '../get-listbox-selected-options'

test('returns empty array when no options are selected', () => {
  const { container } = render(
    <div role="listbox">
      <button role="option" aria-selected="false" value="1">
        Option 1
      </button>
      <button role="option" aria-selected="false" value="2">
        Option 2
      </button>
    </div>,
  )

  const listbox = container.querySelector('[role="listbox"]') as HTMLElement
  expect(getListboxSelectedOptions(listbox)).toEqual([])
})

test('returns selected option with aria-selected="true"', () => {
  const { container } = render(
    <div role="listbox">
      <button role="option" aria-selected="false" value="1">
        Option 1
      </button>
      <button role="option" aria-selected="true" value="2">
        Option 2
      </button>
    </div>,
  )

  const listbox = container.querySelector('[role="listbox"]') as HTMLElement
  const selected = getListboxSelectedOptions(listbox)

  expect(selected).toHaveLength(1)
  expect(selected[0]).toHaveTextContent('Option 2')
})

test('returns selected option with aria-checked="true"', () => {
  const { container } = render(
    <div role="listbox">
      <button role="option" aria-checked="false" value="1">
        Option 1
      </button>
      <button role="option" aria-checked="true" value="2">
        Option 2
      </button>
    </div>,
  )

  const listbox = container.querySelector('[role="listbox"]') as HTMLElement
  const selected = getListboxSelectedOptions(listbox)

  expect(selected).toHaveLength(1)
  expect(selected[0]).toHaveTextContent('Option 2')
})

test('returns multiple selected options', () => {
  const { container } = render(
    <div role="listbox">
      <button role="option" aria-selected="true" value="1">
        Option 1
      </button>
      <button role="option" aria-selected="false" value="2">
        Option 2
      </button>
      <button role="option" aria-checked="true" value="3">
        Option 3
      </button>
    </div>,
  )

  const listbox = container.querySelector('[role="listbox"]') as HTMLElement
  const selected = getListboxSelectedOptions(listbox)

  expect(selected).toHaveLength(2)
  expect(selected[0]).toHaveTextContent('Option 1')
  expect(selected[1]).toHaveTextContent('Option 3')
})

test('ignores non-button elements with role="option"', () => {
  const { container } = render(
    <div role="listbox">
      <button role="option" aria-selected="true" value="1">
        Option 1
      </button>
      <div role="option" aria-selected="true">
        Option 2
      </div>
    </div>,
  )

  const listbox = container.querySelector('[role="listbox"]') as HTMLElement
  const selected = getListboxSelectedOptions(listbox)

  expect(selected).toHaveLength(1)
  expect(selected[0]).toHaveTextContent('Option 1')
})

test('works with nested option structures', () => {
  const { container } = render(
    <div role="listbox">
      <div>
        <button role="option" aria-selected="true" value="1">
          Nested Option 1
        </button>
      </div>
      <div>
        <button role="option" aria-selected="false" value="2">
          Nested Option 2
        </button>
      </div>
    </div>,
  )

  const listbox = container.querySelector('[role="listbox"]') as HTMLElement
  const selected = getListboxSelectedOptions(listbox)

  expect(selected).toHaveLength(1)
  expect(selected[0]).toHaveTextContent('Nested Option 1')
})
