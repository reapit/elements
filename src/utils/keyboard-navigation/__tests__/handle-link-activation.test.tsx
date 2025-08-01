import { handleLinkActivation } from '../handle-link-activation'
import { fireEvent, render, screen } from '@testing-library/react'

test('triggers a click event when Space is pressed and the target is an <a> element', async () => {
  const onClick = vi.fn()

  render(
    <div onKeyDown={handleLinkActivation}>
      <a href="/" onClick={onClick} />
    </div>,
  )
  fireEvent.keyDown(screen.getByRole('link'), { key: ' ', code: 'Space' })

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('does nothing when Space is pressed and the target is NOT an <a> element', async () => {
  const onClick = vi.fn()

  render(
    <div onKeyDown={handleLinkActivation}>
      <button onClick={onClick} />
    </div>,
  )
  fireEvent.keyDown(screen.getByRole('button'), { key: ' ', code: 'Space', charCode: 32 })

  expect(onClick).not.toHaveBeenCalled()
})
