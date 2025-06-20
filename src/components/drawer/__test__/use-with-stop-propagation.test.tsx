import { fireEvent, render, screen } from '@testing-library/react'
import { useWithStopPropagation } from '../use-with-stop-propagation'

import type { ReactEventHandler } from 'react'

test('stops propagation of the event', () => {
  const parentHandler = vi.fn()

  render(
    <div onClick={parentHandler}>
      <TestComponent />
    </div>,
  )
  fireEvent.click(screen.getByRole('button'))

  expect(parentHandler).not.toHaveBeenCalled()
})

test('calls the original handler', () => {
  expect.assertions(2)

  const parentHandler = vi.fn()
  const handler = vi.fn<ReactEventHandler<HTMLButtonElement>>((event) => {
    expect(event.isPropagationStopped()).toBe(true)
  })

  render(
    <div onClick={parentHandler}>
      <TestComponent handler={handler} />
    </div>,
  )
  fireEvent.click(screen.getByRole('button'))

  expect(handler).toHaveBeenCalled()
})

interface TestComponentProps {
  handler?: ReactEventHandler<HTMLButtonElement>
}

function TestComponent({ handler }: TestComponentProps) {
  const wrappedHandler = useWithStopPropagation(handler)
  return <button onClick={wrappedHandler}>Click me</button>
}
