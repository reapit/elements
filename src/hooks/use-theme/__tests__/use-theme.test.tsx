import { renderHook, act } from '@testing-library/react-hooks'
import { THEME_LOCAL_STOREAGE_KEY, useTheme } from '..'

describe('use-theme', () => {
  it('can load use-theme', () => {
    const { result } = renderHook(() => useTheme({ initialSelection: 'default' }))

    expect(result.current.currentTheme).toBe('default')

    act(() => {
      result.current.toggleTheme('new-theme')
    })

    expect(result.current.currentTheme).toBe('new-theme')
    expect(JSON.parse(localStorage.getItem(THEME_LOCAL_STOREAGE_KEY) as string).theme).toBe('new-theme')
  })

  it('can load use-theme with localstorage preset', () => {
    localStorage.setItem(THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ theme: 'my-saved-theme' }))

    const { result } = renderHook(() => useTheme({ initialSelection: 'default' }))

    expect(result.current.currentTheme).toBe('my-saved-theme')

    act(() => {
      result.current.toggleTheme('another-theme')
    })

    expect(result.current.currentTheme).toBe('another-theme')
    expect(JSON.parse(localStorage.getItem(THEME_LOCAL_STOREAGE_KEY) as string).theme).toBe('another-theme')
  })
})
