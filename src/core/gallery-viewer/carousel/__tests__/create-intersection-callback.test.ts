import type { MutableRefObject } from 'react'
import { createIntersectionCallback } from '../create-intersection-callback'

afterEach(() => {
  document.body.innerHTML = ''
})

function createContainer(...ids: string[]): HTMLElement {
  const container = document.createElement('div')
  for (const id of ids) {
    const item = document.createElement('div')
    item.id = id
    container.appendChild(item)
  }
  document.body.appendChild(container)
  return container
}

function makeEntry(target: Element, intersectionRatio: number, isIntersecting = true): IntersectionObserverEntry {
  return { target, isIntersecting, intersectionRatio } as unknown as IntersectionObserverEntry
}

function makeRefs(overrides?: { activeItemId?: string; isObserverChange?: boolean }) {
  const activeItemRef: MutableRefObject<string | undefined> = { current: overrides?.activeItemId }
  const isObserverChangeRef: MutableRefObject<boolean> = { current: overrides?.isObserverChange ?? false }
  return { activeItemRef, isObserverChangeRef }
}

test('removes inert from the item that enters view', () => {
  const container = createContainer('item-1', 'item-2')
  const [item1, item2] = Array.from(container.children) as HTMLElement[]
  item1.inert = true
  item2.inert = true

  const { activeItemRef, isObserverChangeRef } = makeRefs()
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef })

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver)

  expect(item2).not.toHaveAttribute('inert')
})

test('adds inert to all items not in view', () => {
  const container = createContainer('item-1', 'item-2', 'item-3')
  const [item1, , item3] = Array.from(container.children) as HTMLElement[]
  const item2 = container.children[1] as HTMLElement

  const { activeItemRef, isObserverChangeRef } = makeRefs()
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef })

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver)

  expect(item1).toHaveAttribute('inert')
  expect(item3).toHaveAttribute('inert')
})

test('does not call onChange when intersectionRatio is below 0.5', () => {
  const container = createContainer('item-1')
  const [item1] = Array.from(container.children) as HTMLElement[]
  const onChange = vi.fn()

  const { activeItemRef, isObserverChangeRef } = makeRefs({ activeItemId: 'item-1' })
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef, onChange })

  callback([makeEntry(item1, 0.4)], {} as IntersectionObserver)

  expect(onChange).not.toHaveBeenCalled()
})

test('does not call onChange on the initial observation when activeItemRef is undefined (fully uncontrolled)', () => {
  const container = createContainer('item-1')
  const [item1] = Array.from(container.children) as HTMLElement[]
  const onChange = vi.fn()

  // activeItemId is undefined — simulates the fully uncontrolled case where no
  // value or defaultValue was provided, so no previous item is known.
  const { activeItemRef, isObserverChangeRef } = makeRefs()
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef, onChange })

  callback([makeEntry(item1, 0.6)], {} as IntersectionObserver)

  expect(onChange).not.toHaveBeenCalled()
})

test('does not call onChange when the intersecting item is already active', () => {
  const container = createContainer('item-1')
  const [item1] = Array.from(container.children) as HTMLElement[]
  const onChange = vi.fn()

  const { activeItemRef, isObserverChangeRef } = makeRefs({ activeItemId: 'item-1' })
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef, onChange })

  callback([makeEntry(item1, 1.0)], {} as IntersectionObserver)

  expect(onChange).not.toHaveBeenCalled()
})

test('calls onChange with the item id when a new item enters view', () => {
  const container = createContainer('item-1', 'item-2')
  const item2 = container.children[1] as HTMLElement
  const onChange = vi.fn()

  const { activeItemRef, isObserverChangeRef } = makeRefs({ activeItemId: 'item-1' })
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef, onChange })

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver)

  expect(onChange).toHaveBeenCalledWith('item-2')
})

test('does not set isObserverChangeRef when onChange is not provided', () => {
  const container = createContainer('item-1', 'item-2')
  const item2 = container.children[1] as HTMLElement

  const { activeItemRef, isObserverChangeRef } = makeRefs({ activeItemId: 'item-1' })
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef })

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver)

  expect(isObserverChangeRef.current).toBe(false)
})

test('sets isObserverChangeRef to true before calling onChange', () => {
  const container = createContainer('item-1', 'item-2')
  const item2 = container.children[1] as HTMLElement
  let flagAtCallTime = false
  const onChange = vi.fn(() => {
    flagAtCallTime = isObserverChangeRef.current
  })

  const { activeItemRef, isObserverChangeRef } = makeRefs({ activeItemId: 'item-1' })
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef, onChange })

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver)

  expect(flagAtCallTime).toBe(true)
})

test('updates activeItemRef to the newly visible item id', () => {
  const container = createContainer('item-1', 'item-2')
  const item2 = container.children[1] as HTMLElement

  const { activeItemRef, isObserverChangeRef } = makeRefs({ activeItemId: 'item-1' })
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef })

  callback([makeEntry(item2, 0.6)], {} as IntersectionObserver)

  expect(activeItemRef.current).toBe('item-2')
})

test('sets activeItemRef on initial observation even when no previous item is known', () => {
  const container = createContainer('item-1')
  const [item1] = Array.from(container.children) as HTMLElement[]

  const { activeItemRef, isObserverChangeRef } = makeRefs()
  const callback = createIntersectionCallback({ container, activeItemRef, isObserverChangeRef })

  callback([makeEntry(item1, 0.6)], {} as IntersectionObserver)

  expect(activeItemRef.current).toBe('item-1')
})
