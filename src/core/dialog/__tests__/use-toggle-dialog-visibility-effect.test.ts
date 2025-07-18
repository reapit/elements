import { renderHook } from '@testing-library/react'

import { useToggleDialogVisibilityEffect } from '../use-toggle-dialog-visibility-effect'
import { RefObject } from 'react'
import { act } from '@testing-library/react'

describe('useToggleDialogVisibilityEffect', () => {
  const mockOnClose = vi.fn()
  const abort = vi.fn()

  const mockUseRef = {
    current: {
      showModal: vi.fn(),
      addEventListener: vi.fn(),
      close: vi.fn(),
    },
  } as unknown as RefObject<HTMLDialogElement>

  beforeAll(() => {
    vi.spyOn(AbortController.prototype, 'abort').mockImplementation(abort) as any
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should trigger the some methods when isOpen is true', () => {
    const render = renderHook(() =>
      useToggleDialogVisibilityEffect({ ref: mockUseRef, isOpen: true, onClose: mockOnClose }),
    )

    expect(mockUseRef.current?.showModal).toHaveBeenCalled()
    expect(mockUseRef.current?.addEventListener).toHaveBeenCalled()

    expect(mockUseRef.current?.close).not.toHaveBeenCalled()
    expect(abort).not.toHaveBeenCalled()

    act(() => {
      render.unmount()
    })

    expect(abort).toHaveBeenCalledTimes(1)
  })

  it('should trigger the some methods when isOpen is false', () => {
    abort.mockClear()

    const hook = renderHook(() =>
      useToggleDialogVisibilityEffect({ ref: mockUseRef, isOpen: false, onClose: mockOnClose }),
    )

    expect(mockUseRef.current?.showModal).not.toHaveBeenCalled()
    expect(mockUseRef.current?.addEventListener).not.toHaveBeenCalled()

    expect(abort).toHaveBeenCalledTimes(1)
    expect(mockUseRef.current?.close).toHaveBeenCalledTimes(1)

    act(() => {
      hook.unmount()
    })

    expect(abort).toHaveBeenCalledTimes(2)
  })
})
