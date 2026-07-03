import {
  activateOption,
  clearActiveOption,
  clickOption,
  getFirstOption,
  getInitialActiveOption,
  getInitialActiveOptionFromEnd,
  getLastOption,
  getNextOption,
  getPrevOption,
  getVisibleOptions,
  navigateActiveDescendant,
} from '../dom'

let listboxCounter = 0

/**
 * Creates a role="tree" container with one group (a <details>/<summary[role="treeitem"]>)
 * and `itemCount` leaf items (button[role="treeitem"]).
 *
 * The summary intentionally omits data-listbox-id, mirroring OfficeSwitcherOfficeGroupSummary
 * which is not rendered through ListboxOption and therefore never receives that attribute.
 * Leaf buttons DO carry data-listbox-id, mirroring OfficeItem rendered via ListboxOption.
 */
function createTree(itemCount = 2) {
  const id = `listbox-${++listboxCounter}`
  const tree = document.createElement('div')
  tree.setAttribute('role', 'tree')
  tree.id = id

  const select = document.createElement('select')
  tree.appendChild(select)

  const details = document.createElement('details')
  details.open = true
  tree.appendChild(details)

  const summary = document.createElement('summary')
  summary.setAttribute('role', 'treeitem')
  summary.id = `${id}-summary`
  // No data-listbox-id — summary elements are not rendered through ListboxOption.
  details.appendChild(summary)

  const items: HTMLButtonElement[] = []
  for (let i = 1; i <= itemCount; i++) {
    const btn = document.createElement('button')
    btn.setAttribute('role', 'treeitem')
    btn.id = `${id}-item-${i}`
    btn.dataset.listboxId = id
    details.appendChild(btn)
    items.push(btn)
  }

  document.body.appendChild(tree)
  return { tree, summary, items }
}

function createListbox(optionCount = 3, selectedIndex?: number, checkedIndex?: number) {
  const id = `listbox-${++listboxCounter}`
  const listbox = document.createElement('div')
  listbox.setAttribute('role', 'listbox')
  listbox.id = id

  const select = document.createElement('select')
  listbox.appendChild(select)

  const options: HTMLButtonElement[] = []
  for (let i = 1; i <= optionCount; i++) {
    const btn = document.createElement('button')
    btn.setAttribute('role', 'option')
    btn.id = `${id}-option-${i}`
    btn.dataset.listboxId = id
    if (selectedIndex === i) btn.setAttribute('aria-selected', 'true')
    if (checkedIndex === i) btn.setAttribute('aria-checked', 'true')
    listbox.appendChild(btn)
    options.push(btn)
  }

  document.body.appendChild(listbox)
  return { listbox, options }
}

function createListboxWithGroup({ open, optionCount = 2 }: { open: boolean; optionCount?: number }) {
  const id = `listbox-${++listboxCounter}`
  const listbox = document.createElement('div')
  listbox.setAttribute('role', 'tree')
  listbox.id = id

  const select = document.createElement('select')
  listbox.appendChild(select)

  const details = document.createElement('details')
  details.open = open
  listbox.appendChild(details)

  const summary = document.createElement('summary')
  summary.setAttribute('role', 'treeitem')
  summary.id = `${id}-summary`
  details.appendChild(summary)

  const options: HTMLButtonElement[] = []
  for (let i = 1; i <= optionCount; i++) {
    const btn = document.createElement('button')
    btn.setAttribute('role', 'treeitem')
    btn.id = `${id}-option-${i}`
    btn.dataset.listboxId = id
    details.appendChild(btn)
    options.push(btn)
  }

  document.body.appendChild(listbox)
  return { listbox, options, summary }
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('getVisibleOptions', () => {
  test('returns all button[role="option"] elements', () => {
    const { listbox, options } = createListbox(3)
    expect(getVisibleOptions(listbox)).toEqual(options)
  })

  test('returns empty array when no options', () => {
    const { listbox } = createListbox(0)
    expect(getVisibleOptions(listbox)).toEqual([])
  })

  test('excludes options inside a closed details element', () => {
    const { listbox, summary } = createListboxWithGroup({ open: false })
    expect(getVisibleOptions(listbox)).toEqual([summary])
  })

  test('includes options inside an open details element', () => {
    const { listbox, summary, options } = createListboxWithGroup({ open: true })
    expect(getVisibleOptions(listbox)).toEqual([summary, ...options])
  })
})

describe('getInitialActiveOption', () => {
  test('returns first option when nothing is selected', () => {
    const { listbox, options } = createListbox(3)
    expect(getInitialActiveOption(listbox)).toBe(options[0])
  })

  test('returns first selected option (aria-selected)', () => {
    const { listbox, options } = createListbox(3, 2)
    expect(getInitialActiveOption(listbox)).toBe(options[1])
  })

  test('returns first selected option (aria-checked)', () => {
    const { listbox, options } = createListbox(3, undefined, 3)
    expect(getInitialActiveOption(listbox)).toBe(options[2])
  })

  test('returns null when no options exist', () => {
    const { listbox } = createListbox(0)
    expect(getInitialActiveOption(listbox)).toBeNull()
  })

  test('falls back to the first visible option when the selected option is inside a closed details group', () => {
    const { listbox, summary, options } = createListboxWithGroup({ open: false })
    options[0].setAttribute('aria-selected', 'true')
    expect(getInitialActiveOption(listbox)).toBe(summary)
  })
})

describe('getInitialActiveOptionFromEnd', () => {
  test('returns last option when nothing is selected', () => {
    const { listbox, options } = createListbox(3)
    expect(getInitialActiveOptionFromEnd(listbox, options)).toBe(options[2])
  })

  test('returns selected option (aria-selected) over the last option', () => {
    const { listbox, options } = createListbox(3, 2)
    expect(getInitialActiveOptionFromEnd(listbox, options)).toBe(options[1])
  })

  test('returns selected option (aria-checked) over the last option', () => {
    const { listbox, options } = createListbox(3, undefined, 1)
    expect(getInitialActiveOptionFromEnd(listbox, options)).toBe(options[0])
  })

  test('returns null when no options exist', () => {
    const { listbox } = createListbox(0)
    expect(getInitialActiveOptionFromEnd(listbox, [])).toBeNull()
  })

  test('falls back to the last visible option when the selected option is inside a closed details group', () => {
    const { listbox, summary, options } = createListboxWithGroup({ open: false })
    options[0].setAttribute('aria-selected', 'true')
    expect(getInitialActiveOptionFromEnd(listbox, getVisibleOptions(listbox))).toBe(summary)
  })
})

describe('getNextOption', () => {
  test('returns the next option', () => {
    const { options } = createListbox(3)
    expect(getNextOption(options, options[0])).toBe(options[1])
  })

  test('returns null at last option — no wrap', () => {
    const { options } = createListbox(3)
    expect(getNextOption(options, options[2])).toBeNull()
  })

  test('returns first option when current is null', () => {
    const { options } = createListbox(3)
    expect(getNextOption(options, null)).toBe(options[0])
  })

  test('returns null when options is empty', () => {
    expect(getNextOption([], null)).toBeNull()
  })
})

describe('getPrevOption', () => {
  test('returns the previous option', () => {
    const { options } = createListbox(3)
    expect(getPrevOption(options, options[2])).toBe(options[1])
  })

  test('returns null at first option — no wrap', () => {
    const { options } = createListbox(3)
    expect(getPrevOption(options, options[0])).toBeNull()
  })

  test('returns null when current is null', () => {
    const { options } = createListbox(3)
    expect(getPrevOption(options, null)).toBeNull()
  })
})

describe('getFirstOption / getLastOption', () => {
  test('getFirstOption returns the first element', () => {
    const { options } = createListbox(3)
    expect(getFirstOption(options)).toBe(options[0])
  })

  test('getLastOption returns the last element', () => {
    const { options } = createListbox(3)
    expect(getLastOption(options)).toBe(options[2])
  })

  test('both return null for an empty array', () => {
    expect(getFirstOption([])).toBeNull()
    expect(getLastOption([])).toBeNull()
  })
})

describe('activateOption', () => {
  test('sets data-is-active on the target option', () => {
    const { listbox, options } = createListbox(3)
    activateOption(listbox, options[1])
    expect(options[1].dataset.isActive).toBe('true')
  })

  test('clears data-is-active from the previously active option', () => {
    const { listbox, options } = createListbox(3)
    options[0].dataset.isActive = 'true'
    activateOption(listbox, options[1])
    expect(options[0].dataset.isActive).toBeUndefined()
  })

  test('sets aria-activedescendant on the ariaOwner', () => {
    const { listbox, options } = createListbox(3)
    activateOption(listbox, options[0])
    expect(listbox.getAttribute('aria-activedescendant')).toBe(options[0].id)
  })

  test('does not set aria-activedescendant when option has no id', () => {
    const { listbox, options } = createListbox(3)
    options[0].removeAttribute('id')
    activateOption(listbox, options[0])
    expect(listbox.hasAttribute('aria-activedescendant')).toBe(false)
  })

  test('does not set data-is-active when option has no id', () => {
    const { listbox, options } = createListbox(3)
    options[0].removeAttribute('id')
    activateOption(listbox, options[0])
    expect(options[0].dataset.isActive).toBeUndefined()
  })

  test('leaves the previously active option active when the new option has no id', () => {
    const { listbox, options } = createListbox(3)
    activateOption(listbox, options[0])
    options[1].removeAttribute('id')
    activateOption(listbox, options[1])
    expect(options[0].dataset.isActive).toBe('true')
    expect(listbox.getAttribute('aria-activedescendant')).toBe(options[0].id)
  })

  test('works when ariaOwner is a different element from the listbox', () => {
    const { options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)
    activateOption(input, options[0])
    expect(input.getAttribute('aria-activedescendant')).toBe(options[0].id)
  })

  describe('role="tree" container', () => {
    test('activates a summary[role="treeitem"] that has no data-listbox-id', () => {
      const { tree, summary } = createTree()
      activateOption(tree, summary)
      expect(summary.dataset.isActive).toBe('true')
    })

    test('clears a previously active leaf item when activating a summary', () => {
      const { tree, summary, items } = createTree()
      items[0].dataset.isActive = 'true'
      activateOption(tree, summary)
      expect(items[0].dataset.isActive).toBeUndefined()
      expect(summary.dataset.isActive).toBe('true')
    })

    test('clears a previously active summary when activating a leaf item', () => {
      const { tree, summary, items } = createTree()
      summary.dataset.isActive = 'true'
      activateOption(tree, items[0])
      expect(summary.dataset.isActive).toBeUndefined()
      expect(items[0].dataset.isActive).toBe('true')
    })
  })
})

describe('clearActiveOption', () => {
  test('removes data-is-active from all options', () => {
    const { listbox, options } = createListbox(3)
    options[0].dataset.isActive = 'true'
    options[1].dataset.isActive = 'true'
    clearActiveOption(listbox, listbox)
    expect(options[0].dataset.isActive).toBeUndefined()
    expect(options[1].dataset.isActive).toBeUndefined()
  })

  test('removes aria-activedescendant from the ariaOwner', () => {
    const { listbox, options } = createListbox(3)
    listbox.setAttribute('aria-activedescendant', options[0].id)
    clearActiveOption(listbox, listbox)
    expect(listbox.hasAttribute('aria-activedescendant')).toBe(false)
  })
})

describe('clickOption', () => {
  test('calls click() on the option element', () => {
    const { options } = createListbox(1)
    const spy = vi.spyOn(options[0], 'click')
    clickOption(options[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

function createKeyEvent(key: string) {
  return { key, preventDefault: vi.fn() }
}

describe('navigateActiveDescendant', () => {
  test('activates the first option on ArrowDown when nothing is active, using a distinct ariaOwner', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)

    navigateActiveDescendant(createKeyEvent('ArrowDown'), { ariaOwner: input, listboxElement: listbox })

    expect(options[0].dataset.isActive).toBe('true')
    expect(input.getAttribute('aria-activedescendant')).toBe(options[0].id)
    expect(listbox.hasAttribute('aria-activedescendant')).toBe(false)
  })

  test('activates the last option on ArrowUp when nothing is active', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)

    navigateActiveDescendant(createKeyEvent('ArrowUp'), { ariaOwner: input, listboxElement: listbox })

    expect(options[2].dataset.isActive).toBe('true')
    expect(input.getAttribute('aria-activedescendant')).toBe(options[2].id)
  })

  test('activates the selected option on ArrowUp when nothing is active and an option is selected', () => {
    const { listbox, options } = createListbox(3, 2)
    const input = document.createElement('input')
    document.body.appendChild(input)

    navigateActiveDescendant(createKeyEvent('ArrowUp'), { ariaOwner: input, listboxElement: listbox })

    expect(input.getAttribute('aria-activedescendant')).toBe(options[1].id)
  })

  test('activates the last option on ArrowLeft when nothing is active and orientation is horizontal', () => {
    const { listbox, options } = createListbox(3)
    listbox.setAttribute('aria-orientation', 'horizontal')
    const input = document.createElement('input')
    document.body.appendChild(input)

    navigateActiveDescendant(createKeyEvent('ArrowLeft'), { ariaOwner: input, listboxElement: listbox })

    expect(input.getAttribute('aria-activedescendant')).toBe(options[2].id)
  })

  test('moves the active option on ArrowDown/ArrowUp, setting aria-activedescendant on the ariaOwner', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)

    navigateActiveDescendant(createKeyEvent('ArrowDown'), { ariaOwner: input, listboxElement: listbox })
    navigateActiveDescendant(createKeyEvent('ArrowDown'), { ariaOwner: input, listboxElement: listbox })
    expect(input.getAttribute('aria-activedescendant')).toBe(options[1].id)

    navigateActiveDescendant(createKeyEvent('ArrowUp'), { ariaOwner: input, listboxElement: listbox })
    expect(input.getAttribute('aria-activedescendant')).toBe(options[0].id)
  })

  test('activates the first/last option on Home/End', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)

    navigateActiveDescendant(createKeyEvent('End'), { ariaOwner: input, listboxElement: listbox })
    expect(input.getAttribute('aria-activedescendant')).toBe(options[2].id)

    navigateActiveDescendant(createKeyEvent('Home'), { ariaOwner: input, listboxElement: listbox })
    expect(input.getAttribute('aria-activedescendant')).toBe(options[0].id)
  })

  test('clicks the active option on Enter', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)
    const spy = vi.spyOn(options[0], 'click')

    navigateActiveDescendant(createKeyEvent('ArrowDown'), { ariaOwner: input, listboxElement: listbox })
    navigateActiveDescendant(createKeyEvent('Enter'), { ariaOwner: input, listboxElement: listbox })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('does not click when selectionFollowsFocus is false (default)', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)
    const spy = vi.spyOn(options[0], 'click')

    navigateActiveDescendant(createKeyEvent('ArrowDown'), { ariaOwner: input, listboxElement: listbox })

    expect(spy).not.toHaveBeenCalled()
  })

  test('clicks the newly active option on arrow navigation when selectionFollowsFocus is true', () => {
    const { listbox, options } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)
    const spy = vi.spyOn(options[0], 'click')

    navigateActiveDescendant(createKeyEvent('ArrowDown'), {
      ariaOwner: input,
      listboxElement: listbox,
      selectionFollowsFocus: true,
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('ignores unhandled keys', () => {
    const { listbox } = createListbox(3)
    const input = document.createElement('input')
    document.body.appendChild(input)
    const event = createKeyEvent('a')

    navigateActiveDescendant(event, { ariaOwner: input, listboxElement: listbox })

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(input.hasAttribute('aria-activedescendant')).toBe(false)
  })
})
