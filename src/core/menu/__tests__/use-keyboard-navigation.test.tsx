import { fireEvent, render, screen } from '@testing-library/react'
import { handleArrowNavigation, handleLinkActivation } from '#src/utils/keyboard-navigation'
import { useMenuKeyboardNavigation } from '../use-keyboard-navigation'

import type { KeyboardEventHandler } from 'react'

vi.mock('#src/utils/keyboard-navigation')

beforeEach(() => {
  vi.mocked(handleArrowNavigation).mockClear()
  vi.mocked(handleLinkActivation).mockClear()
})

test('calls both keyboard handlers by default', () => {
  render(<TestComponent />)

  const element = screen.getByTestId('test-div')
  fireEvent.keyDown(element)

  expect(handleLinkActivation).toHaveBeenCalled()
  expect(handleArrowNavigation).toHaveBeenCalled()
})

test('calls onKeyDown handler when provided', () => {
  const onKeyDown = vi.fn()

  render(<TestComponent onKeyDown={onKeyDown} />)

  const element = screen.getByTestId('test-div')
  fireEvent.keyDown(element)

  expect(onKeyDown).toHaveBeenCalled()
})

test('does not call keyboard handlers when default action has been prevented', () => {
  const onKeyDown = vi.fn((event) => event.preventDefault())

  render(<TestComponent onKeyDown={onKeyDown} />)

  const element = screen.getByTestId('test-div')
  fireEvent.keyDown(element)

  expect(onKeyDown).toHaveBeenCalled()
  expect(handleLinkActivation).not.toHaveBeenCalled()
  expect(handleArrowNavigation).not.toHaveBeenCalled()
})

interface TestComponentProps {
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>
}

function TestComponent({ onKeyDown }: TestComponentProps) {
  const handleKeyDown = useMenuKeyboardNavigation(onKeyDown)
  return <div onKeyDown={handleKeyDown} data-testid="test-div" />
}
