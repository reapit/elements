import { outletStack } from '../outlet-stack'

function makeEl() {
  return document.createElement('div')
}

afterEach(() => {
  // Drain any remaining entries left by a failing test to prevent inter-test coupling.
  let snapshot = outletStack.getSnapshot()
  while (snapshot) {
    outletStack.pop(snapshot)
    snapshot = outletStack.getSnapshot()
  }
})

test('getSnapshot returns null when the stack is empty', () => {
  expect(outletStack.getSnapshot()).toBeNull()
})

test('getSnapshot returns the pushed element', () => {
  const el = makeEl()
  outletStack.push(el)
  expect(outletStack.getSnapshot()).toBe(el)
  outletStack.pop(el)
})

test('getSnapshot returns the topmost element when multiple are pushed', () => {
  const first = makeEl()
  const second = makeEl()
  outletStack.push(first)
  outletStack.push(second)
  expect(outletStack.getSnapshot()).toBe(second)
  outletStack.pop(second)
  outletStack.pop(first)
})

test('getSnapshot returns the previous element after the top is popped', () => {
  const first = makeEl()
  const second = makeEl()
  outletStack.push(first)
  outletStack.push(second)
  outletStack.pop(second)
  expect(outletStack.getSnapshot()).toBe(first)
  outletStack.pop(first)
})

test('getSnapshot returns null after all elements are popped', () => {
  const el = makeEl()
  outletStack.push(el)
  outletStack.pop(el)
  expect(outletStack.getSnapshot()).toBeNull()
})

test('pop removes a specific element regardless of position', () => {
  const first = makeEl()
  const second = makeEl()
  const third = makeEl()
  outletStack.push(first)
  outletStack.push(second)
  outletStack.push(third)
  // Remove the middle element out of order
  outletStack.pop(second)
  expect(outletStack.getSnapshot()).toBe(third)
  outletStack.pop(third)
  expect(outletStack.getSnapshot()).toBe(first)
  outletStack.pop(first)
})

test('notifies subscribers when an element is pushed', () => {
  const listener = vi.fn()
  const unsubscribe = outletStack.subscribe(listener)
  const el = makeEl()
  outletStack.push(el)
  expect(listener).toHaveBeenCalledTimes(1)
  outletStack.pop(el)
  unsubscribe()
})

test('notifies subscribers when an element is popped', () => {
  const el = makeEl()
  outletStack.push(el)
  const listener = vi.fn()
  const unsubscribe = outletStack.subscribe(listener)
  outletStack.pop(el)
  expect(listener).toHaveBeenCalledTimes(1)
  unsubscribe()
})

test('unsubscribe stops future notifications', () => {
  const listener = vi.fn()
  const unsubscribe = outletStack.subscribe(listener)
  unsubscribe()
  const el = makeEl()
  outletStack.push(el)
  expect(listener).not.toHaveBeenCalled()
  outletStack.pop(el)
})
