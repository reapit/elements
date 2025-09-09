import { maybeDeselectOtherOptions } from '../maybe-deselect-other-options'

test('deselects other checked options when newly selected option is exclusive', () => {
  const option1 = createInput({ name: 'test-options', checked: true, exclusive: true })
  const option2 = createInput({ name: 'test-options', checked: true })
  const option3 = createInput({ name: 'test-options', checked: false })

  const form = createFormWithInputs([option1, option2, option3])
  mockRadioNodeList([option1, option2, option3], form)

  maybeDeselectOtherOptions(option1)

  expect(option1.checked).toBe(true) // Newly selected option remains checked
  expect(option2.checked).toBe(false) // Other checked option gets unchecked
  expect(option3.checked).toBe(false) // Already unchecked option remains unchecked
})

test('does not deselect other options when newly selected option is not exclusive', () => {
  const option1 = createInput({ name: 'test-options', checked: true })
  const option2 = createInput({ name: 'test-options', checked: true })

  const form = createFormWithInputs([option1, option2])
  mockRadioNodeList([option1, option2], form)

  maybeDeselectOtherOptions(option1)

  expect(option1.checked).toBe(true)
  expect(option2.checked).toBe(true) // Should remain checked
})

test('does not deselect other options when exclusive is set to false', () => {
  const option1 = createInput({ name: 'test-options', checked: true, exclusive: false })
  const option2 = createInput({ name: 'test-options', checked: true })

  const form = createFormWithInputs([option1, option2])
  mockRadioNodeList([option1, option2], form)

  maybeDeselectOtherOptions(option1)

  expect(option1.checked).toBe(true)
  expect(option2.checked).toBe(true) // Should remain checked
})

test('does not deselect when option has no associated form', () => {
  const option1 = createInput({ name: 'test-options', checked: true, exclusive: true })
  const option2 = createInput({ name: 'test-options', checked: true })

  maybeDeselectOtherOptions(option1)

  expect(option1.checked).toBe(true)
  expect(option2.checked).toBe(true) // Should remain checked
})

test('does not deselect when option has no name', () => {
  const option1 = createInput({ checked: true, exclusive: true })
  const option2 = createInput({ checked: true })

  createFormWithInputs([option1, option2])

  maybeDeselectOtherOptions(option1)

  expect(option1.checked).toBe(true)
  expect(option2.checked).toBe(true) // Should remain checked
})

test('handles single option case gracefully', () => {
  const option1 = createInput({ name: 'test-options', checked: true, exclusive: true })

  const form = createFormWithInputs([option1])
  vi.spyOn(form.elements, 'namedItem').mockReturnValue(option1)

  maybeDeselectOtherOptions(option1)

  expect(option1.checked).toBe(true) // Should remain checked
})

test('only unchecks options that are currently checked', () => {
  const option1 = createInput({ name: 'test-options', checked: true, exclusive: true })
  const option2 = createInput({ name: 'test-options', checked: true })
  const option3 = createInput({ name: 'test-options', checked: false })

  const form = createFormWithInputs([option1, option2, option3])
  mockRadioNodeList([option1, option2, option3], form)

  // Spy on setting checked property to verify behavior
  const option2CheckedSetter = vi.fn()
  const option3CheckedSetter = vi.fn()

  Object.defineProperty(option2, 'checked', {
    get: () => true,
    set: option2CheckedSetter,
  })

  Object.defineProperty(option3, 'checked', {
    get: () => false,
    set: option3CheckedSetter,
  })

  maybeDeselectOtherOptions(option1)

  expect(option2CheckedSetter).toHaveBeenCalledWith(false)
  expect(option3CheckedSetter).not.toHaveBeenCalled() // Already unchecked, shouldn't be touched
})

interface CreateInputOptions {
  name?: string
  checked?: boolean
  exclusive?: boolean | string
  type?: string
}

function createInput(options: CreateInputOptions = {}): HTMLInputElement {
  const input = document.createElement('input')
  input.type = options.type || 'checkbox'

  if (options.name) {
    input.name = options.name
  }

  if (options.checked !== undefined) {
    input.checked = options.checked
  }

  if (options.exclusive !== undefined) {
    input.dataset.exclusive = String(options.exclusive)
  }

  return input
}

function createFormWithInputs(inputs: HTMLInputElement[]): HTMLFormElement {
  const form = document.createElement('form')
  inputs.forEach((input) => form.appendChild(input))
  return form
}

function mockRadioNodeList(inputs: HTMLInputElement[], form: HTMLFormElement): void {
  const mockRadioNodeList = inputs as any
  mockRadioNodeList.forEach = Array.prototype.forEach
  Object.setPrototypeOf(mockRadioNodeList, RadioNodeList.prototype)
  vi.spyOn(form.elements, 'namedItem').mockReturnValue(mockRadioNodeList)
}
