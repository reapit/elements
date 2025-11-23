import { getComboboxSelectButtonLabelText } from '../get-label-text'

test('returns the label of the selected option when multiple is false and one option is selected', () => {
  const result = getComboboxSelectButtonLabelText({
    multiple: false,
    placeholder: 'Select an option',
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  expect(result).toBe('Option 1')
})

test('returns placeholder when multiple is false and no options are selected', () => {
  const result = getComboboxSelectButtonLabelText({
    multiple: false,
    placeholder: 'Select an option',
    selections: [],
  })

  expect(result).toBe('Select an option')
})

test('returns placeholder when multiple is false and multiple options are selected', () => {
  const result = getComboboxSelectButtonLabelText({
    multiple: false,
    placeholder: 'Select an option',
    selections: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  })

  expect(result).toBe('Select an option')
})

test('returns placeholder when multiple is true and no options are selected', () => {
  const result = getComboboxSelectButtonLabelText({
    multiple: true,
    placeholder: 'Select options',
    selections: [],
  })

  expect(result).toBe('Select options')
})

test('returns placeholder when multiple is true and one option is selected', () => {
  const result = getComboboxSelectButtonLabelText({
    multiple: true,
    placeholder: 'Select options',
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  expect(result).toBe('Select options')
})

test('returns placeholder when multiple is true and multiple options are selected', () => {
  const result = getComboboxSelectButtonLabelText({
    multiple: true,
    placeholder: 'Select options',
    selections: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  })

  expect(result).toBe('Select options')
})
