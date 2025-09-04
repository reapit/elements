import { render, screen, fireEvent } from '@testing-library/react'
import { SelectCustom } from '../select-custom'

describe('SelectCustom', () => {
  test('renders BasicUsage with label, helper, and options', () => {
    render(
      <SelectCustom id="basic-select" label="Label" helperText="Optional helper text">
        <SelectCustom.Option value="option1" label="Option 1" />
        <SelectCustom.Option value="option2" label="Option 2" />
        <SelectCustom.Option value="option3" label="Option 3" />
      </SelectCustom>,
    )

    // Label
    expect(screen.getByText('Label')).toBeVisible()

    // Helper text
    expect(screen.getByText('Optional helper text')).toBeVisible()

    // Open popover
    const combobox = screen.getByRole('combobox')
    fireEvent.click(combobox)

    // Options
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeVisible()
  })

  test('MultiSelect displays selected chips', () => {
    render(
      <SelectCustom id="multi-select" isMultiple label="Label" helperText="Optional helper text">
        <SelectCustom.Option value="multi-1" label="Multi 1" selected />
        <SelectCustom.Option value="multi-2" label="Multi 2" selected />
        <SelectCustom.Option value="multi-3" label="Multi 3" />
      </SelectCustom>,
    )

    const combobox = screen.getByRole('combobox')
    fireEvent.click(combobox)

    // Use aria-selected to find selected options
    const selectedOptions = screen.getAllByRole('option', { selected: true })

    expect(selectedOptions.length).toBe(2)
    expect(selectedOptions[0]).toHaveTextContent('Multi 1')
    expect(selectedOptions[1]).toHaveTextContent('Multi 2')
  })

  test('SelectGroup renders grouped options', () => {
    render(
      <SelectCustom id="group-select" label="Label" helperText="Optional helper text">
        <SelectCustom.Group label="Group 1">
          <SelectCustom.Option value="group-1-option1" label="Option 1" />
          <SelectCustom.Option value="group-1-option2" label="Option 2" />
        </SelectCustom.Group>
        <SelectCustom.Group label="Group 2">
          <SelectCustom.Option value="group-2-option3" label="Option 3" />
          <SelectCustom.Option value="group-2-option4" label="Option 4" />
        </SelectCustom.Group>
      </SelectCustom>,
    )

    // Open popover
    const combobox = screen.getByRole('combobox')
    fireEvent.click(combobox)

    // Options
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'Option 4' })).toBeVisible()
  })
})
