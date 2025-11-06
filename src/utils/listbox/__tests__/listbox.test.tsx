import { Listbox } from '../listbox'
import { ListboxContext } from '../context'
import { ListboxRenderContext } from '../render-context'
import { render, screen, fireEvent } from '@testing-library/react'

describe('in single-select mode', () => {
  test('renders a listbox element with a hidden combobox', () => {
    render(
      <Listbox>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toBeVisible()
    expect(screen.getByRole('combobox', { hidden: true })).toBeInTheDocument()
  })

  test('sets aria-multiselectable to false by default', () => {
    render(
      <Listbox>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'false')
  })

  test('sets data-selection-follows-focus to true by default', () => {
    render(
      <Listbox>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toHaveAttribute('data-selection-follows-focus', 'true')
  })

  test('can override data-selection-follows-focus', () => {
    render(
      <Listbox aria-multiselectable selectionFollowsFocus={false}>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toHaveAttribute('data-selection-follows-focus', 'false')
  })
})

describe('in multi-select mode', () => {
  test('renders a listbox element with a hidden listbox', () => {
    render(
      <Listbox aria-multiselectable>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    const [visibleListbox, hiddenListbox] = screen.getAllByRole('listbox', { hidden: true })
    expect(visibleListbox).toBeVisible()
    expect(hiddenListbox).toBeInTheDocument()
  })

  test('sets aria-multiselectable to true', () => {
    render(
      <Listbox aria-multiselectable>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true')
  })

  test('sets data-selection-follows-focus to false by default', () => {
    render(
      <Listbox aria-multiselectable>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toHaveAttribute('data-selection-follows-focus', 'false')
  })

  test('can override data-selection-follows-focus', () => {
    render(
      <Listbox aria-multiselectable selectionFollowsFocus>
        <option value="option1">Option 1</option>
      </Listbox>,
    )
    expect(screen.getByRole('listbox')).toHaveAttribute('data-selection-follows-focus', 'true')
  })
})

test('renders children in both native and display contexts', () => {
  render(
    <Listbox>
      <ListboxRenderContext.Consumer>
        {(renderContext) => <option>{renderContext}</option>}
      </ListboxRenderContext.Consumer>
    </Listbox>,
  )
  // Should render in both native and display contexts
  expect(screen.getByText('native')).toBeInTheDocument()
  expect(screen.getByText('display')).toBeVisible()
})

test('provides `ListboxContext` to descendants', () => {
  // We expect two assertions because the ListboxContext.Consumer is rendered twice,
  // once in the native render context and the other in the display render context
  expect.assertions(2)

  render(
    <Listbox>
      <ListboxContext.Consumer>
        {(context) => {
          expect(context).toMatchInlineSnapshot(`
            {
              "listboxId": ":rj:",
              "multiple": false,
              "selectAction": "toggle",
              "selectValue": [],
            }
          `)
          return null
        }}
      </ListboxContext.Consumer>
    </Listbox>,
  )
})

test('has tabindex to 0 initially', () => {
  render(
    <Listbox>
      <option value="option1">Option 1</option>
    </Listbox>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('tabIndex', '0')
})

test('has generated ID, by default', () => {
  render(
    <Listbox>
      <option value="option1">Option 1</option>
    </Listbox>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('id')
})

test('can accept consumer-supplied ID', () => {
  render(
    <Listbox id="custom-listbox">
      <option value="option1">Option 1</option>
    </Listbox>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('id', 'custom-listbox')
})

test('has default aria-orientation of vertical', () => {
  render(
    <Listbox>
      <option value="option1">Option 1</option>
    </Listbox>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'vertical')
})

test('can accept custom aria-orientation when provided', () => {
  render(
    <Listbox aria-orientation="horizontal">
      <option value="option1">Option 1</option>
    </Listbox>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'horizontal')
})

test('calls onChange when selection changes', () => {
  const handleChange = vi.fn()
  render(
    <Listbox onChange={handleChange}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Listbox>,
  )
  const select = screen.getByRole('combobox', { hidden: true })
  fireEvent.change(select, { target: { value: 'option2' } })
  expect(handleChange).toHaveBeenCalledTimes(1)
})

test('forwards additional props to listbox element', () => {
  render(
    <Listbox data-testid="custom-listbox">
      <option value="option1">Option 1</option>
    </Listbox>,
  )
  expect(screen.getByTestId('custom-listbox')).toBe(screen.getByRole('listbox'))
})
