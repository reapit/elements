import { FileUploaderSingleSelectMediaCard } from '../media-card'
import { fireEvent, render, screen } from '@testing-library/react'

const src = 'https://example.com/photo.jpg'

test('renders the thumbnail', () => {
  const { container } = render(
    <FileUploaderSingleSelectMediaCard fileName="Photo.jpg" onReplace={() => {}} src={src} status="uploaded" />,
  )
  expect(container.querySelector('img')).toHaveAttribute('src', src)
})

test('calls onReplace when the card is clicked', () => {
  const onReplace = vi.fn()
  render(<FileUploaderSingleSelectMediaCard fileName="Photo.jpg" onReplace={onReplace} src={src} status="uploaded" />)

  fireEvent.click(screen.getByRole('button', { name: 'Replace Photo.jpg' }))

  expect(onReplace).toHaveBeenCalledTimes(1)
})

test.each(['Enter', ' '])('calls onReplace when %s is pressed on the card', (key) => {
  const onReplace = vi.fn()
  render(<FileUploaderSingleSelectMediaCard fileName="Photo.jpg" onReplace={onReplace} src={src} status="uploaded" />)

  fireEvent.keyDown(screen.getByRole('button', { name: 'Replace Photo.jpg' }), { key })

  expect(onReplace).toHaveBeenCalledTimes(1)
})

test('does not call onReplace when the remove button is clicked', () => {
  const onReplace = vi.fn()
  const onRemove = vi.fn()
  render(
    <FileUploaderSingleSelectMediaCard
      fileName="Photo.jpg"
      onRemove={onRemove}
      onReplace={onReplace}
      src={src}
      status="uploaded"
    />,
  )

  fireEvent.click(screen.getByRole('button', { name: 'Remove Photo.jpg' }))

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onReplace).not.toHaveBeenCalled()
})

test('does not call onReplace when Enter is pressed on the remove button', () => {
  const onReplace = vi.fn()
  const onRemove = vi.fn()
  render(
    <FileUploaderSingleSelectMediaCard
      fileName="Photo.jpg"
      onRemove={onRemove}
      onReplace={onReplace}
      src={src}
      status="uploaded"
    />,
  )

  fireEvent.keyDown(screen.getByRole('button', { name: 'Remove Photo.jpg' }), { key: 'Enter' })

  expect(onReplace).not.toHaveBeenCalled()
})

test('renders no remove button when onRemove is omitted', () => {
  render(<FileUploaderSingleSelectMediaCard fileName="Photo.jpg" onReplace={() => {}} src={src} status="uploaded" />)
  expect(screen.queryByRole('button', { name: 'Remove Photo.jpg' })).not.toBeInTheDocument()
})

test('is not focusable and does not call onReplace when disabled', () => {
  const onReplace = vi.fn()
  render(
    <FileUploaderSingleSelectMediaCard
      disabled
      fileName="Photo.jpg"
      onReplace={onReplace}
      src={src}
      status="uploaded"
    />,
  )

  const card = screen.getByRole('button', { name: 'Replace Photo.jpg' })
  expect(card).not.toHaveAttribute('tabindex')

  fireEvent.click(card)
  expect(onReplace).not.toHaveBeenCalled()
})

test('does not render the remove button when disabled', () => {
  render(
    <FileUploaderSingleSelectMediaCard
      disabled
      fileName="Photo.jpg"
      onRemove={() => {}}
      onReplace={() => {}}
      src={src}
      status="uploaded"
    />,
  )
  expect(screen.queryByRole('button', { name: 'Remove Photo.jpg' })).not.toBeInTheDocument()
})

test('marks the card as dragging over via a data attribute', () => {
  render(
    <FileUploaderSingleSelectMediaCard
      fileName="Photo.jpg"
      isDraggingOver
      onReplace={() => {}}
      src={src}
      status="uploaded"
    />,
  )
  expect(screen.getByRole('button', { name: 'Replace Photo.jpg' })).toHaveAttribute('data-is-dragging-over', 'true')
})
