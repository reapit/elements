import { determineNextControlledState } from '../determine-next-controlled-state'

test("when exclusive option is checked, returns an array with that option's value", () => {
  const currentValue = ['option1']
  const option = createInputOption('option2', true, true)
  const result = determineNextControlledState(currentValue, option)
  expect(result).toEqual(['option2'])
})

test('when exclusive option is unchecked, returns empty array', () => {
  const currentValue = ['option1']
  const option = createInputOption('option1', false, true)
  const result = determineNextControlledState(currentValue, option)
  expect(result).toEqual([])
})

test("when non-exclusive option checked, returns array with option's value appended to existing values", () => {
  const currentValue = ['option1', 'option2']
  const option = createInputOption('option3', true, false)
  const result = determineNextControlledState(currentValue, option)
  expect(result).toEqual(['option1', 'option2', 'option3'])
})

test("when non-exclusive option unchecked, returns array with option's value removed from existing values", () => {
  const currentValue = ['option1', 'option2', 'option3']
  const option = createInputOption('option2', false, false)
  const result = determineNextControlledState(currentValue, option)
  expect(result).toEqual(['option1', 'option3'])
})

function createInputOption(value: string, checked: boolean, exclusive: boolean): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.value = value
  input.checked = checked
  input.dataset.exclusive = exclusive.toString()
  return input
}
