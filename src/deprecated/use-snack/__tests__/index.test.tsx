import { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { SnackProvider, useSnack } from '../index'
import { renderHook } from '@testing-library/react'

describe('useSnack', () => {
  it('should return UseSnack state', async () => {
    const { result } = renderHook(() => useSnack(), {
      wrapper: (props: PropsWithChildren) => <SnackProvider>{props.children}</SnackProvider>,
    })

    expect(typeof result.current.custom).toBe('function')
    expect(typeof result.current.success).toBe('function')
    expect(typeof result.current.info).toBe('function')
    expect(typeof result.current.error).toBe('function')
    expect(typeof result.current.warning).toBe('function')
  })
})

describe('SnackProvider', () => {
  it('should match snapshot', () => {
    expect(render(<SnackProvider />).asFragment()).toMatchSnapshot()
  })
})
