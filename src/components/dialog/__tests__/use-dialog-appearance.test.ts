import { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { useDialogAppearance } from '../use-dialog-appearance'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}))

const mockedUseRef = jest.mocked(useRef)

describe('useDialogAppearance', () => {
  const mockOnClose = jest.fn()
  const mockUseRef = {
    showModal: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    close: jest.fn(),
  }

  beforeEach(() => {
    mockedUseRef.mockReturnValue({ current: mockUseRef })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger the some methods when isOpen is true', () => {
    renderHook(() => useDialogAppearance({ isOpen: true, onClose: mockOnClose }))

    expect(mockUseRef.showModal).toHaveBeenCalled()
    expect(mockUseRef.addEventListener).toHaveBeenCalled()

    expect(mockUseRef.close).not.toHaveBeenCalled()
    expect(mockUseRef.removeEventListener).not.toHaveBeenCalled()
  })

  it('should trigger the some methods when isOpen is false', () => {
    renderHook(() => useDialogAppearance({ isOpen: false, onClose: mockOnClose }))

    expect(mockUseRef.showModal).not.toHaveBeenCalled()
    expect(mockUseRef.addEventListener).not.toHaveBeenCalled()

    expect(mockUseRef.close).toHaveBeenCalled()
    expect(mockUseRef.removeEventListener).toHaveBeenCalled()
  })
})
