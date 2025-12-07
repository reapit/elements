import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { LineClamp } from '../line-clamp'

vi.mock('../use-is-truncated')

const { useIsHeightTruncated } = await import('../use-is-truncated')

afterEach(() => {
  vi.clearAllMocks()
})

test('renders children inside a paragraph by default', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  const { container } = render(<LineClamp clampTo={3}>Test content</LineClamp>)
  expect(container.querySelector('p')).toBeInTheDocument()
})

test('renders as custom element when as prop is provided', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  const { container } = render(
    <LineClamp as="div" clampTo={3}>
      Test content
    </LineClamp>,
  )
  expect(container.querySelector('div')).toBeInTheDocument()
  expect(container.querySelector('p')).not.toBeInTheDocument()
})

test('applies line clamp CSS variable when clampTo is a number', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  render(<LineClamp clampTo={3}>Test content</LineClamp>)
  const textElement = screen.getByText('Test content')
  expect(textElement).toHaveStyle({ '--line-clamp': '3' })
})

test('does not apply line clamp CSS variable when clampTo is "none"', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  render(<LineClamp clampTo="none">Test content</LineClamp>)
  const textElement = screen.getByText('Test content')
  expect(textElement).toHaveStyle({ '--line-clamp': undefined })
})

test('removes line clamp when showAll is true', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)

  fireEvent.click(screen.getByText('Show more'))

  const textElement = screen.getByText('Test content')
  expect(textElement).toHaveStyle({ '--line-clamp': undefined })
})

test('sets data-is-clamped to true when content is truncated and not showing all', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)
  const textElement = screen.getByText('Test content')
  expect(textElement).toHaveAttribute('data-is-clamped', 'true')
})

test('sets data-is-clamped to false when content is not truncated', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)
  const textElement = screen.getByText('Test content')
  expect(textElement).toHaveAttribute('data-is-clamped', 'false')
})

test('sets data-is-clamped to false when showing all content', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)

  fireEvent.click(screen.getByText('Show more'))

  const textElement = screen.getByText('Test content')
  expect(textElement).toHaveAttribute('data-is-clamped', 'false')
})

test('hides disclosure button when clampTo is "none"', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  render(<LineClamp clampTo="none">Test content</LineClamp>)
  const button = screen.getByText('Show more')
  expect(button).toHaveAttribute('hidden')
})

test('hides disclosure button when content is not truncated', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  render(<LineClamp clampTo={3}>Test content</LineClamp>)
  const button = screen.getByText('Show more')
  expect(button).toHaveAttribute('hidden')
})

test('shows "Show more" button when content is truncated', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)
  const button = screen.getByText('Show more')
  expect(button).not.toHaveAttribute('hidden')
})

test('shows "Show less" button when showing all content', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)

  fireEvent.click(screen.getByText('Show more'))

  expect(screen.getByText('Show less')).toBeInTheDocument()
})

test('toggles between "Show more" and "Show less" when button is clicked', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)

  fireEvent.click(screen.getByText('Show more'))
  expect(screen.getByText('Show less')).toBeInTheDocument()

  fireEvent.click(screen.getByText('Show less'))
  expect(screen.getByText('Show more')).toBeInTheDocument()
})

test('disclosure button is aria-hidden', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)
  const button = screen.getByText('Show more').closest('button')
  expect(button).toHaveAttribute('aria-hidden')
})

test('disclosure button has no ID when showing all content', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  render(<LineClamp clampTo={2}>Test content</LineClamp>)

  const buttonBefore = screen.getByText('Show more').closest('button')
  const idBefore = buttonBefore?.id
  expect(idBefore).toBeTruthy()

  fireEvent.click(screen.getByText('Show more'))

  const buttonAfter = screen.getByText('Show less').closest('button')
  expect(buttonAfter?.id).toBe('')
})

test('calls useIsHeightTruncated with correct dependencies', () => {
  const children = 'Test content'
  const clampTo = 3

  render(<LineClamp clampTo={clampTo}>{children}</LineClamp>)

  expect(useIsHeightTruncated).toHaveBeenCalledWith(expect.any(String), [children, clampTo])
})

test('re-evaluates truncation when children change', async () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)

  const { rerender } = render(<LineClamp clampTo={3}>Initial content</LineClamp>)

  expect(useIsHeightTruncated).toHaveBeenCalledWith(expect.any(String), ['Initial content', 3])

  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  rerender(<LineClamp clampTo={3}>Much longer content that causes truncation</LineClamp>)

  await waitFor(() => {
    expect(useIsHeightTruncated).toHaveBeenCalledWith(expect.any(String), [
      'Much longer content that causes truncation',
      3,
    ])
  })
})

test('re-evaluates truncation when clampTo changes', async () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)

  const { rerender } = render(<LineClamp clampTo={3}>Test content</LineClamp>)

  expect(useIsHeightTruncated).toHaveBeenCalledWith(expect.any(String), ['Test content', 3])

  vi.mocked(useIsHeightTruncated).mockReturnValue(true)
  rerender(<LineClamp clampTo={2}>Test content</LineClamp>)

  await waitFor(() => {
    expect(useIsHeightTruncated).toHaveBeenCalledWith(expect.any(String), ['Test content', 2])
  })
})

test('generates unique IDs for multiple LineClamp instances', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(true)

  render(
    <>
      <LineClamp clampTo={2}>Content 1</LineClamp>
      <LineClamp clampTo={2}>Content 2</LineClamp>
    </>,
  )

  const buttons = screen.getAllByRole('button', { hidden: true })
  expect(buttons).toHaveLength(2)
  expect(buttons[0].id).not.toBe(buttons[1].id)

  const content1 = screen.getByText('Content 1')
  const content2 = screen.getByText('Content 2')
  expect(content1.id).not.toBe(content2.id)
})

test('forwards additional props to the container element', () => {
  vi.mocked(useIsHeightTruncated).mockReturnValue(false)
  const { container } = render(
    <LineClamp clampTo={3} data-testid="line-clamp">
      Test content
    </LineClamp>,
  )
  expect(screen.getByTestId('line-clamp')).toBe(container.firstElementChild)
})
