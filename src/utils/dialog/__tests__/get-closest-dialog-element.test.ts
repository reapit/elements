import { getClosestDialogElement } from '../get-closest-dialog-element'

test('returns the element itself if it is a dialog', () => {
  const element = document.createElement('dialog')
  expect(getClosestDialogElement(element)).toBe(element)
})

test('returns the closest ancestor dialog element', () => {
  const grandparent = document.createElement('dialog')
  const parent = document.createElement('div')
  const child = document.createElement('div')

  grandparent.appendChild(parent)
  parent.appendChild(child)

  expect(getClosestDialogElement(child)).toBe(grandparent)
})

test('returns null when no ancestor is a dialog element', () => {
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
