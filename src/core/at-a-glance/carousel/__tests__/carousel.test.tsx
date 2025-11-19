import { AtAGlanceCarousel } from '../carousel'
import { fireEvent, render, screen } from '@testing-library/react'
import { useScrollObserver } from '../use-scroll-observer'

vi.mock('../use-scroll-observer')

test('renders a container element', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  expect(screen.getByText('Content')).toBeVisible()
})

test('renders left and right navigation buttons', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button', { hidden: true })
  expect(buttons).toHaveLength(2)
})

test('hides left button when canScrollLeft is false', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button', { hidden: true })
  expect(buttons[0]).toHaveAttribute('hidden')
})

test('shows left button when canScrollLeft is true', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: true,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button')
  expect(buttons[0]).not.toHaveAttribute('hidden')
})

test('hides right button when canScrollRight is false', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: true,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button', { hidden: true })
  expect(buttons[1]).toHaveAttribute('hidden')
})

test('shows right button when canScrollRight is true', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: true,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button')
  expect(buttons[1]).not.toHaveAttribute('hidden')
})

test('handles left button click without errors', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: true,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button')
  expect(() => fireEvent.click(buttons[0])).not.toThrow()
})

test('handles right button click without errors', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: true,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button')
  expect(() => fireEvent.click(buttons[1])).not.toThrow()
})

test('displays children content', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel>
      <div>Child 1</div>
      <div>Child 2</div>
    </AtAGlanceCarousel>,
  )

  expect(screen.getByText('Child 1')).toBeVisible()
  expect(screen.getByText('Child 2')).toBeVisible()
})

test('applies custom columns to grid', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel columns="200px">
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const grid = screen.getByRole('list')
  expect(grid).toHaveStyle({ gridAutoColumns: '200px' })
})

test('applies default columns when not specified', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const grid = screen.getByRole('list')
  expect(grid).toHaveStyle({ gridAutoColumns: '1fr' })
})

test('sets data-can-scroll-left attribute when canScrollLeft is true', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: true,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const grid = screen.getByRole('list')
  expect(grid).toHaveAttribute('data-can-scroll-left', 'true')
})

test('sets data-can-scroll-right attribute when canScrollRight is true', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: true,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const grid = screen.getByRole('list')
  expect(grid).toHaveAttribute('data-can-scroll-right', 'true')
})

test('can click buttons when scrolling is not available', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const buttons = screen.getAllByRole('button', { hidden: true })
  expect(() => fireEvent.click(buttons[0])).not.toThrow()
  expect(() => fireEvent.click(buttons[1])).not.toThrow()
})

test('uses auto layout for grid', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel>
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  const grid = screen.getByRole('list')
  expect(grid).toHaveAttribute('data-layout', 'auto')
})

test('forwards additional props to child grid', () => {
  vi.mocked(useScrollObserver).mockReturnValue({
    canScrollLeft: false,
    canScrollRight: false,
  })

  render(
    <AtAGlanceCarousel data-testid="custom-carousel" className="custom-class">
      <div>Content</div>
    </AtAGlanceCarousel>,
  )

  expect(screen.getByTestId('custom-carousel')).toBeVisible()
  expect(screen.getByTestId('custom-carousel')).toHaveClass('custom-class')
})
