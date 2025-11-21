import { render, screen } from '@testing-library/react'
import { scrollContainerRight } from '../scroll-container-right'

test('scrolls element right by its clientWidth', () => {
  render(<div id="test-container" data-testid="test-id" />)

  const element = screen.getByTestId('test-id')
  Object.defineProperty(element, 'clientWidth', { value: 300, configurable: true })
  const scrollBySpy = vi.spyOn(element, 'scrollBy')

  scrollContainerRight('test-container')

  expect(scrollBySpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' })
})

test('does nothing when element is not found', () => {
  render(<div />)
  expect(() => scrollContainerRight('non-existent-id')).not.toThrow()
})

test('handles element with zero clientWidth', () => {
  render(<div id="zero-width" data-testid="test-id" />)

  const element = screen.getByTestId('test-id')
  Object.defineProperty(element, 'clientWidth', { value: 0, configurable: true })
  const scrollBySpy = vi.spyOn(element, 'scrollBy')

  scrollContainerRight('zero-width')

  expect(scrollBySpy).toHaveBeenCalledWith(
    expect.objectContaining({
      left: 0,
    }),
  )
})

test('uses instant scrolling behavior when user has reduced motion preference', () => {
  const matchMediaSpy = vi
    .spyOn(globalThis, 'matchMedia')
    .mockImplementation(() => ({ matches: true }) as MediaQueryList)

  render(<div data-testid="test-id" id="instant-test" />)

  const element = screen.getByTestId('test-id')!
  const scrollBySpy = vi.spyOn(element, 'scrollBy')

  scrollContainerRight('instant-test')

  expect(scrollBySpy).toHaveBeenCalledWith(
    expect.objectContaining({
      behavior: 'instant',
    }),
  )

  matchMediaSpy.mockRestore()
})

test('uses smooth scrolling behavior when user has no reduced motion preference', () => {
  const matchMediaSpy = vi
    .spyOn(globalThis, 'matchMedia')
    .mockImplementation(() => ({ matches: false }) as MediaQueryList)

  render(<div data-testid="smooth-test" id="smooth-test" />)

  const element = screen.getByTestId('smooth-test')!
  const scrollBySpy = vi.spyOn(element, 'scrollBy')

  scrollContainerRight('smooth-test')

  expect(scrollBySpy).toHaveBeenCalledWith(
    expect.objectContaining({
      behavior: 'smooth',
    }),
  )

  matchMediaSpy.mockRestore()
})
