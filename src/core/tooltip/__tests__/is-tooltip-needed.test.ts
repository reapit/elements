import { isTooltipNeeded } from '../is-tooltip-needed'

afterEach(() => {
  document.body.innerHTML = ''
})

test('returns true when no truncationTargetId is provided', () => {
  const result = isTooltipNeeded()
  expect(result).toBe(true)
})

test('returns true when truncationTargetId is empty string', () => {
  const result = isTooltipNeeded('')
  expect(result).toBe(true)
})

test('returns true when element with given ID does not exist', () => {
  const result = isTooltipNeeded('non-existent-element')
  expect(result).toBe(true)
})

test('returns false when scrollWidth is less than clientWidth', () => {
  const scrollWidth = 80
  const clientWidth = 100
  createElementWithDimensions('test-element', scrollWidth, clientWidth)

  const result = isTooltipNeeded('test-element')
  expect(result).toBe(false)
})

test('returns false when scrollWidth equals clientWidth', () => {
  const scrollWidth = 100
  const clientWidth = 100
  createElementWithDimensions('test-element', scrollWidth, clientWidth)

  const result = isTooltipNeeded('test-element')
  expect(result).toBe(false)
})

test('returns true when scrollWidth is greater than clientWidth', () => {
  const scrollWidth = 150
  const clientWidth = 100
  createElementWithDimensions('test-element', scrollWidth, clientWidth)

  const result = isTooltipNeeded('test-element')
  expect(result).toBe(true)
})

// Helper function to create an element with specific dimensions
function createElementWithDimensions(id: string, scrollWidth: number, clientWidth: number): HTMLElement {
  const element = document.createElement('div')
  element.id = id

  Object.defineProperty(element, 'scrollWidth', {
    configurable: true,
    value: scrollWidth,
  })
  Object.defineProperty(element, 'clientWidth', {
    configurable: true,
    value: clientWidth,
  })

  document.body.appendChild(element)
  return element
}
