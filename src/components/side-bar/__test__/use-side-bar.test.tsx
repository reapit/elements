import { renderHook } from '@testing-library/react-hooks'
import { useSideBar } from '../use-side-bar'

test('default state is "expanded"', () => {
  const { result } = renderHook(() => useSideBar())
  expect(result.current.state).toBe('expanded')
})

test('initial state can be specified', () => {
  const { result } = renderHook(() => useSideBar('collapsed'))
  expect(result.current.state).toBe('collapsed')
})

test('`expand` changes state to "expanded" when called', () => {
  const { result } = renderHook(() => useSideBar('collapsed'))
  result.current.expand()
  expect(result.current.state).toBe('expanded')
})

test('`collapse` changes state to "collapsed" when called', () => {
  const { result } = renderHook(() => useSideBar())
  result.current.collapse()
  expect(result.current.state).toBe('collapsed')
})

test('`toggle` changes state between "expanded" and "collapsed" when called', () => {
  const { result } = renderHook(() => useSideBar())
  result.current.toggle()
  expect(result.current.state).toBe('collapsed')

  result.current.toggle()
  expect(result.current.state).toBe('expanded')
})
