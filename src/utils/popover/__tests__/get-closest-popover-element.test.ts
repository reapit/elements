import { getClosestPopoverElement } from '../get-closest-popover-element'

test('returns the element itself if it has a popover attribute', () => {
  const element = document.createElement('div')
  element.setAttribute('popover', 'auto')

  expect(getClosestPopoverElement(element)).toBe(element)
})

test('returns the closest ancestor with popover attribute', () => {
  const grandparent = document.createElement('div')
  grandparent.setAttribute('popover', 'auto')

  const parent = document.createElement('div')
  const child = document.createElement('div')

  grandparent.appendChild(parent)
  parent.appendChild(child)

  expect(getClosestPopoverElement(child)).toBe(grandparent)
})

test('returns null when no ancestor has popover attribute', () => {
  const parent = document.createElement('div')
  const child = document.createElement('div')

  parent.appendChild(child)

  expect(getClosestPopoverElement(child)).toBeNull()
})

test('works with popover="manual"', () => {
  const element = document.createElement('div')
  element.setAttribute('popover', 'manual')

  expect(getClosestPopoverElement(element)).toBe(element)
})

test('returns the first popover ancestor when multiple exist', () => {
  const outerPopover = document.createElement('div')
  outerPopover.setAttribute('popover', 'auto')

  const innerPopover = document.createElement('div')
  innerPopover.setAttribute('popover', 'manual')

  const child = document.createElement('div')

  outerPopover.appendChild(innerPopover)
  innerPopover.appendChild(child)

  expect(getClosestPopoverElement(child)).toBe(innerPopover)
})
