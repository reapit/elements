import { getClosestDialogElement } from '../get-closest-dialog-element'

test('returns the element itself if it has a popover attribute', () => {
  const element = document.createElement('dialog')
  expect(getClosestDialogElement(element)).toBe(element)
})

test('returns the closest ancestor with popover attribute', () => {
  const grandparent = document.createElement('dialog')
  const parent = document.createElement('div')
  const child = document.createElement('div')

  grandparent.appendChild(parent)
  parent.appendChild(child)

  expect(getClosestDialogElement(child)).toBe(grandparent)
})

test('returns null when no ancestor has popover attribute', () => {
  const parent = document.createElement('div')
  const child = document.createElement('div')

  parent.appendChild(child)

  expect(getClosestDialogElement(child)).toBeNull()
})

test('returns the first dialog ancestor when multiple exist', () => {
  const outerDialog = document.createElement('dialog')

  const innerDialog = document.createElement('dialog')

  const child = document.createElement('div')

  outerDialog.appendChild(innerDialog)
  innerDialog.appendChild(child)

  expect(getClosestDialogElement(child)).toBe(innerDialog)
})
