import { render } from '@testing-library/react'
import { useModal } from '../index'
import { renderHook, act } from '@testing-library/react'

describe('useModal', () => {
  it('should return UseModal type correctly', async () => {
    const { result } = renderHook(() => useModal('some-div'))

    expect(render(<result.current.Modal />).asFragment()).toMatchSnapshot()

    act(() => {
      result.current.openModal()
    })

    expect(result.current.modalIsOpen).toBe(true)

    act(() => {
      result.current.closeModal()
    })

    expect(result.current.modalIsOpen).toBe(false)
  })
})
