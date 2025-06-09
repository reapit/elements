import { render, screen } from '@testing-library/react'
import { TopBarNavSearch } from '../nav-search'

// IMPORTANT: React Testing Library does not support CSS container queries. This means we are not able
// to adequately test this components CSS-based visibility logic for the button and icon item.

test('renders button when provided', () => {
  const button = <TopBarNavSearch.Button onClick={() => void 0} />
  render(<TopBarNavSearch button={button} />)

  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('renders icon item when provided', () => {
  const iconItem = <TopBarNavSearch.IconItem onClick={() => void 0} />
  render(<TopBarNavSearch iconItem={iconItem} />)

  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('renders both button and icon item when both are provided', () => {
  const button = <TopBarNavSearch.Button onClick={() => void 0} />
  const iconItem = <TopBarNavSearch.IconItem onClick={() => void 0} />
  render(<TopBarNavSearch button={button} iconItem={iconItem} />)

  const buttons = screen.getAllByRole('button')
  expect(buttons).toHaveLength(2)
})

test('renders nothing when no button or icon item is provided', () => {
  render(<TopBarNavSearch />)
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})
