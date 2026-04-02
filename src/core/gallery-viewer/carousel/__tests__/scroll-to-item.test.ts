import { scrollToItem } from '../scroll-to-item'

afterEach(() => {
  document.body.innerHTML = ''
})

function createContainer(...ids: string[]): HTMLElement {
  const container = document.createElement('div')
  for (const id of ids) {
    const item = document.createElement('div')
    item.id = id
    item.scrollIntoView = vi.fn()
    container.appendChild(item)
  }
  document.body.appendChild(container)
  return container
}

test('returns false when the target id is not found in the container', () => {
  const container = createContainer('item-1')
  expect(scrollToItem(container, 'item-missing', { isMounted: false })).toBe(false)
})

test('returns true when the target item is found', () => {
  const container = createContainer('item-1')
  expect(scrollToItem(container, 'item-1', { isMounted: false })).toBe(true)
})

test('scrolls with instant behaviour on first mount', () => {
  const container = createContainer('item-1')
  const item = container.querySelector('#item-1') as HTMLElement

  scrollToItem(container, 'item-1', { isMounted: false })

  expect(item.scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'nearest', inline: 'start' })
})

test('scrolls with smooth behaviour after mount', () => {
  const container = createContainer('item-1')
  const item = container.querySelector('#item-1') as HTMLElement
  vi.spyOn(globalThis, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)

  scrollToItem(container, 'item-1', { isMounted: true })

  expect(item.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest', inline: 'start' })
})

test('falls back to instant behaviour when prefers-reduced-motion is active', () => {
  const container = createContainer('item-1')
  const item = container.querySelector('#item-1') as HTMLElement
  vi.spyOn(globalThis, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)

  scrollToItem(container, 'item-1', { isMounted: true })

  expect(item.scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'nearest', inline: 'start' })
})
