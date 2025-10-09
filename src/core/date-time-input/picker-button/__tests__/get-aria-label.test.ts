import { getPickerButtonAriaLabel } from '../get-aria-label'

test('returns correct aria-label for date variant', () => {
  expect(getPickerButtonAriaLabel('date')).toBe('Show date picker')
})

test('returns correct aria-label for datetime-local variant', () => {
  expect(getPickerButtonAriaLabel('datetime-local')).toBe('Show date and time picker')
})

test('returns correct aria-label for time variant', () => {
  expect(getPickerButtonAriaLabel('time')).toBe('Show time picker')
})
