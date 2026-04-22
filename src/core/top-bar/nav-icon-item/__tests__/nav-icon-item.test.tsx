import { render, screen } from '@testing-library/react'
import { StarIcon } from '#src/icons/star'
import { TopBarNavIconItem } from '../nav-icon-item'

test('renders as a link with an accessible name', () => {
  render(<TopBarNavIconItem aria-current={false} hasBadge={false} href="#" icon={<StarIcon />} aria-label="My Item" />)
  expect(screen.getByRole('link')).toBeVisible()
})
