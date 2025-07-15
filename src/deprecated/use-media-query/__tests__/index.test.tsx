import { render } from '@testing-library/react'
import { MediaStateProvider, useMediaQuery } from '../index'
import { renderHook } from '@testing-library/react'

describe('useMediaQuery', () => {
  it('should return mediaType', async () => {
    const { result } = renderHook(() => useMediaQuery(), {
      wrapper: MediaStateProvider,
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isWideScreen).toBe(false)
  })
})

describe('MediaStateProvider', () => {
  it('should match snapshot', () => {
    expect(render(<MediaStateProvider />).asFragment()).toMatchSnapshot()
  })
})
