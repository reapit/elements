import { act, renderHook } from '@testing-library/react'
import { useSideBar } from '../use-side-bar'

test('default state is "expanded"', () => {
  const { result } = renderHook(() => useSideBar())
  expect(result.current.state).toBe('expanded')
})

test('initial state can be specified', () => {
  const { result } = renderHook(() => useSideBar('collapsed'))
  expect(result.current.state).toBe('collapsed')
})

test('initial state can be specified via a function', () => {
  const { result } = renderHook(() => useSideBar(() => 'collapsed'))
  expect(result.current.state).toBe('collapsed')
})

test('`expand` changes state to "expanded" when called', () => {
  const { result } = renderHook(() => useSideBar('collapsed'))
  act(() => {
    result.current.expand()
  })
  expect(result.current.state).toBe('expanded')
})

test('`setState` changes to the specified state', () => {
  const { result } = renderHook(() => useSideBar('expanded'))
  act(() => {
    result.current.setState('collapsed')
  })
  expect(result.current.state).toBe('collapsed')

  act(() => {
    result.current.setState('expanded')
  })
  expect(result.current.state).toBe('expanded')
})

test('`toggle` changes state between "expanded" and "collapsed" when called', () => {
  const { result } = renderHook(() => useSideBar())
  act(() => {
    result.current.toggle()
  })
  expect(result.current.state).toBe('collapsed')

  act(() => {
    result.current.toggle()
  })
  expect(result.current.state).toBe('expanded')
})
