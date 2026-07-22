import { highlight } from '../highlight'

// happy-dom does not implement the CSS Custom Highlight API, so we stub the pieces `highlight` needs.
class FakeHighlight {
  ranges: Range[]

  constructor(...ranges: Range[]) {
    this.ranges = ranges
  }
}

function stubHighlightApi() {
  const highlights = new Map<string, FakeHighlight>()
  vi.stubGlobal('CSS', { highlights })
  vi.stubGlobal('Highlight', FakeHighlight)
  return highlights
}

function createElementWithText(text: string) {
  const element = document.createElement('div')
  element.textContent = text
  document.body.appendChild(element)
  return element
}

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.replaceChildren()
})

test('registers a highlight for a case-insensitive match', () => {
  const highlights = stubHighlightApi()
  const element = createElementWithText('Lorem ipsum dolor sit amet.')

  highlight('test-highlight', 'IPSUM', element)

  const registered = highlights.get('test-highlight')
  expect(registered?.ranges).toHaveLength(1)
  expect(registered?.ranges[0]?.toString()).toBe('ipsum')
})

test('finds every occurrence of the query within a text node', () => {
  const highlights = stubHighlightApi()
  const element = createElementWithText('cat dog cat bird cat')

  highlight('test-highlight', 'cat', element)

  const registered = highlights.get('test-highlight')
  expect(registered?.ranges).toHaveLength(3)
})

test('registers an empty highlight when the query does not match', () => {
  const highlights = stubHighlightApi()
  const element = createElementWithText('Lorem ipsum dolor sit amet.')

  highlight('test-highlight', 'xyz', element)

  const registered = highlights.get('test-highlight')
  expect(registered?.ranges).toHaveLength(0)
})

test('does not walk the DOM when the query is empty', () => {
  stubHighlightApi()
  const element = createElementWithText('Lorem ipsum dolor sit amet.')
  const createTreeWalkerSpy = vi.spyOn(document, 'createTreeWalker')

  highlight('test-highlight', '   ', element)

  expect(createTreeWalkerSpy).not.toHaveBeenCalled()
  createTreeWalkerSpy.mockRestore()
})

test('clears a previously-registered highlight when the query becomes empty', () => {
  const highlights = stubHighlightApi()
  const element = createElementWithText('Lorem ipsum dolor sit amet.')

  highlight('test-highlight', 'ipsum', element)
  expect(highlights.has('test-highlight')).toBe(true)

  highlight('test-highlight', '   ', element)

  expect(highlights.has('test-highlight')).toBe(false)
})

test('no-ops when the browser does not support the CSS Custom Highlight API', () => {
  vi.stubGlobal('CSS', {})
  const element = createElementWithText('Lorem ipsum dolor sit amet.')

  const cleanup = highlight('test-highlight', 'ipsum', element)

  expect(cleanup).toBeUndefined()
})

test('cleanup removes the highlight from the registry', () => {
  const highlights = stubHighlightApi()
  const element = createElementWithText('Lorem ipsum dolor sit amet.')

  const cleanup = highlight('test-highlight', 'ipsum', element)
  expect(highlights.has('test-highlight')).toBe(true)

  cleanup?.()

  expect(highlights.has('test-highlight')).toBe(false)
})
