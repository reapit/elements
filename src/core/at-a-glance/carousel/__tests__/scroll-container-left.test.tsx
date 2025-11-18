import { render } from '@testing-library/react'
import { scrollContainerLeft } from '../scroll-container-left'

test('scrolls element left by its clientWidth', () => {
  const TestComponent = () => <div id="test-container" data-testid="container" />

  render(<TestComponent />)
  const element = document.getElementById('test-container')!
  Object.defineProperty(element, 'clientWidth', { value: 300, configurable: true })
  const scrollBySpy = vi.fn()
  element.scrollBy = scrollBySpy

  scrollContainerLeft('test-container')

  expect(scrollBySpy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' })
})

test('does nothing when element is not found', () => {
  render(<div />)

  // Should not throw
  expect(() => scrollContainerLeft('non-existent-id')).not.toThrow()
})

test('uses smooth scrolling behavior', () => {
  const TestComponent = () => <div id="smooth-test" />

  render(<TestComponent />)
  const element = document.getElementById('smooth-test')!
  Object.defineProperty(element, 'clientWidth', { value: 400, configurable: true })
  const scrollBySpy = vi.fn()
  element.scrollBy = scrollBySpy

  scrollContainerLeft('smooth-test')

  expect(scrollBySpy).toHaveBeenCalledWith(
    expect.objectContaining({
      behavior: 'smooth',
    }),
  )
})

test('scrolls by negative clientWidth value', () => {
  const TestComponent = () => <div id="negative-test" />

  render(<TestComponent />)
  const element = document.getElementById('negative-test')!
  Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })
  const scrollBySpy = vi.fn()
  element.scrollBy = scrollBySpy

  scrollContainerLeft('negative-test')

  const callArgs = scrollBySpy.mock.calls[0][0]
  expect(callArgs.left).toBeLessThan(0)
  expect(callArgs.left).toBe(-500)
})

test('handles element with zero clientWidth', () => {
  const TestComponent = () => <div id="zero-width" />

  render(<TestComponent />)
  const element = document.getElementById('zero-width')!
  Object.defineProperty(element, 'clientWidth', { value: 0, configurable: true })
  const scrollBySpy = vi.fn()
  element.scrollBy = scrollBySpy

  scrollContainerLeft('zero-width')

  expect(scrollBySpy).toHaveBeenCalledWith({ left: -0, behavior: 'smooth' })
})

test('can be called multiple times', () => {
  const TestComponent = () => <div id="multi-scroll" />

  render(<TestComponent />)
  const element = document.getElementById('multi-scroll')!
  Object.defineProperty(element, 'clientWidth', { value: 200, configurable: true })
  const scrollBySpy = vi.fn()
  element.scrollBy = scrollBySpy

  scrollContainerLeft('multi-scroll')
  scrollContainerLeft('multi-scroll')
  scrollContainerLeft('multi-scroll')

  expect(scrollBySpy).toHaveBeenCalledTimes(3)
  expect(scrollBySpy).toHaveBeenCalledWith({ left: -200, behavior: 'smooth' })
})
