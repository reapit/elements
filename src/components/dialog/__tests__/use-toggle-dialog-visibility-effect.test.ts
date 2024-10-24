import { renderHook } from '@testing-library/react-hooks'

import { useToggleDialogVisibilityEffect } from '../use-toggle-dialog-visibility-effect'
import { RefObject } from 'react'
import { act } from '@testing-library/react'

describe('useToggleDialogVisibilityEffect', () => {
  const mockOnClose = jest.fn()
  const abort = jest.fn()

  const mockUseRef = {
    current: {
      showModal: jest.fn(),
      addEventListener: jest.fn(),
      close: jest.fn(),
    },
  } as unknown as RefObject<HTMLDialogElement>

  beforeAll(() => {
    jest.spyOn(AbortController.prototype, 'abort').mockImplementation(abort) as any
  })

  afterEach(() => {
    jest.clearAllMocks()
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
