import { deselectOtherOptions } from '../deselect-other-options'

test('unchecks every other checked option in the container', () => {
  const target = createCheckbox(true)
  const other = createCheckbox(true)
  const container = createContainer([target, other])

  deselectOtherOptions(container, target)

  expect(target.checked).toBe(true)
  expect(other.checked).toBe(false)
})

test('leaves the target untouched', () => {
  const target = createCheckbox(true)
  const container = createContainer([target])

  deselectOtherOptions(container, target)

  expect(target.checked).toBe(true)
})

test('does not touch options that are already unchecked', () => {
  const target = createCheckbox(true)
  const other = createCheckbox(false)
  const container = createContainer([target, other])

  const setter = vi.fn()
  Object.defineProperty(other, 'checked', { get: () => false, set: setter })

  deselectOtherOptions(container, target)

  expect(setter).not.toHaveBeenCalled()
})

test('ignores checkboxes outside the container', () => {
  const target = createCheckbox(true)
  const inside = createCheckbox(true)
  const outside = createCheckbox(true)
  const container = createContainer([target, inside])
  document.body.appendChild(outside)

  deselectOtherOptions(container, target)

  expect(inside.checked).toBe(false)
  expect(outside.checked).toBe(true)

  outside.remove()
})

test('ignores checkboxes inside the container that are not chip options', () => {
  const target = createCheckbox(true)
  const chip = createCheckbox(true)
  const unrelated = document.createElement('input')
  unrelated.type = 'checkbox'
  unrelated.checked = true
  const container = createContainer([target, chip])
  container.appendChild(unrelated)

  deselectOtherOptions(container, target)

  expect(chip.checked).toBe(false)
  expect(unrelated.checked).toBe(true)
})

function createCheckbox(checked: boolean): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.checked = checked
  input.dataset.exclusive = 'true'
  return input
}

function createContainer(children: HTMLInputElement[]): HTMLDivElement {
  const container = document.createElement('div')
  children.forEach((child) => container.appendChild(child))
  return container
}
