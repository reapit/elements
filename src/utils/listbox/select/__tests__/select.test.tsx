import { ListboxSelect } from '../select'
import { ListboxRenderContext } from '../../render-context'
import { render, screen, fireEvent } from '@testing-library/react'
import { useContext } from 'react'

test('renders a hidden select element', () => {
  render(
    <ListboxSelect onChange={vi.fn()} value={[]}>
      <option value="option1">Option 1</option>
    </ListboxSelect>,
  )
  const select = screen.getByRole('combobox', { hidden: true })
  expect(select).toBeInTheDocument()
  expect(select).toHaveAttribute('hidden')
})

test('renders options for selected values to preserve selection state', () => {
  // This is important when children might be filtered based on user input
  render(
    <ListboxSelect onChange={vi.fn()} value={['preservedValue']}>
      <option value="differentOption">Different Option</option>
    </ListboxSelect>,
  )

  expect(screen.getByRole('option', { name: 'preservedValue', hidden: true })).toBeInTheDocument()
  expect(screen.getByRole('option', { name: 'Different Option', hidden: true })).toBeInTheDocument()
})

test('calls onChange handler when value changes', () => {
  const handleChange = vi.fn()
  render(
    <ListboxSelect onChange={handleChange} value={[]}>
      <option value="option1">Option 1</option>
    </ListboxSelect>,
  )
  const select = screen.getByRole('combobox', { hidden: true })
  fireEvent.change(select, { target: { value: 'option1' } })
  expect(handleChange).toHaveBeenCalledTimes(1)
})

test('binds onChange to both change and input events', () => {
  const handleChange = vi.fn()
  render(
    <ListboxSelect onChange={handleChange} value={[]}>
      <option value="option1">Option 1</option>
    </ListboxSelect>,
  )
  const select = screen.getByRole('combobox', { hidden: true })

  fireEvent.change(select, { target: { value: 'option1' } })
  expect(handleChange).toHaveBeenCalledTimes(1)

  fireEvent.input(select, { target: { value: 'option1' } })
  expect(handleChange).toHaveBeenCalledTimes(2)
})

test('provides ListboxRenderContext with "native" value to children', () => {
  const TestChild = () => {
    const context = useContext(ListboxRenderContext)
    return <div data-testid="context-value">{context}</div>
  }

  render(
    <ListboxSelect onChange={vi.fn()} value={[]}>
      <TestChild />
    </ListboxSelect>,
  )

  expect(screen.getByTestId('context-value')).toHaveTextContent('native')
})

test('forwards additional props to select element', () => {
  render(
    <ListboxSelect data-testid="custom-select" onChange={vi.fn()} value={[]}>
      <option value="option1">Option 1</option>
    </ListboxSelect>,
  )
  expect(screen.getByTestId('custom-select')).toBeInTheDocument()
})

describe('in single-select mode', () => {
  test('renders placeholder option as first option', () => {
    render(
      <ListboxSelect onChange={vi.fn()} placeholder="Select an item" value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    expect(screen.getByRole('option', { name: 'Select an item', hidden: true })).toBeInTheDocument()
  })

  test('uses default placeholder text when not provided', () => {
    render(
      <ListboxSelect onChange={vi.fn()} value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    expect(screen.getByRole('option', { name: 'Select an option', hidden: true })).toBeInTheDocument()
  })

  test('placeholder option has empty value', () => {
    render(
      <ListboxSelect onChange={vi.fn()} placeholder="Choose one" value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    const placeholderOption = screen.getByRole('option', { name: 'Choose one', hidden: true })
    expect(placeholderOption).toHaveValue('')
  })

  test('sets select value to first item in value array', () => {
    render(
      <ListboxSelect onChange={vi.fn()} value={['selectedValue']}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    const select = screen.getByRole('combobox', { hidden: true })
    expect(select).toHaveValue('selectedValue')
  })

  test('sets select value to empty string when value array is empty', () => {
    render(
      <ListboxSelect onChange={vi.fn()} value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    const select = screen.getByRole('combobox', { hidden: true })
    expect(select).toHaveValue('')
  })

  test('does not apply multiple attribute', () => {
    render(
      <ListboxSelect onChange={vi.fn()} value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    const select = screen.getByRole('combobox', { hidden: true })
    expect(select).not.toHaveAttribute('multiple')
  })
})

describe('in multi-select mode', () => {
  test('does not render placeholder option', () => {
    render(
      <ListboxSelect multiple onChange={vi.fn()} placeholder="Select items" value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    expect(screen.queryByRole('option', { name: 'Select items', hidden: true })).not.toBeInTheDocument()
  })

  test('renders options for all selected values', () => {
    render(
      <ListboxSelect multiple onChange={vi.fn()} value={['value1', 'value2']}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    expect(screen.getByRole('option', { name: 'value1', hidden: true })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'value2', hidden: true })).toBeInTheDocument()
  })

  test('sets select value to the value array', () => {
    render(
      <ListboxSelect multiple onChange={vi.fn()} value={['value1', 'value2']}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    const select = screen.getByRole('listbox', { hidden: true }) as HTMLSelectElement
    const selectedValues = Array.from(select.selectedOptions).map((option) => option.value)
    expect(selectedValues).toEqual(['value1', 'value2'])
  })

  test('applies multiple attribute', () => {
    render(
      <ListboxSelect multiple onChange={vi.fn()} value={[]}>
        <option value="option1">Option 1</option>
      </ListboxSelect>,
    )
    const select = screen.getByRole('listbox', { hidden: true })
    expect(select).toHaveAttribute('multiple')
  })
})
