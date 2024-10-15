import { renderHook } from '@testing-library/react-hooks'

import { useToggleDialogVisibilityEffect } from '../use-toggle-dialog-visibility-effect'
import { RefObject } from 'react'

describe('useToggleDialogVisibilityEffect', () => {
  const mockOnClose = jest.fn()
  const mockUseRef = {
    current: {
      showModal: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      close: jest.fn(),
    },
  } as unknown as RefObject<HTMLDialogElement>

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger the some methods when isOpen is true', () => {
    renderHook(() => useToggleDialogVisibilityEffect({ ref: mockUseRef, isOpen: true, onClose: mockOnClose }))

    expect(mockUseRef.current?.showModal).toHaveBeenCalled()
    expect(mockUseRef.current?.addEventListener).toHaveBeenCalled()

    expect(mockUseRef.current?.close).not.toHaveBeenCalled()
    expect(mockUseRef.current?.removeEventListener).not.toHaveBeenCalled()
  })

  it('should trigger the some methods when isOpen is false', () => {
    renderHook(() => useToggleDialogVisibilityEffect({ ref: mockUseRef, isOpen: false, onClose: mockOnClose }))

    expect(mockUseRef.current?.showModal).not.toHaveBeenCalled()
    expect(mockUseRef.current?.addEventListener).not.toHaveBeenCalled()

    expect(mockUseRef.current?.close).toHaveBeenCalled()
    expect(mockUseRef.current?.removeEventListener).toHaveBeenCalled()
  })
})
