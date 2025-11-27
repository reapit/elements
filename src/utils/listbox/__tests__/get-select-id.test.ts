import { getListboxSelectId } from '../get-select-id'

test('appends "-select" to the listbox id', () => {
  expect(getListboxSelectId('my-listbox')).toBe('my-listbox-select')
})
