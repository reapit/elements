import { MatchMedia } from '../match-media'
import { useMatchMedia } from '../use-match-media'
import { render, screen } from '@testing-library/react'

vi.mock('../use-match-media')

test('renders children when condition matches', () => {
  vi.mocked(useMatchMedia).mockReturnValue(true)

  render(
    <MatchMedia condition="fake condition">
      <div data-testid="content">Desktop content</div>
    </MatchMedia>,
  )

  expect(screen.getByTestId('content')).toBeVisible()
})

test('does not render children when condition does not match', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)

  render(
    <MatchMedia condition="fake condition">
      <div data-testid="content">Desktop content</div>
    </MatchMedia>,
  )

  expect(screen.queryByTestId('content')).not.toBeInTheDocument()
})

test('calls useMatchMedia with the specified condition', () => {
  vi.mocked(useMatchMedia).mockReturnValue(true)

  const { rerender } = render(
    <MatchMedia condition="condition 1">
      <div data-testid="content">Desktop content</div>
    </MatchMedia>,
  )

  expect(useMatchMedia).toHaveBeenCalledWith('condition 1')

  rerender(
    <MatchMedia condition="condition 2">
      <div data-testid="content">Desktop content</div>
    </MatchMedia>,
  )

  expect(useMatchMedia).toHaveBeenCalledWith('condition 2')
})
