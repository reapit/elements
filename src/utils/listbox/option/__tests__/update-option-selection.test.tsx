import { setListboxOptionSelectedState } from '../../dom-helpers'
import { updateOptionSelection } from '../update-option-selection'

import type { MouseEvent } from 'react'

vi.mock('../../dom-helpers')

beforeEach(() => {
  vi.mocked(setListboxOptionSelectedState).mockClear()
})

describe('selectAction: auto', () => {
  test('toggles selection for multi-select listbox', () => {
    const event = createOptionClickEvent({
      listboxId: 'test-listbox',
      selectAction: 'auto',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'option-1', expect.any(Function))

    const setter = vi.mocked(setListboxOptionSelectedState).mock.calls[0][2]
    const multiSelectElement = createSelectElement({ multiple: true })

    expect(setter(false, multiSelectElement)).toBe(true)
    expect(setter(true, multiSelectElement)).toBe(false)
  })

  test('always selects for single-select listbox', () => {
    const event = createOptionClickEvent({
      listboxId: 'test-listbox',
      selectAction: 'auto',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'option-1', expect.any(Function))

    const setter = vi.mocked(setListboxOptionSelectedState).mock.calls[0][2]
    const singleSelectElement = createSelectElement({ multiple: false })

    expect(setter(false, singleSelectElement)).toBe(true)
    expect(setter(true, singleSelectElement)).toBe(true)
  })
})

describe('selectAction: toggle', () => {
  test('toggles between selected and unselected', () => {
    const event = createOptionClickEvent({
      listboxId: 'test-listbox',
      selectAction: 'toggle',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'option-1', expect.any(Function))

    const setter = vi.mocked(setListboxOptionSelectedState).mock.calls[0][2]
    const selectElement = createSelectElement()

    expect(setter(false, selectElement)).toBe(true)
    expect(setter(true, selectElement)).toBe(false)
  })
})

describe('selectAction: select', () => {
  test('always selects the option', () => {
    const event = createOptionClickEvent({
      listboxId: 'test-listbox',
      selectAction: 'select',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'option-1', expect.any(Function))

    const setter = vi.mocked(setListboxOptionSelectedState).mock.calls[0][2]
    const selectElement = createSelectElement()

    expect(setter(false, selectElement)).toBe(true)
    expect(setter(true, selectElement)).toBe(true)
  })
})

describe('missing listboxId', () => {
  test('skips update when listboxId is missing', () => {
    const event = createOptionClickEvent({
      listboxId: undefined,
      selectAction: 'auto',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).not.toHaveBeenCalled()
  })

  test('skips update when listboxId is empty string', () => {
    const event = createOptionClickEvent({
      listboxId: '',
      selectAction: 'auto',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).not.toHaveBeenCalled()
  })
})

test('skips update when value is empty string', () => {
  const event = createOptionClickEvent({
    listboxId: 'test-listbox',
    selectAction: 'select',
    value: '',
  })

  updateOptionSelection(event)

  expect(setListboxOptionSelectedState).not.toHaveBeenCalled()
})

describe('invalid selectAction', () => {
  test.each([
    ['missing', undefined],
    ['invalid', 'invalid-action'],
    ['empty string', ''],
  ])('skips update when selectAction is %s', (_, selectAction) => {
    const event = createOptionClickEvent({
      listboxId: 'test-listbox',
      selectAction,
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).not.toHaveBeenCalled()
  })
})

describe('data attributes', () => {
  test('uses listboxId from dataset', () => {
    const event = createOptionClickEvent({
      listboxId: 'my-custom-listbox-id',
      selectAction: 'select',
      value: 'option-1',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('my-custom-listbox-id', 'option-1', expect.any(Function))
  })

  test('uses option value from button value attribute', () => {
    const event = createOptionClickEvent({
      listboxId: 'test-listbox',
      selectAction: 'select',
      value: 'custom-value-123',
    })

    updateOptionSelection(event)

    expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'custom-value-123', expect.any(Function))
  })
})

interface MockClickEventOptions {
  listboxId?: string
  selectAction?: string
  value: string
}

function createOptionClickEvent(options: MockClickEventOptions): MouseEvent<HTMLButtonElement> {
  const button = document.createElement('button')
  button.value = options.value
  if (options.listboxId !== undefined) {
    button.dataset.listboxId = options.listboxId
  }
  if (options.selectAction !== undefined) {
    button.dataset.selectAction = options.selectAction
  }

  return {
    currentTarget: button,
  } as MouseEvent<HTMLButtonElement>
}

interface MockSelectElementOptions {
  multiple?: boolean
}

function createSelectElement(options: MockSelectElementOptions = {}): HTMLSelectElement {
  return {
    multiple: options.multiple ?? false,
  } as HTMLSelectElement
}
