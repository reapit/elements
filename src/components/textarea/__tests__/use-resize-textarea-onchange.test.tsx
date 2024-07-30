import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import syncTextAreaHeight from '../sync-textarea-height'
import { useRef } from 'react'
import useResizeTextAreaOnChange from '../use-resize-textarea-onchange'

import type { ChangeEventHandler } from 'react'

jest.mock('../sync-textarea-height')

beforeEach(() => {
  jest.mocked(syncTextAreaHeight).mockClear()
})

test('always calls `onChange`', async () => {
  const onChange = jest.fn()

  const { rerender } = render(<TestComponent isEnabled={false} onChange={onChange} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } })

  await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

  rerender(<TestComponent isEnabled={true} onChange={onChange} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo\nbar' } })

  await waitFor(() => expect(onChange).toHaveBeenCalledTimes(2))
})

test('syncs height when `isEnabled` is true', async () => {
  const onChange = jest.fn()

  render(<TestComponent isEnabled onChange={onChange} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } })

  await waitFor(() => expect(syncTextAreaHeight).toHaveBeenCalled())
})

test('syncs value when `isEnabled` is true', async () => {
  const onChange = jest.fn()

  render(<TestComponent isEnabled onChange={onChange} />)

  const textArea = screen.getByRole('textbox') as HTMLTextAreaElement
  fireEvent.change(textArea, { target: { value: 'foo' } })

  const shadowTextArea = screen.getByTestId('shadow') as HTMLTextAreaElement
  await waitFor(() => expect(shadowTextArea.value).toBe(textArea.value))
})

test('does NOT sync height when `isEnabled` is false', async () => {
  const onChange = jest.fn()

  render(<TestComponent isEnabled={false} onChange={onChange} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } })

  await waitFor(() => expect(syncTextAreaHeight).not.toHaveBeenCalled())
})

test('does NOT sync height when change event default is prevented', async () => {
  const onChange = jest.fn().mockImplementation(((event) => event.preventDefault()) as ChangeEventHandler)

  render(<TestComponent isEnabled onChange={onChange} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } })

  await waitFor(() => expect(syncTextAreaHeight).not.toHaveBeenCalled())
})

function TestComponent({ isEnabled, onChange }: { isEnabled: boolean; onChange: ChangeEventHandler }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const shadowTextAreaRef = useRef<HTMLTextAreaElement>(null)
  const handleChange = useResizeTextAreaOnChange({ isEnabled, shadowTextAreaRef, textAreaRef })

  return (
    <>
      <textarea ref={textAreaRef} onChange={handleChange(onChange)} />
      <textarea data-testid="shadow" aria-hidden ref={shadowTextAreaRef} />
    </>
  )
}
